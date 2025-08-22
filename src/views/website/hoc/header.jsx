import React from 'react';
import Logo from '../../../assets/images/thumbnail_group3.png'
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    const login = () => {
        navigate('/auth/login')
    }

    const register = () => {
        navigate('/auth/register-options')
    }

    return (
        <header className='headerWrapper'>
            <div className='websitelogo'>
                <img src={Logo} alt="logoheader" />
            </div>
            <div className='websitenav'>
                <div onClick={login} className='loginbutton'>
                    LOGIN
                </div>
                <div onClick={register} className='registerbutton'>
                    REGISTER
                </div>
            </div>
        </header>
    )
}

export default Header;