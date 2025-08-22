import React from 'react';
import whitelogo from '../../../assets/images/thumbnail_group.png'

const Footer = (props) => {
    return (
        <div className='footercolor'>
            <footer className='footerwrapper'>
                <div className='footerlogo'>
                    <img src={whitelogo} alt="whitelogo" />
                </div>
                <div className='footerinfo'>
                    <p>Your trusted partner in talent acquisition and professional growth.
                        Dedicated to connecting exceptional talents with leading companies.
                    </p>
                </div>
                <hr />
                <div className='footerbottom'>
                    <div className='footercopyright'>
                        <p>2020 Peworld. All right reserved</p>
                    </div>
                    <div className='footercontactus'>
                        <p>Telephone</p>
                        <p>Email</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer;