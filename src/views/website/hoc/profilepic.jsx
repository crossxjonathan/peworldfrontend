/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const Profile = ({onClick, className, image}) => {
  return (
    <div id='pagewebsite' className={`profileheader${className}`} onClick={onClick}>
        <img src={image} alt="Profileimg" />
    </div>
  )
}

export default Profile;