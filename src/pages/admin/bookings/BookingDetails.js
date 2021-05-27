import AuthContext from '../../../utils/AuthContext';
import { useHistory } from 'react-router-dom';
import { BsCheckCircle } from 'react-icons/bs';
import { RiHotelLine, RiHome5Line } from 'react-icons/ri';
import BackLink from '../../../components/BackLink';
import Heading from '../../../components/Heading';
import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL, ENQUIRIES_PATH } from '../../../utils/constants';
import { useParams } from 'react-router-dom';
import img from '../../../img/logo-dark.svg'

const BookingDetails = () => {

    const { id } = useParams();
    const [auth] = useContext(AuthContext);
    const history = useHistory();
    const [booking, setBooking] = useState(null);
    const [nights, setNights] = useState(null);
    const [error, setError] = useState('');
    const [confirmed, setConfirmed] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (!auth) {
            history.push('/');
        }
    }, [auth, history]);

    useEffect(() => {
        const getDetails = async () => {
            try {
                const response = await axios.get(`${BASE_URL}${ENQUIRIES_PATH}/${id}`);
                if (response.status === 200) {
                    setBooking(response.data);
                    setConfirmed(response.data.confirmed)
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
        getDetails();
    }, [id, error])

    useEffect(() => {
        if (booking) {
            const nights = Math.ceil(Math.abs(new Date(booking.date_from) - new Date(booking.date_to)) / (1000 * 60 * 60 * 24));

            setNights(nights);
        }
    }, [booking])

    return (
        <div className="admin-details">
            <div className="header">
                <BackLink />
                <Heading className="header__title" title="Admin Panel" />
                <h2 className="header__subtitle">Booking Details</h2>
            </div>
            {loading ? <img className="loader" src={img} alt="pulsating logo"></img>
                : booking ?
                    <div className="page">
                        <div className="booking media-center--s">
                            <div className="flex-when-L flex-space flex-align-start">
                                <div className="booking__set-width">
                                    <div className="booking__est flex flex--start">
                                        {booking.est_type === 'Hotel' ? <RiHotelLine></RiHotelLine> : <RiHome5Line></RiHome5Line>}
                                        <p>{booking.establishment}</p>
                                    </div>
                                    <div className="flex flex--space">
                                        <div>
                                            <span className="capitalize">{booking.room_type}</span> room,&nbsp;
                                {nights} nights
                            </div>
                            kr {booking.room_price * nights},-
                    </div>
                                    {booking.breakfast ?
                                        <div className="flex flex--space">
                                            <div>
                                                With breakfast,&nbsp;
                            {nights} nights
                        </div>
                        kr {booking.breakfast_price * nights},-
                    </div> : ''}
                                    <div className="flex flex--space space__marg--b">
                                        <div className="semi-bold">
                                            TOTAL
                        </div>
                                        {booking.breakfast ? <div className="semi-bold">kr {(booking.room_price + booking.breakfast_price) * nights},-</div> : <div className="semi-bold">kr {(booking.room_price) * nights},-</div>}
                                    </div>
                                </div>
                                <div>
                                    <div className="semi-bold space__marg--b">
                                        From date / To date
                        <p>{booking.date_from} - {booking.date_to}</p>
                                    </div>
                                    <div className="semi-bold space__marg--b">
                                        Full name
                    <p>{booking.name_first} {booking.name_last}</p>
                                    </div>
                                    <div className="semi-bold space__marg--b">
                                        Email
                        <p>{booking.email}</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="semi-bold space__marg--b">
                                        Phone number
                        <p>{booking.phone}</p>
                                    </div>
                                    <div className="semi-bold space__marg--b">
                                        Special request
                        <p>{booking.request}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {confirmed ? <div className=" booking__confirm flex flex--center">
                            <BsCheckCircle></BsCheckCircle>
                            <div className=" booking__confirm-text">
                                <p>The booking is confirmed</p>
                            </div>
                        </div> :
                            <div className="flex flex--center">
                                <button className="button space__marg--l"
                                    onClick={async () => {
                                        const data = {
                                            confirmed: true
                                        }

                                        try {
                                            const response = await axios.put(`${BASE_URL}${ENQUIRIES_PATH}/${id}`, data,
                                                {
                                                    headers: {
                                                        Authorization:
                                                            `Bearer ${auth.jwt}`,
                                                    },

                                                });
                                            setConfirmed(true);
                                            console.log(response.data);
                                        } catch (error) {
                                            console.log('error', error);
                                        }
                                    }}
                                >CONFIRM</button>
                            </div>
                        }




                    </div>
                    : error ? <div className="error">{error}
                    </div>
                        :
                        ''}
        </div>
    )
}

export default BookingDetails;
