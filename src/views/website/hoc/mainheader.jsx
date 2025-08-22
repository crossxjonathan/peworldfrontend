import React from 'react';
import Logo from '../../../assets/images/thumbnail_group3.png'
import { useNavigate } from 'react-router-dom';
import { VscSignOut } from "react-icons/vsc";
import { CgProfile } from "react-icons/cg";
import { IoIosNotifications } from "react-icons/io";
import { IoIosHome } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { checkUserRole } from '../../../storeredux/actions/user.action';

const MainHeader = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { role } = useSelector((state) => state.role);

    console.log(role, '<<<<<<<<<<<<<<<<<role');
    React.useEffect(() => {
        dispatch(checkUserRole());
    }, [dispatch]);

    const handleNotif = () => {
        if (role === 'recruiters') {
            navigate('/recruiters/history');
        } else {
            navigate('/workers/history');
        }
    };

    const handleHome = () => {
        if (role === 'recruiters') {
            navigate('/recruiters/home');
        } else {
            navigate('/workers/home');
        }
    };

    const handleProfile = () => {
        if (role === 'recruiters') {
            navigate('/recruiters/profile');
        } else {
            navigate('/workers/profile');
        }
    };

    const handleLogout = () => {
        Cookies.remove('token');
        Cookies.remove('refreshToken');
        navigate('/');
    };

    return (
        <header className='mainHeaderWrapper'>
            <div className='mainwebsitelogo'>
                <img src={Logo} alt="logoheader" />
            </div>
            <div className='mainwebsitenav'>
                <div onClick={handleNotif} className='notification' style={{ fontSize: '28px' }}>
                    <IoIosNotifications />
                </div>
                <div onClick={handleHome} className='home' style={{ fontSize: '28px' }}>
                    <IoIosHome />
                </div>
                <div onClick={handleProfile} className='profile' style={{ fontSize: '28px' }}>
                    <CgProfile />
                </div>
                <div onClick={handleLogout} className='logout' style={{ fontSize: '28px' }}>
                    <VscSignOut />
                </div>
            </div>
        </header>
    )
}

export default MainHeader;
