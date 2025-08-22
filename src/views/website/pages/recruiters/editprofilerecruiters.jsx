/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import imageDefault from '../../../../assets/images/profile1.png';
import edit from '../../../../assets/images/edit.png';
import { useNavigate } from 'react-router-dom';
import FormField from '../../../utils/formfield';
import { update } from '../../../utils/formAction';
import map from '../../../../assets/images/map.png';
import API from '../../../../configs/api';
import TextField from '../../../utils/textfield';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchRecruiter, updateRecruiterPhotoProfile, updateRecruiterProfile } from '../../../../storeredux/actions/recruiter.action';
import { useDispatch, useSelector } from 'react-redux';

const EditProfileRecruiters = () => {
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(imageDefault);
    const [imageFile, setImageFile] = useState([]);
    const dispatch = useDispatch();
    const profile = useSelector(state => state.recruiterProfile.profile);
    const loading = useSelector(state => state.recruiterProfile.loading);
    const error = useSelector(state => state.recruiterProfile.error);
  
    const [formdata, formdataHandler] = useState({
        name: {
            element: 'input',
            value: '',
            config: {
                name: 'Company name',
                type: 'text',
                placeholder: 'Enter your Company name'
            },
            validation: {
                required: true,
            }
        },
        city: {
            element: 'input',
            value: '',
            config: {
                name: 'City',
                type: 'text',
                placeholder: 'Enter your City'
            },
            validation: {
                required: true
            }
        },
        description: {
            element: 'input',
            value: '',
            config: {
                name: 'Description',
                type: 'textarea',
                placeholder: 'Enter your Description'
            },
            validation: {
                required: true
            }
        },
        instagram: {
            element: 'input',
            value: '',
            config: {
                name: 'Instagram',
                type: 'text',
                placeholder: 'Enter your Instagram'
            },
            validation: {
                required: true
            }
        },
        phone: {
            element: 'input',
            value: '',
            config: {
                name: 'Phone',
                type: 'number',
                placeholder: 'Enter your Phone number'
            },
            validation: {
                required: true
            }
        },
        linkedin: {
            element: 'input',
            value: '',
            config: {
                name: 'Linked In',
                type: 'text',
                placeholder: 'Enter your Linked in'
            },
            validation: {
                required: true
            }
        },
        position: {
            element: 'input',
            value: '',
            config: {
                name: 'Position',
                type: 'text',
                placeholder: 'Enter your Position'
            },
            validation: {
                required: true
            },
        },
    });

  
    const navigate = useNavigate();
  
    useEffect(() => {
      dispatch(fetchRecruiter());
    }, [dispatch]);

    useEffect(() => {
        if (profile.photo) {
            setPreviewImage(profile.photo);
        } else {
            setPreviewImage(imageDefault);
        }
    }, [profile]);

  
    useEffect(() => {
        if (profile) {
            formdataHandler({
                ...formdata,
                name: { ...formdata.name, value: profile.name },
                position: { ...formdata.position, value: profile.position },
                city: { ...formdata.city, value: profile.city },
                phone: { ...formdata.phone, value: profile.phone },
                description: { ...formdata.description, value: profile.description },
                linkedin: { ...formdata.linkedin, value: profile.linkedin },
                instagram: { ...formdata.instagram, value: profile.instagram },
            });
        }
    }, [profile]);
    
  
    const handleUpdateProfile = () => {
        const updateData = {
            name: formdata.name.value,
            position: formdata.position.value,
            city: formdata.city.value,
            phone: formdata.phone.value,
            description: formdata.description.value,
            linkedin: formdata.linkedin.value,
            instagram: formdata.instagram.value,
        };
        console.log("Update data:", updateData);
        dispatch(updateRecruiterProfile(updateData));
        navigate('/recruiters/profile');
        toast.success('Update Profile Successfully!!');
    };
    
  
    const handleCancelButton = () => {
      navigate('/recruiters/profile');
    };
  
    const updateForm = (element) => {
        const newFormdata = update(element, formdata);
        formdataHandler(newFormdata);
    };

  
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

  
    const handleProfilePhoto = () => {
        if (imageFile) {
            dispatch(updateRecruiterPhotoProfile(imageFile));
            toast.success('Profile photo updated successfully!');
            navigate('/recruiters/profile');
        } else {
            toast.error('Please select an image first.');
        }
    };

    return (
        <div id='recruiterspages'>
            <section>
                <div className='homecolor bgedit'>
                    <div className='purplebackground'>
                        <div className='lefteditprofile'>
                            <div className='editprofilewrapper'>
                                <div className='imageprofile'>
                                <img src={previewImage} alt="Profile" />
                                </div>
                                <div className='uploadprofile'>
                                <button onClick={handleProfilePhoto}>Upload</button>
                                </div>
                                <div className='editprofile'>
                                    <label htmlFor='file-input'>
                                    <input
                                        id='file-input'
                                        type='file'
                                        style={{ display: 'none' }}
                                        onChange={handleImageUpload}
                                    />
                                    <img src={edit} alt="editphoto" />
                                    </label>
                                </div>
                                <div className='profiledata'>
                                    <h3>{profile.name || 'Company Name:'}</h3>
                                    <h2>{profile.position || 'Position:'}</h2>
                                    <div className='recruiterdomicile'>
                                        <img src={map} alt="mapdomicile" /><p>{profile.city || 'City:'}</p>
                                    </div>
                                </div>
                                <div className='editcontainer'>
                                    <div onClick={handleUpdateProfile} className='Savebutton'>
                                        Save
                                    </div>
                                    <div onClick={handleCancelButton} className='Cancelbutton'>
                                        Cancel
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='righteditprofile'>
                            <div className='editformwrapper'>
                                <div className='title-form'>
                                    Personal Data
                                </div>
                                <hr />
                                <form>
                                    <FormField
                                        id={'name'}
                                        formdata={formdata.name}
                                        change={(element) => updateForm(element)}
                                    />
                                    <FormField
                                        id={'position'}
                                        formdata={formdata.position}
                                        change={(element) => updateForm(element)}
                                    />
                                    <FormField
                                        id={'city'}
                                        formdata={formdata.city}
                                        change={(element) => updateForm(element)}
                                    />
                                    <div className='descriptionform'>
                                        <TextField
                                            id={'description'}
                                            formdata={formdata.description}
                                            change={(element) => updateForm(element)}
                                            />
                                    </div>
                                    <FormField
                                        id={'instagram'}
                                        formdata={formdata.instagram}
                                        change={(element) => updateForm(element)}
                                    />
                                    <FormField
                                        id={'phone'}
                                        formdata={formdata.phone}
                                        change={(element) => updateForm(element)}
                                    />
                                    <FormField
                                        id={'linkedin'}
                                        formdata={formdata.linkedin}
                                        change={(element) => updateForm(element)}
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default EditProfileRecruiters;
