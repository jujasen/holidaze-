import BackLink from '../../../components/BackLink';
import Heading from '../../../components/Heading';
import { BsCheckCircle, BsInfoCircleFill } from 'react-icons/bs';
import { useEffect, useState, useContext } from 'react';
import { Formik, Form } from 'formik'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import AuthContext from '../../../utils/AuthContext';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL, ACCOMMODATIONS_PATH } from '../../../utils/constants';
import ReactTooltip from 'react-tooltip';
import { useParams } from 'react-router-dom';
import img from '../../../img/logo-dark.svg'
import { validationSchema } from '../../../utils/schemas';


const EditEst = () => {

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);
    const [auth] = useContext(AuthContext);
    const history = useHistory();
    const [recommended, setRecommended] = useState(false);
    const [fAirCondition, setFAirCondition] = useState(false);
    const [fBreakfast, setFBreakfast] = useState(false);
    const [fGym, setFGym] = useState(false);
    const [fPets, setFPets] = useState(false);
    const [fRestaurant, setFRestaurant] = useState(false);
    const [fRoomService, setFRoomService] = useState(false);
    const [superiorRoom, setSuperiorRoom] = useState(false);
    const [luxuryRoom, setLuxuryRoom] = useState(false);
    const { id } = useParams();
    const [detail, setDetail] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!auth) {
            history.push('/');
        }
    }, [auth, history]);

    useEffect(() => {
        const getDetail = async () => {
            setLoading(true);
            try {

                const response = await axios.get(`${BASE_URL}${ACCOMMODATIONS_PATH}/${id}`);
                if (response.status === 200) {
                    console.log(response.data)
                    setDetail(response.data);
                    setRecommended(!response.data.recommended ? false : true);
                    setFAirCondition(!response.data.facility_aircondition ? false : true);
                    setFBreakfast(!response.data.facility_breakfast ? false : true);
                    setFGym(!response.data.facility_gym ? false : true);
                    setFPets(!response.data.facility_petsallowed ? false : true);
                    setFRestaurant(!response.data.facility_restaurant ? false : true);
                    setFRoomService(!response.data.facility_roomservice ? false : true);
                    setSuperiorRoom(!response.data.room_superior ? false : true);
                    setLuxuryRoom(!response.data.room_luxury ? false : true);
                } else {
                    console.log(error)
                    setError(error.toString());
                }
            } catch (error) {
                setError(error.toString());
                console.log(error)
            } finally {
                setLoading(false);
            }
        };
        getDetail();
    }, [id, error])

    const handleRecommended = () => {
        setRecommended(!recommended);
    };
    const handleFAirCondition = () => {
        setFAirCondition(!fAirCondition);
    };
    const handleFBreakfast = () => {
        setFBreakfast(!fBreakfast);
    };
    const handleFGym = () => {
        setFGym(!fGym);
    };
    const handleFPets = () => {
        setFPets(!fPets);
    };
    const handleFRestaurant = () => {
        setFRestaurant(!fRestaurant);
    };
    const handleFRoomService = () => {
        setFRoomService(!fRoomService);
    };
    const handleSuperiorRoom = () => {
        setSuperiorRoom(!superiorRoom);
    };
    const handleLuxuryRoom = () => {
        setLuxuryRoom(!luxuryRoom);
    };

    const deleteEst =  async () => {
            try {
                const response = await axios.delete(`${BASE_URL}${ACCOMMODATIONS_PATH}/${id}`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${auth.jwt}`,
                        },
                    });
                console.log('deleted', response.data);
                setSubmitted(true);
            } catch (error) {
                setError(true)
                console.log('error', error);
            } finally {
                history.push('/panel');
            }
        }

    const { establishment } = useForm({
        resolver: yupResolver(validationSchema),
    });


    return (
        <>
            <div className="pad-top" >
                <div className="header">
                    <BackLink />
                    <div className="flex flex--space">
                        <div>
                            <Heading className="header__title" title="Admin Panel" />
                            <h2 className="header__subtitle">Edit establishment</h2>
                        </div>
                        <button className="button space__marg--t"
                            onClick={deleteEst}

                        >Delete</button>
                    </div>


                </div>
                {detail ?
                    <div className="page">
                        <Formik
                            initialValues={{ name: `${detail.name}`, type: `${detail.type}`, stars: `${Number(detail.stars)}`, region: `${detail.region}`, street_adress: `${detail.street_adress}`, postal_adress: `${detail.postal_adress}`, zip_code: `${Number(detail.zip_code)}`, image: `${detail.image}`, map_embed: `${detail.map_embed}`, max_people: `${Number(detail.max_people)}`, room_standard_price: `${Number(detail.room_standard_price)}`, room_superior: "", room_superior_price: `${Number(detail.room_superior_price)}`, room_luxury: "", room_luxury_price: `${Number(detail.room_luxury_price)}`, breakfast_price: `${Number(detail.breakfast_price)}` }}
                            validationSchema={validationSchema}
                            onSubmit={async (data) => {

                                const establishment = {
                                    breakfast_price: Number(data.breakfast_price),
                                    facility_aircondition: fAirCondition,
                                    facility_breakfast: fBreakfast,
                                    facility_gym: fGym,
                                    facility_petsallowed: fPets,
                                    facility_restaurant: fRestaurant,
                                    facility_roomservice: fRoomService,
                                    image: data.image,
                                    map_embed: data.map_embed,
                                    max_people: Number(data.max_people),
                                    name: data.name,
                                    postal_adress: data.postal_adress,
                                    recommended: recommended,
                                    region: data.region,
                                    room_luxury: luxuryRoom,
                                    room_luxury_price: Number(data.room_luxury_price),
                                    room_standard: true,
                                    room_standard_price: Number(data.room_standard_price),
                                    room_superior: superiorRoom,
                                    room_superior_price: Number(data.room_superior_price),
                                    stars: Number(data.stars),
                                    street_adress: data.street_adress,
                                    type: data.type,
                                    zip_code: Number(data.zip_code)
                                }

                                try {
                                    const response = await axios.put(`${BASE_URL}${ACCOMMODATIONS_PATH}/${id}`, establishment,
                                        {
                                            headers: {
                                                Authorization:
                                                    `Bearer ${auth.jwt}`,
                                            },

                                        });
                                    setSubmitted(true);
                                    console.log(response.data);
                                } catch (error) {
                                    setError(true)
                                    console.log('error', error);
                                }
                            }}
                        >
                            {({ values,
                                errors, handleChange  }) => (
                                
                                <Form className="form space__marg--t">
                                    <h3 className="subtitle">General information</h3>
                                    <div className="flex-when-L flex-align-start">
                                        <div className="hundred-when-L margin-r">
                                            <div className="form__item">
                                                <p className="form__label"
                                                >* Establishment name</p>
                                                <input
                                                    id="name"
                                                    ref={establishment}
                                                    className="form__input"
                                                    placeholder="Type establishment name"
                                                    type="text"
                                                    onChange={handleChange}
                                                    value={values.name}
                                                />
                                                <p className="form__error">{errors.name}</p>
                                            </div>
                                            <div className="form__item">
                                                <p className="form__label"
                                                >* Establishment type</p>
                                                <select
                                                    className="form__input"
                                                    name="type"
                                                    id="type"
                                                    ref={establishment}
                                                    value={values.type}
                                                    onChange={handleChange}>
                                                    <option value="" disabled>Select type</option>
                                                    <option value="Hotel">Hotel</option>
                                                    <option value="B&B">B&amp;B</option>
                                                </select>
                                                <p className="form__error">{errors.type}</p>
                                            </div>
                                            <div className="form__item">
                                                <p className="form__label"
                                                >* Stars</p>
                                                <select
                                                    className="form__input"
                                                    name="stars"
                                                    id="stars"
                                                    ref={establishment}
                                                    value={values.stars}
                                                    onChange={handleChange}>
                                                    <option value="" disabled>Select star rating</option>
                                                    <option value={1}>1 star</option>
                                                    <option value={2}>2 stars</option>
                                                    <option value={3}>3 stars</option>
                                                    <option value={4}>4 stars</option>
                                                    <option value={5}>5 stars</option>
                                                </select>
                                                <p className="form__error">{errors.stars}</p>
                                            </div>
                                            <div className="form__item">
                                                <p className="form__label"
                                                >* Region</p>
                                                <select
                                                    className="form__input"
                                                    name="region"
                                                    id="region"
                                                    ref={establishment}
                                                    value={values.region}
                                                    onChange={handleChange}>
                                                    <option value="" disabled>Select region</option>
                                                    <option value={"Bergenshus"}>Bergenshus</option>
                                                    <option value={"Årstad"}>Årstad</option>
                                                    <option value={"Fana"}>Fana</option>
                                                    <option value={"Laksevåg"}>Laksevåg</option>
                                                    <option value={"Arna"}>Arna</option>
                                                    <option value={"Fyllingsdalen"}>Fyllingsdalen</option>
                                                    <option value={"Ytrebygda"}>Ytrebygda</option>
                                                    <option value={"Åsane"}>Åsane</option>
                                                </select>
                                                <p className="form__error">{errors.region}</p>
                                            </div>
                                        </div>
                                        <div className="hundred-when-L margin-r">
                                            <div className="form__item">
                                                <p className="form__label"
                                                >* Street address</p>
                                                <input
                                                    id="street_adress"
                                                    ref={establishment}
                                                    className="form__input"
                                                    placeholder="Type the street address"
                                                    type="text"
                                                    onChange={handleChange}
                                                    value={values.street_adress}
                                                />
                                                <p className="form__error">{errors.street_adress}</p>
                                            </div>
                                            <div className="form__item">
                                                <p className="form__label"
                                                >* Zip code</p>
                                                <input
                                                    id="zip_code"
                                                    ref={establishment}
                                                    className="form__input"
                                                    placeholder="Type the zip code"
                                                    type="text"
                                                    onChange={handleChange}
                                                    value={values.zip_code}
                                                />
                                                <p className="form__error">{errors.zip_code}</p>
                                            </div>
                                            <div className="form__item">
                                                <p className="form__label"
                                                >* Postal address</p>
                                                <input
                                                    id="postal_adress"
                                                    ref={establishment}
                                                    className="form__input"
                                                    placeholder="Type the postal address"
                                                    type="text"
                                                    onChange={handleChange}
                                                    value={values.postal_adress}
                                                />
                                                <p className="form__error">{errors.postal_adress}</p>
                                            </div>
                                            <div className="form__item">
                                                <p className="form__label"
                                                >* Image URL</p>
                                                <input
                                                    id="image"
                                                    ref={establishment}
                                                    className="form__input"
                                                    placeholder="Type the image url"
                                                    type="text"
                                                    onChange={handleChange}
                                                    value={values.image}
                                                />
                                                <p className="form__error">{errors.image}</p>
                                            </div>
                                        </div>
                                        <div className="form__item hundred-when-L margin-r">
                                            <div className="form__item">
                                                <p className="form__label"
                                                    data-tip={`IMPORTANT: Make sure you remove: width, height, style, allowfullscreen and loading properties from the embed. Here is an example of how it should look: <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15802.355005518015!2d5.308357539550781!3d60.324724300000014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x463cf99177a78e9b%3A0x8511c1fd93c7c06!2sTroldhaugen!5e0!3m2!1sen!2sno!4v1620498352892!5m2!1sen!2sno"></iframe>`}
                                                >* Map embed <BsInfoCircleFill></BsInfoCircleFill></p>
                                                <ReactTooltip />
                                                <textarea
                                                    id="map_embed"
                                                    ref={establishment}
                                                    className="form__input form__input--area"
                                                    placeholder="Paste the map embed html and edit"
                                                    type="text"
                                                    rows="10"
                                                    onChange={handleChange}
                                                    value={values.map_embed}
                                                ></textarea>
                                                <p className="form__error">{errors.map_embed}</p>
                                            </div>
                                            <div className="form__item hundred-when-L margin-r">
                                                <p className="form__label"
                                                >Recommended</p>
                                                <div className=" book__check pretty p-icon p-round p-jelly">
                                                    <input
                                                        type="checkbox"
                                                        checked={recommended}
                                                        onChange={handleRecommended} />
                                                    <div className="state p-primary">
                                                        <i className="icon mdi mdi-check"></i>
                                                        <label>Set as recommended</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="flex-when-L">

                                        <div className="hundred-when-L margin-r">
                                            <h3 className="subtitle">Facilities</h3>
                                            <div className="form__item">
                                                <div className=" book__check pretty p-icon p-round p-jelly">
                                                    <input
                                                        type="checkbox"
                                                        checked={fAirCondition}
                                                        onChange={handleFAirCondition} />
                                                    <div className="state p-primary">
                                                        <i className="icon mdi mdi-check"></i>
                                                        <label>Air Condition</label>
                                                    </div>
                                                </div>
                                                <div className=" book__check pretty p-icon p-round p-jelly">
                                                    <input
                                                        type="checkbox"
                                                        checked={fBreakfast}
                                                        onChange={handleFBreakfast} />
                                                    <div className="state p-primary">
                                                        <i className="icon mdi mdi-check"></i>
                                                        <label>Breakfast</label>
                                                    </div>
                                                </div>
                                                <div className=" book__check pretty p-icon p-round p-jelly">
                                                    <input
                                                        type="checkbox"
                                                        checked={fGym}
                                                        onChange={handleFGym} />
                                                    <div className="state p-primary">
                                                        <i className="icon mdi mdi-check"></i>
                                                        <label>Gym</label>
                                                    </div>
                                                </div>
                                                <div className=" book__check pretty p-icon p-round p-jelly">
                                                    <input
                                                        type="checkbox"
                                                        checked={fPets}
                                                        onChange={handleFPets} />
                                                    <div className="state p-primary">
                                                        <i className="icon mdi mdi-check"></i>
                                                        <label>Pets Allowed</label>
                                                    </div>
                                                </div>
                                                <div className=" book__check pretty p-icon p-round p-jelly">
                                                    <input
                                                        type="checkbox"
                                                        checked={fRestaurant}
                                                        onChange={handleFRestaurant} />
                                                    <div className="state p-primary">
                                                        <i className="icon mdi mdi-check"></i>
                                                        <label>Restaurant</label>
                                                    </div>
                                                </div>
                                                <div className=" book__check pretty p-icon p-round p-jelly">
                                                    <input
                                                        type="checkbox"
                                                        checked={fRoomService}
                                                        onChange={handleFRoomService} />
                                                    <div className="state p-primary">
                                                        <i className="icon mdi mdi-check"></i>
                                                        <label>Room Service</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {fBreakfast ?
                                            <div className="form__item hundred-when-L">
                                                <p className="form__label"
                                                >* Breakfast price per day</p>
                                                <input
                                                    id="breakfast_price"
                                                    ref={establishment}
                                                    className="form__input"
                                                    placeholder="Type breakfast price"
                                                    type="number"
                                                    onChange={handleChange}
                                                    value={values.breakfast_price}
                                                />
                                            </div>
                                            : ''
                                        }
                                    </div>


                                    <h3 className="subtitle">Rooms</h3>
                                    <div className="form__item hundred-when-L margin-">
                                        <p className="form__label"
                                        >* Max people</p>
                                        <input
                                            id="max_people"
                                            ref={establishment}
                                            className="form__input form__input--max"
                                            placeholder="Type max people amount"
                                            type="number"
                                            onChange={handleChange}
                                            value={values.max_people}
                                        />
                                        <p className="form__error">{errors.max_people}</p>
                                    </div>
                                    <div className="flex-when-L flex-align-center">
                                        <div className="form__card hundred-when-L margin-r">
                                            <h4 className="medium-title">Standard Room</h4>
                                            <div className="form__item">
                                                <p className="form__label"
                                                >* Standard room price per night in NOK</p>
                                                <input
                                                    id="room_standard_price"
                                                    ref={establishment}
                                                    className="form__input"
                                                    placeholder="Type standard room price"
                                                    type="number"
                                                    onChange={handleChange}
                                                    value={values.room_standard_price}
                                                />
                                                <p className="form__error">{errors.room_standard_price}</p>
                                            </div>
                                        </div>
                                        <div className="form__card hundred-when-L margin-r">
                                            <div>
                                                <div className="space__marg--b book__check pretty p-icon p-round p-jelly">
                                                    <input
                                                        type="checkbox"
                                                        checked={superiorRoom}
                                                        onChange={handleSuperiorRoom} />
                                                    <div className="state p-primary">
                                                        <i className="icon mdi mdi-check"></i>
                                                        <label className="medium-title medium-title--no-marg">Superior Room</label>
                                                    </div>
                                                </div>
                                            </div>
                                            {superiorRoom ?
                                                <div className="form__item">
                                                    <p className="form__label"
                                                    >* Superior room price per night in NOK</p>
                                                    <input
                                                        id="room_superior_price"
                                                        ref={establishment}
                                                        className="form__input"
                                                        placeholder="Type superior room price"
                                                        type="number"
                                                        onChange={handleChange}
                                                        value={values.room_superior_price}
                                                    />
                                                    <p className="form__error">{errors.room_superior_price}</p>
                                                </div>
                                                : ''
                                            }
                                        </div>
                                        <div className="form__card hundred-when-L">
                                            <div>
                                                <div className="space__marg--b book__check pretty p-icon p-round p-jelly">
                                                    <input
                                                        type="checkbox"
                                                        checked={luxuryRoom}
                                                        onChange={handleLuxuryRoom} />
                                                    <div className="state p-primary">
                                                        <i className="icon mdi mdi-check"></i>
                                                        <label className="medium-title medium-title--no-marg">Luxury Room</label>
                                                    </div>
                                                </div>
                                            </div>
                                            {luxuryRoom ?
                                                <div className="form__item">
                                                    <p className="form__label"
                                                    >* Luxury room price per night in NOK</p>
                                                    <input
                                                        id="room_luxury_price"
                                                        ref={establishment}
                                                        className="form__input"
                                                        placeholder="Type luxury room price"
                                                        type="number"
                                                        onChange={handleChange}
                                                        value={values.room_luxury_price}
                                                    />
                                                    <p className="form__error">{errors.room_luxury_price}</p>
                                                </div>
                                                : ''
                                            }
                                        </div>
                                    </div>


                                    {submitted ?
                                        <div className=" form__confirm flex flex--center">
                                            <BsCheckCircle></BsCheckCircle>
                                            <div className=" form__confirm-text">
                                                <p>Thank you!</p>
                                                <p>The establishment has been edited</p>
                                            </div>
                                        </div> : <div className="flex flex--center">
                                            {error ? <div className="flex flex--center">{error}</div> : ''}
                                            <button className="button" type="submit">Edit</button>
                                        </div>}

                                </Form>
                            )}
                        </Formik>
                    </div>
                    : loading ?
                        <img className="loader" src={img} alt="pulsating logo"></img>

                        : error ?
                            <div className="error">{error}
                    </div>

                            : ''
                }


            </div>
        </>
    )


}

export default EditEst;