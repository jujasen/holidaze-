import AuthContext from '../../../utils/AuthContext';
import { useHistory } from 'react-router-dom';
import { TiStarFullOutline } from 'react-icons/ti';
import { IoIosArrowForward } from 'react-icons/io';
import BackLink from '../../../components/BackLink';
import Heading from '../../../components/Heading';
import { Link } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL, ENQUIRIES_PATH } from '../../../utils/constants';
import img from '../../../img/logo-dark.svg';

const Bookings = () => {

    const [auth] = useContext(AuthContext);
    const history = useHistory();
    const [bookings, setBookings] = useState(null);
    const [newBookings, setNewBookings] = useState(null);
    const [confBookings, setConfBookings] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (!auth) {
            history.push('/');
        }
    }, [auth, history]);

    useEffect(() => {
        const getBookings = async () => {
            try {
                const response = await axios.get(`${BASE_URL}${ENQUIRIES_PATH}`);
                if (response.status === 200) {
                    setBookings(response.data);
                }
            } catch (error) {
                console.log(error);
                setError(error.toString());
            } finally {
                setLoading(false);
            }
        };
        getBookings();
    }, [])

    useEffect(() => {
        const filterConfBookings = () => setConfBookings(bookings?.filter(item => item.confirmed === true))
        filterConfBookings();
        const filterNewBookings = () => setNewBookings(bookings?.filter(item => item.confirmed !== true))
        filterNewBookings();
    }, [bookings])

    

    return (
        <div className="admin-category">
            <div className="header">
                <BackLink />
                <Heading className="header__title" title="Admin Panel" />
                <h2 className="header__subtitle">Bookings</h2>
            </div>

            {loading ? <img className="loader" src={img} alt="pulsating logo"></img> : error ? <div className="error">{error}</div>
                :
                <div className="flex-when-L media-center flex-align-start flex-center">
                <div className="admin-category__section">
                    <h3 className="subtitle"> New bookings</h3>
                        {newBookings.length < 1 ? <div className="admin-category__item">No new bookings</div> : ''}
                    <div className="admin-category__elems">
                        {newBookings?.map(function (item) {
                            return (
                                <Link className="no-link" key={item.id}  to={`bookings/details/${item.id}`}>
                                <div className="admin-category__item">
                                    <div className="flex flex--space">
                                        <h4 className="admin-category__title">
                                            Booking #00{item.id}
                                        </h4>
                                        <div className="flex flex--start admin-category__tag">
                                            <TiStarFullOutline></TiStarFullOutline>
                                            <p>New</p>
                                        </div>
                                    </div>
                                    <div className="flex flex--space">
                                        <div>
                                            <p className="admin-category__subtitle">{item.establishment}</p>
                                            <p className="admin-category__sup">
                                                {item.date_from} to {item.date_to}</p>
                                        </div>
                                        <div className="admin-category__arrow">
                                            <IoIosArrowForward></IoIosArrowForward>
                                        </div>
                                    </div>
                                </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>

                <div className="admin-category__section">
                    <h3 className="subtitle"> Booking history</h3>
                        {confBookings.length < 1 ? <div className="admin-category__item">No confirmed bookings</div> : ''}
                    <div className="admin-category__elems">
                        {confBookings?.map(function (item) {
                            return (
                                <Link className="no-link" key={item.id} to={`bookings/details/${item.id}`}>
                                <div key={item.id} className="admin-category__item">
                                    <div className="flex flex--space">
                                        <h4 className="admin-category__title">
                                            Booking #00{item.id}
                                        </h4>
                                        <div className="flex flex--start admin-category__tag">
                                            <p>CONFIRMED</p>
                                        </div>
                                    </div>
                                    <div className="flex flex--space">
                                        <div>
                                            <p className="admin-category__subtitle">{item.establishment}</p>
                                            <p className="admin-category__sup">
                                                {item.date_from} to {item.date_to}
                                            </p>
                                        </div>
                                        <div className="admin-category__arrow">
                                            <IoIosArrowForward></IoIosArrowForward>
                                        </div>
                                    </div>
                                </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>
            }
        </div>
    )
}

export default Bookings;
