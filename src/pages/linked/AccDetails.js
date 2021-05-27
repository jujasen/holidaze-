import { Link } from 'react-router-dom';
import BackLink from '../../components/BackLink';
import Heading from '../../components/Heading';
import { TiStarFullOutline } from 'react-icons/ti';
import Button from '../../components/Button';
import { GiCoffeeMug } from 'react-icons/gi';
import { MdRestaurant } from 'react-icons/md';
import { FiWind } from 'react-icons/fi';
import { FaConciergeBell } from 'react-icons/fa';
import { IoMdPaw } from 'react-icons/io';
import { CgGym } from 'react-icons/cg';
import { MdKeyboardArrowRight } from 'react-icons/md'
import { BASE_URL, ACCOMMODATIONS_PATH } from '../../utils/constants';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import uuid from 'react-uuid';
import img from '../../img/logo-dark.svg'
import Book from '../../components/Book';
import AuthContext from '../../utils/AuthContext';



const AccDetails = () => {
    const [auth] = useContext(AuthContext);
    const [detail, setDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const [bookOpen, setBookOpen] = useState(false);
    const [activities, setActivities] = useState(null);

    useEffect(() => {
        const getDetail = async () => {
            try {
                const response = await axios.get(`${BASE_URL}${ACCOMMODATIONS_PATH}/${id}`);
                if (response.status === 200) {
                    setDetail(response.data);
                } else {
                    console.log(error)
                    setError('An error occurred');
                }
            } catch (error) {
                setError(error.toString());
            } finally {
                setLoading(false);
            }
        };
        getDetail();
    }, [id, error])

    useEffect(() => {
        const getRegion = async () => {
            if (detail) {
                let region = detail.region.toLowerCase();
                if (region === "åsane" || region === "årstad") {
                    region = region.replace(/å/, 'aa')
                }
                if (region === "bergenshus") {
                    region = "bergenshuse"
                }
                if (region === "laksevåg") {
                    region = "laksevaag"
                }
                console.log(region)

                try {
                    const response = await axios.get(`${BASE_URL}/${region}s`);
                    if (response.status === 200) {
                        setActivities(response.data);
                        console.log(response.data)
                    } else {
                        console.log(error)
                        setError('An error occurred');
                    }
                } catch (error) {
                    setError(error.toString());
                } finally {
                    setLoading(false);
                }
            }
            
            
        };
        getRegion();
    }, [detail, error])

    const handleBookToggle = () => {
        setBookOpen(!bookOpen);
    };

    return (
        <>
            <div className="accdetails pad-top">
                {bookOpen ? <Book acc={detail} onChildClick={handleBookToggle} ></Book> : ""}
                {loading ? <img className="loader" src={img} alt="pulsating logo"></img> : error ? <div className="error">{error}
                    </div> : <div>
                    <div className="header accdetails__header">
                        <div className="content">
                            <BackLink />
                        </div>
                        <div className="accdetails--media">
                            <img className="accdetails__img" src={detail.image} alt=""></img>
                            <div className="accdetails__content content">
                                <div className="accdetails__title">
                                    <Heading title={detail.name} />
                                </div>
                                <div className="accdetails__price show-when-L">
                                    <p>from</p>
                        kr {detail.room_standard_price} <span>per night</span>
                                </div>
                                <div className="flex flex--space">
                                    <div className="accdetails__stars flex flex--start">
                                        {
                                            [...Array(detail.stars)].map(() => (
                                                <TiStarFullOutline key={uuid()} className="estcard__star"></TiStarFullOutline>
                                            )
                                            )}
                                        <p className="accdetails__rating">{detail.stars} stars</p>

                                    </div>
                                    {auth ?
                                        <Link to={`/panel/est/edit/${detail.id}`} className="accdetails__btn">
                                            <Button text={`Edit ${detail.type}`}></Button>
                                        </Link> :
                                        <div onClick={handleBookToggle}
                                            className="accdetails__btn">
                                            <Button text="Book room"></Button>
                                        </div>
                                    }
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="content">
                        <div className="accdetails__price hide-when-L">
                            <p>from</p>
                        kr {detail.room_standard_price} <span>per night</span>
                        </div>
                        <h2 className="subtitle">Facilities</h2>
                        <div className="accdetails__facilities">
                            {detail.facility_breakfast ? <div className="accdetails__facility">
                                <GiCoffeeMug></GiCoffeeMug>
                                <p>Breakfast</p>
                            </div> : ''}
                            {detail.facility_restaurant ? <div className="accdetails__facility">
                                <MdRestaurant></MdRestaurant>
                                <p>Restaurant</p>
                            </div> : ''}
                            {detail.facility_roomservice ? <div className="accdetails__facility">
                                <FaConciergeBell></FaConciergeBell>
                                <p>Room Service</p>
                            </div> : ''}
                            {detail.facility_aircondition ? <div className="accdetails__facility">
                                <FiWind></FiWind>
                                <p>Air Condition</p>
                            </div> : ''}
                            {detail.facility_petsallowed ? <div className="accdetails__facility">
                                <IoMdPaw></IoMdPaw>
                                <p>Pets Allowed</p>
                            </div> : ''}
                            {detail.facility_gym ? <div className="accdetails__facility">
                                <CgGym></CgGym>
                                <p>Gym</p>
                            </div> : ''}

                        </div>
                        <div className="accdetails--media">
                            <div className="sixty-when-L margin-r--M">
                                <h2 className="subtitle">Location</h2>
                                <div className="accdetails__location">
                                    <div dangerouslySetInnerHTML={{ __html: detail.map_embed }} />

                                    <div>
                                        {detail.street_adress}, {detail.zip_code} {detail.postal_adress}
                                    </div>
                                </div>
                            </div>
                                <div className="half-when-L">
                                <h2 className="subtitle">Activities in {detail.region} Region</h2>
                                <div className="accdetails__activities">
                                        
                                    <ul>
                                            {activities?.map(function (item) {
                                                return (
                                                    <a key={item.id} href={item.link}>
                                                        <li
                                                            className="accdetails__activity"
                                                        >{item.activity} <MdKeyboardArrowRight></MdKeyboardArrowRight></li>
                                                    </a>
                                                )
                                            })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div></div>}


            </div>
        </>
    )


}

export default AccDetails;