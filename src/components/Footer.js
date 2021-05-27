import { Link, useHistory } from 'react-router-dom';
import logo from '../img/logo-blue.png';
import { FaTripadvisor } from 'react-icons/fa';
import { AiOutlineFacebook, AiOutlineInstagram } from 'react-icons/ai';
import AuthContext from '../utils/AuthContext';
import { useContext } from 'react';

const Footer = () => {

    const [auth, setAuth] = useContext(AuthContext);

    const history = useHistory();

    function logout() {
        setAuth(null);
        history.push('/');
    }

    return (
        <>
            <footer className="footer">
                <div className="footer--media">
                <div className="footer__general">
                    <img src={logo} alt="Holidaze"></img>
                    <div className="footer__general-text">
                        <p>Holidaze As</p>
                        <p>Bergensgaten 1</p>
                        <p>5020 Bergen</p>
                    </div>
                </div>
                <div className="footer__socials-container">
                    <p className="footer__socials-text">Follow us</p>
                    <div className="footer__socials flex flex--center">
                        <Link className="footer__s-link" to='/'>
                            <FaTripadvisor className="footer__social"></FaTripadvisor>
                        </Link>
                        <Link className="footer__s-link" to='/'>
                            <AiOutlineFacebook className="footer__social"></AiOutlineFacebook>
                        </Link>
                        <Link className="footer__s-link" to='/'>
                            <AiOutlineInstagram className="footer__social"></AiOutlineInstagram>
                        </Link>
                    </div>
                </div>
                <div className="footer__nav">
                    <Link className="footer__link" to='/'>
                        Home
                        </Link>
                    <Link className="footer__link" to='/accommodation'>
                        All accommodation
                        </Link>
                    <Link className="footer__link" to='/contact'>
                        Contact us
                        </Link>
                    {auth ? <div className="footer__link" onClick={logout}>Log out</div> : <Link className="footer__link" to='/login'>
                        Log in
                        </Link>}
                    
                </div>
                </div>
                <div className="footer__copyright">All pictures from <a className="footer__link" href="https://pixabay.com/">Pixabay</a></div>
                <div className="footer__copyright">
                    Copyright 2021 &#169; Holidaze
                </div>
            </footer>
        </>
    )


}

export default Footer;