import AuthContext from '../../utils/AuthContext';
import { useHistory } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import Heading from '../../components/Heading';
import axios from 'axios';
import { BASE_URL, ENQUIRIES_PATH, MESSAGES_PATH, ACCOMMODATIONS_PATH } from '../../utils/constants';
import { Link } from 'react-router-dom';
import img from '../../img/logo-dark.svg'


const Panel = () => {

    const [auth] = useContext(AuthContext);
    const history = useHistory();
    const [bookings, setBookings] = useState(null);
    const [confBookings, setConfBookings] = useState(null);
    const [bookingsError, setBookingsError] = useState('');
    const [messages, setMessages] = useState(null);
    const [repMessages, setRepMessages] = useState(null);
    const [messagesError, setMessagesError] = useState('');
    const [est, setEst] = useState(null);
    const [estError, setEstError] = useState('');
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
                setBookingsError(error.toString());
            } finally {
                setLoading(false);
            }
        };
        getBookings();
    }, [])

    useEffect(() => {
        const filterBookings = () => setConfBookings(bookings?.filter(item => item.confirmed !== true))
        filterBookings();
    }, [bookings])



    useEffect(() => {
        const getMessages = async () => {
            try {
                const response = await axios.get(`${BASE_URL}${MESSAGES_PATH}`, {
                    headers: {
                        Authorization:
                            `Bearer ${auth.jwt}`,
                    },
                });
                setMessages(response.data);
            } catch (error) {
                console.log('error', error);
                setMessagesError(error.toString());
            } finally {
                setLoading(false);
            }
        };
        getMessages();
    }, [auth])

    useEffect(() => {
        const filterMessages = () => setRepMessages(messages?.filter(item => item.replied !== true))
        filterMessages();
    }, [messages])


    useEffect(() => {
        const getEst = async () => {
            try {
                const response = await axios.get(`${BASE_URL}${ACCOMMODATIONS_PATH}`);
                if (response.status === 200) {
                    setEst(response.data);
                }
            } catch (error) {
                console.log(error);
                setEstError(error.toString());
            } finally {
                setLoading(false);
            }
        };
        getEst();
    }, [])

    return (
        <>
            <div className="panel">
                <div className="header">
                    <Heading className="header__title" title="Admin Panel" />
                </div>
                {loading ? <img className="loader" src={img} alt="pulsating logo"></img>
                :
                    <div className="panel__section flex-when-L">

                        <div className="panel__content">
                            <h2 className="panel__heading">Bookings</h2>
                            {bookingsError ? <div className="panel__text">
                                {bookingsError}
                        </div>
                                :
                                <div className="panel__text">
                                    {confBookings?.length > 0 ? <p className="panel__info">There are currently {confBookings.length} unread bookings</p> : <p className="panel__info">There are no new bookings</p>}
                                    <div className="flex flex--space">
                                        {bookings?.length} total bookings
                                    <Link to="panel/bookings">
                                        <button className="button button--small">See bookings</button>
                                    </Link>
                                    </div>
                                </div>}
                        </div>
                        <div className="panel__content">
                            <h2 className="panel__heading">Messages</h2>
                            {messagesError ? <div className="panel__text">
                                {messagesError}
                        </div>
                                :
                                <div className="panel__text">
                                    {repMessages?.length > 0 ? <p className="panel__info">There are currently {repMessages.length} unread messages</p> : <p className="panel__info">There are no new messages</p>}
                                    <div className="flex flex--space">
                                        {messages?.length} total messages
                                    <Link to="panel/messages">
                                        <button className="button button--small">See messages</button>
                                    </Link>
                                    </div>
                                </div>
                            }

                        </div>
                        <div className="panel__content">
                            <h2 className="panel__heading">Establishments</h2>
                            {estError ? <div className="panel__text">
                                {estError}
                        </div>
                                : <div className="panel__text">
                                    <p className="panel__info">{est?.length} total establishments</p>
                                    <div className="flex flex--space">
                                        <Link to="panel/est/create">
                                        <button className="button button--small">Create new</button>
                                        </Link>
                                        <Link to="accommodation">
                                        <button className="button button--small">See all</button>
                                        </Link>
                                    </div>
                                </div>}

                        </div>
                    </div>
            }
                
            </div>
        </>
    )
}
export default Panel;
