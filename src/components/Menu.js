import { Link, useHistory } from 'react-router-dom';
import { useState, useContext } from 'react';
import logo from '../img/logo-white.png';
import { HiOutlineMenuAlt1 } from 'react-icons/hi';
import { CgClose } from 'react-icons/cg';
import { FaTripadvisor } from 'react-icons/fa';
import { AiOutlineFacebook, AiOutlineInstagram } from 'react-icons/ai';
import AuthContext from '../utils/AuthContext';

const Menu = () => {

    const [menuClosed, setMenu] = useState("false");
    const [auth, setAuth] = useContext(AuthContext);

    const history = useHistory();

    function logout() {
        setAuth(null);
        history.push('/');
    }

    const handleToggle = () => {
        setMenu(!menuClosed);
    };

    return (
        <>
            <nav className="menu">
                <div className="flex flex--space">
                    <Link to="/">
                        <img className="menu__logo" src={logo} alt="Holidaze"></img>
                    </Link>
                    <div className="flex flex--start">
                        {auth ? <button className="button--simple" onClick={logout}>Log out</button> : ''}
                        {
                            menuClosed ?
                                <HiOutlineMenuAlt1
                                    onClick={handleToggle} className="menu__toggle">
                                </HiOutlineMenuAlt1>
                                :
                                <CgClose
                                    onClick={handleToggle}
                                    className="menu__toggle">
                                </CgClose>
                        }
                    </div>

                </div>
                { !menuClosed ? 
                    <div className="menu__open">
                    <div className="menu__nav flex flex--col">
                            <Link onClick={handleToggle} className="menu__link" to='/'>
                            Home
                        </Link>
                            <Link onClick={handleToggle} className="menu__link" to='/accommodation'>
                            All accommodation
                        </Link>
                            <Link onClick={handleToggle} className="menu__link" to='/contact'>
                            Contact us
                        </Link>
                            {auth ? 
                            <>
                            <Link onClick={handleToggle} className="menu__link" to='/panel'>
                                    Admin panel
                            </Link>
                            <div className="menu__link" onClick={() => {
                                logout();
                                handleToggle();
                            }}>Log out</div> 
                            </>
                            :
                            <Link onClick={handleToggle} className="menu__link" to='/login'>
                                    Log in
                            </Link>
                            }
                        
                    </div>
                    <p>Follow us</p>
                    <div className="menu__socials flex flex--center">
                            <Link className="menu__s-link" to='/'>
                                <FaTripadvisor className="menu__social"></FaTripadvisor>
                        </Link>
                            <Link className="menu__s-link" to='/'>
                                <AiOutlineFacebook className="menu__social"></AiOutlineFacebook>
                        </Link>
                            <Link className="menu__s-link" to='/'>
                                <AiOutlineInstagram className="menu__social"></AiOutlineInstagram>
                        </Link>
                    </div>
                </div>
                    :
                    ''
                }

            </nav>

        </>
    )


}

export default Menu;