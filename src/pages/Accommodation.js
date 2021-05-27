import BackLink from '../components/BackLink';
import Heading from '../components/Heading';
import { useState, useEffect } from "react";
// import { GrMoney } from 'react-icons/gr';
import { IoIosArrowDown } from 'react-icons/io';
import EstCard from '../components/EstCard';
import axios from 'axios';
import { BASE_URL, ACCOMMODATIONS_PATH } from '../utils/constants';
import img from '../img/logo-dark.svg';

const Accommodation = () => {
    // const [priceLow, setPriceLow] = useState(null);
    const [dropdownClosed, setDropdown] = useState("false");
    const [selectedOption, setSelectedOption] = useState('All');
    const [accommodations, setAccommodations] = useState([]);
    const [filteredData, setFilteredData] = useState(accommodations);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    const handleToggle = () => {
        setDropdown(!dropdownClosed);
    };

    const handleOption = (acctype) => {
        let value = acctype;
        let result = [];
        result = accommodations.filter((data) => {
            if (acctype === 'All') {
                return data.type;
            }else {
                return data.type.includes(value);
            }
        });
        setSelectedOption(value);
        setFilteredData(result);
    }

    // const changeSortLow = () => {
    //     setPriceLow(true);
    // };

    // const changeSortHigh = () => {
    //     setPriceLow(false);
    // };


    // useEffect(() => {
    //     if (priceLow === true) {
    //         let result = filteredData.sort((a, b) => a.room_standard_price - b.room_standard_price);

    //         setFilteredData(result);
    //     } else if (priceLow === false) {
    //         let result = filteredData.sort((a, b) => b.room_standard_price - a.room_standard_price);
    //         setFilteredData(result);
    //     }
    // }, [priceLow, filteredData])

    const handleSearch = (e) => {
        let value = e.target.value;
        let result = [];

        if (value) {
            result = filteredData.filter((data) => {
                const slicedValue = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
                return data.name.includes(slicedValue) || data.region.includes(slicedValue);
            });
            setFilteredData(result);
        }

        if(value === '') {
            handleOption(selectedOption);
        }
    }

    useEffect(() => {
        const getAccommodations = async () => {
            try {
                const response = await axios.get(`${BASE_URL}${ACCOMMODATIONS_PATH}`);
                if (response.status === 200) {
                    setAccommodations(response.data);
                    setFilteredData(response.data);
                } else {
                    setError('An error occurred');
                }
            } catch (error) {
                setError(error.toString());
            } finally {
                setLoading(false);
            }
        };

        getAccommodations();

    }, [])

    return (
        <>
            <div className="accmd pad-top">
                <div className="header">
                    <BackLink/>
                    <Heading className="header__title" title="All accomodation" />
                    <div className="header__filters flex flex--start">
                        <div 
                        onClick={handleToggle}
                        className="header__dropdown flex flex--space">
                            <p>{selectedOption}</p>
                            <IoIosArrowDown></IoIosArrowDown>
                        </div>
                        <input onChange={handleSearch} className="header__search" placeholder="Search by name or region"></input>
                    </div>
                    {!dropdownClosed ? <div className="header__select">
                        <ul>
                            <li onClick={() => {
                                handleToggle();
                                handleOption('All')
                            }}>
                                All
                            </li>
                            <li onClick={() => {
                                handleToggle();
                                handleOption('Hotel')
                            }}>
                                Hotel
                            </li>
                            <li onClick={() => {
                                handleToggle();
                                handleOption('B&B')
                            }}>
                                B&B
                            </li>
                        </ul>
                    </div> : ''}

                    {/* <div className="header__filters flex flex--start">
                        <button 
                            onClick={changeSortLow}
                        className={`header__tag flex ${priceLow? 'header__tag--active' : ''}`}>
                            <GrMoney 
                            className={`header__tag-icon ${priceLow ? 'header__tag-icon--active' : ''} `}/>
                            <p>Low to high price</p>
                        </button>
                        <button 
                            onClick={changeSortHigh}
                            className={`header__tag flex ${priceLow === false ? 'header__tag--active' : ''}`}>
                            <GrMoney className={`header__tag-icon ${priceLow === false ? 'header__tag-icon--active' : ''} `} />
                            <p>High to low price</p>
                        </button>
                    </div> */}
                </div>
                <div className="accmd__results">
                    {loading ? <img className="loader" src={img} alt="pulsating logo"></img> : error ? <div className="error">{error}
                    </div> : filteredData?.map(function (item) {
                        return (
                                <EstCard
                                    id={item.id}
                                    key={item.id}
                                    name={item.name}
                                    image={item.image}
                                    region={item.region}
                                    stars={item.stars}
                                    price={item.room_standard_price}>
                                </EstCard>
                        )
                    })}
                </div>
            </div>
        </>
    )


}

export default Accommodation;