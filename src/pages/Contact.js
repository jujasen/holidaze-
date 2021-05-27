import BackLink from '../components/BackLink';
import Heading from '../components/Heading';
import { BsInfoSquare, BsEnvelope, BsPhone, BsCheckCircle } from 'react-icons/bs';
import { useState } from 'react';
import { Formik, Form } from 'formik'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { BASE_URL, MESSAGES_PATH } from '../utils/constants';
import { contactSchema } from '../utils/schemas';
import img from '../img/logo-dark.svg';

const Contact = () => {

    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const { message } = useForm({
        resolver: yupResolver(contactSchema),
    });


    return (
        <>
            <div className="contact">
                <div className="header">
                    <BackLink />
                    <Heading className="header__title" title="Contact us" />
                    <div className="header__contact flex flex--start">
                        <BsInfoSquare></BsInfoSquare>
                        <p>The Holidaze team is here to help</p>
                    </div>
                </div>
                <div className="contact__content media-center--s">
                    <div className=" contact__space flex-when-L flex-space flex-align-center">
                        <div>
                            <div className="contact__content-item flex flex--start">
                                <BsEnvelope></BsEnvelope>
                                <div className="content-item__section--withicon">
                                    <h4>Email</h4>
                                    <p>hello@holidaze.com</p>
                                </div>
                            </div>
                            <div className="contact__content-item flex flex--start">
                                <BsPhone></BsPhone>
                                <div className="content-item__section--withicon">
                                    <h4>Phone</h4>
                                    <p>+47 402 39 232</p>
                                </div>
                            </div>
                        </div>
                        <div className="contact__content-item flex flex--space flex--align-start half-when-L">
                            <div className="content-item__section">
                                <h4>Main office</h4>
                                <p>Holidaze AS<br />
                            Bergensgaten 1<br />
                            5020 Bergen</p>
                            </div>
                            <div className="content-item__section">
                                <h4>Office hours</h4>
                                <p>Mon-fri<br />
                            08.00 - 16.00</p>
                            </div>
                        </div>
                    </div>
                    <h2 className="contact__subtitle">Contact form</h2>
                    
                    <Formik
                        initialValues={{ name: "", email: "", subject: "", message: "" }}
                        validationSchema={contactSchema}
                        onSubmit={async (data) => {
                            setSubmitting(true);

                            const message = {
                                name: data.name,
                                email: data.email,
                                subject: data.subject,
                                message: data.message
                            }

                            try {
                                const response = await axios.post(`${BASE_URL}${MESSAGES_PATH}`, message);
                                console.log(response.data);
                                setSubmitted(true);
                            } catch (error) {
                                console.log('error', error);
                                setError(error.toString());
                            } finally {
                                setSubmitting(false);
                            }
                        }}>
                        {({ values,
                            errors, handleChange }) => (
                            <Form className="form flex-when-L flex-space">
                                {submitting ? <img className="loader loader--short" src={img} alt="pulsating logo"></img> :
                                <div className="hundred-when-L">
                                    <div className="form__item">
                                        <p
                                            className="form__label"
                                        >* Name</p>
                                        <input
                                            id="name"
                                            ref={message}
                                            className="form__input"
                                            placeholder="Type your name"
                                            type="text"
                                            onChange={handleChange}
                                            value={values.name}
                                        />
                                        <p className="form__error">{errors.name}</p>
                                    </div>
                                    <div className="form__item">
                                        <p
                                            className="form__label"
                                        >* E-mail</p>
                                        <input
                                            id="email"
                                            ref={message}
                                            className="form__input"
                                            placeholder="Type your email address"
                                            type="text"
                                            onChange={handleChange}
                                            value={values.email}
                                        />
                                        <p className="form__error">{errors.email}</p>
                                    </div>
                                    <div className="form__item">
                                        <p
                                            className="form__label"
                                        >* Subject</p>
                                        <input
                                            id="subject"
                                            ref={message}
                                            className="form__input"
                                            placeholder="Type the subject of your message"
                                            type="text"
                                            onChange={handleChange}
                                            value={values.subject}
                                        />
                                        <p className="form__error">{errors.subject}</p>
                                    </div>
                                </div>
                                }
                                <div className="hundred-when-L margin-l">
                                    {submitting ? '' : 
                                        <div className="form__item">
                                            <p className="form__label"
                                            >* Message</p>
                                            <textarea
                                                id="message"
                                                ref={message}
                                                className="form__input form__input--area"
                                                placeholder="Describe your reason for contact"
                                                type="text"
                                                rows="5"
                                                onChange={handleChange}
                                                value={values.message}>
                                            </textarea>
                                            <p className="form__error">{errors.message}</p>
                                        </div>}
                                    
                                   
                                    {submitted ?
                                        <div className=" form__confirm flex flex--center">
                                            <BsCheckCircle></BsCheckCircle>
                                            <div className=" form__confirm-text">
                                                <p>Thank you!</p>
                                                <p>Your message is sent</p>
                                            </div>
                                        </div> : <div className="flex flex--center">
                                            {error ? <div className="flex flex--center">{error}</div> : ''}
                                            <button className="button" type="submit">Send message</button>
                                        </div>}
                                </div>


                            </Form>
                        )}
                    </Formik>
                    
                </div>

            </div>
        </>
    )


}

export default Contact;