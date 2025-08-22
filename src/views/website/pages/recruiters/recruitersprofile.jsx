/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import defaultImage from '../../../../assets/images/profile1.png';
import emailicon from '../../../../assets/images/pngegg (1).png';
import phoneicon from '../../../../assets/images/phone.png';
import instagram from '../../../../assets/images/instagram.png';
import linkedin from '../../../../assets/images/LinkedIn.png';
import map from '../../../../assets/images/map.png';
import { useNavigate } from 'react-router-dom';
import API from '../../../../configs/api';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecruiter } from '../../../../storeredux/actions/recruiter.action';

const RecruitersProfile = () => {
  const navigate = useNavigate();
  // const [profile, setProfile] = useState({});
  // const [imageFile, setImageFile] = useState(null);

  const dispatch = useDispatch();
  const {profile, loading, error} = useSelector((state) => state.recruiterProfile);

  useEffect(() => {
    dispatch(fetchRecruiter());
  }, [dispatch])

  if (loading) {
    return <p>Loading....</p>
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  const handleEditProfile = () => {
    navigate('/recruiters/editprofile');
  };

  // const handleGetProfile = async () => {
  //   try {
  //     const res = await API.get('/recruiters/profile');
  //     setProfile(res.data.profile);
  //     console.log(res, '<<<<<<<<<<<<<<<<<<<<res profile');
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  // const handleBackgroundImageUpload = async (event) => {
  //   if (event.target.files && event.target.files[0]) {
  //     const file = event.target.files[0];
  //     setImageFile(file);

  //     const formData = new FormData();
  //     formData.append('background', file);
  //     try {
  //       const res = await API.post('/upload', formData, {
  //         headers: { 'Content-Type': 'multipart/form-data' }
  //       });
  //       setProfile(res.data.photo);
  //       toast.success('Background image updated successfully!');
  //     } catch (error) {
  //       console.error(error.message);
  //       toast.error('Failed to update background image.');
  //     }
  //   }
  // };

  // useEffect(() => {
  //   handleGetProfile();
  // }, []);

  return (
    <div id='recruiterspages'>
      <section>
        <div className='homecolor'>
          <div className='recruiterscontainer'>
            <div className='recruiterswrapper'>
              <div className='rectanglepurple'>
                {/* <label htmlFor='background-upload' style={{ cursor: 'pointer' }}>
                  Change Background
                </label>
                <input
                  id='background-upload'
                  type='file'
                  style={{ display: 'none' }}
                  onChange={handleBackgroundImageUpload}
                /> */}
              </div>
              <div className='rectanglewhite'>
                <div className='imageprofilerecruiter'>
                  <img src={profile.photo || defaultImage} alt="defaultimage" />
                </div>
                <div className='RecruitersProfile'>
                  <div>
                    <h3>{profile.name || 'Company Name:'}</h3>
                    <h2>{profile.position || 'Position:'}</h2>
                    <div className='citycontainer'><img src={map} alt="mapicon" /><p>{profile.city || 'Domicile:'}</p></div>
                    <p>{profile.description || 'Description:'}</p>
                  </div>
                </div>
                <div className='recruiterdata'>
                  <div onClick={handleEditProfile} className='editRecruiterButton'>
                    Edit Profile
                  </div>
                </div>
                <div className='socialmedia'>
                  <div className='subsocialmedia'>
                    <div className='iconsocialmedia'>
                      <img src={emailicon} alt="emailicon" /><p>{profile.email || 'Email:'}</p>
                    </div>
                    <div className='iconsocialmedia'>
                      <img src={instagram} alt="instagramicon" /><p>{profile.instagram || 'Instagram:'}</p>
                    </div>
                    <div className='iconsocialmedia'>
                      <img src={phoneicon} alt="phoneicon" /><p>{profile.phone || 'Phone:'}</p>
                    </div>
                    <div className='iconsocialmedia'>
                      <img src={linkedin} alt="linkedin" /><p>{profile.linkedin || 'LinkedIn:'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RecruitersProfile;
