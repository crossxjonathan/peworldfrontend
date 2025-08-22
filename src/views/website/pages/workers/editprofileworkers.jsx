/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import cloud1 from '../../../../assets/images/cloud1.png';
import resolution from '../../../../assets/images/Group (1).png';
import size from '../../../../assets/images/expand 2.png';
import imageDefault from '../../../../assets/images/profile1.png';
import edit from '../../../../assets/images/edit.png';
import { IoIosCloseCircle } from "react-icons/io";
import experienceDefault from '../../../../assets/images/office-center.png';

import FormField from '../../../utils/formfield';
import { update } from '../../../utils/formAction';
import { useNavigate } from 'react-router-dom';
import API from '../../../../configs/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextField from '../../../utils/textfield';
import portfolioDefault from '../../../../assets/images/Rectangle 641.png';

const EditProfileWorkers = () => {
    const [selectType, setSelectType] = useState('mobile');
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(imageDefault);
    const [skill, setSkill] = useState('');
    const [profile, setProfile] = useState({ photo: imageDefault });
    const [port, setPort] = useState({});
    const [workers, setWorkers] = useState('');
    const [skills, setSkills] = useState([]);
    const [experience, setExperience] = useState('');
    const [portfolio, setPortfolio] = useState('');
    const [imageFile, setImageFile] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if (profile.photo) {
            setPreviewImage(profile.photo);
        } else {
            setPreviewImage(imageDefault);
        }
    }, [profile]);


    const GetProfile = async () => {
        try {
            const res = await API.get('/workers/profile');
            console.log(res, '<<<<<<<<<<<<<<<<<<<res');
            setProfile(res.data.profile);
            setFormdata({
                ...formdata,
                name: { ...formdata.name, value: res.data.profile.name },
                jobdesk: { ...formdata.jobdesk, value: res.data.profile.job_desk },
                domicile: { ...formdata.domicile, value: res.data.profile.domicile },
                workplace: { ...formdata.workplace, value: res.data.profile.workplace },
                description: { ...formdata.description, value: res.data.profile.description },
            });
            setSkills(res.data.skills || []);
        } catch (error) {
            console.log(error.message);
            toast.error('Failed to Fetch Profile.');
        }
    }

    const handleUpdateProfile = async () => {
        try {
            const updateData = {
                name: formdata.name.value,
                job_desk: formdata.jobdesk.value,
                domicile: formdata.domicile.value,
                workplace: formdata.workplace.value,
                description: formdata.description.value,
            };
            const res = await API.put('/workers/profile', updateData);
            setWorkers(res.data.data);
            toast.success('Update Profile Successfully!!');
            navigate('workers/profile');
        } catch (error) {
            console.log(error.message);
            toast.error('Failed to update profile.');
        }
    }

    const handleAddSkill = async (event) => {
        event.preventDefault();
        try {
            const skillValue = formdata.skill.value;
            const skillData = {
                skill_name: skillValue,
            };
            const res = await API.post('/skills', skillData);
            navigate('/workers/profile')
            setSkills([...skills, res.data.data]);
            toast.success('Add Skill Successfully!!');
            navigate('/workers/profile');
            setFormdata({
                ...formdata,
                skillData: { ...formdata.skill_name, value: '' }
            });
        } catch (error) {
            console.log(error.message);
            toast.error('Failed to Add Skill.');
        }
    }

    const handleGetSkill = async () => {
        try {
            const res = await API.get('/skills');
            setSkills(res.data.data)
            console.log(res, '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<res Skill');
        } catch (error) {
            console.log(error.message);
            toast.error('Failed to Fetch Skill.');
        }
    }

    const handleDeleteSkill = async (id) => {
        try {
            const res = await API.delete(`/skills/${id}`);
            setSkills(res.data.data);
            toast.success('Delete Skill Successfully!!');
        } catch (error) {
            console.log(error.message);
            toast.error('Failed to Delete Skill.');
        }
    }


    const handleAddExperience = async () => {
        try {
            const experienceData = {
                position: formdata.position.value,
                company_name: formdata.company.value,
                month_company: formdata.datecompany.value.split(' ')[0],
                year_company: formdata.datecompany.value.split(' ')[1],
                description_company: formdata.descriptionExperience.value,
            }

            const res = await API.post('/experience', experienceData);
            setExperience([...experience, res.data.data]);
            toast.success('Add Experience Successfully!!');
            navigate('/workers/profile');
            // console.log(res, '<<<<<<<<<<<<<<<<<<<<<<<<<<<res experience');
        } catch (error) {
            console.log(error.message);
            toast.error('Failed to Add Experience.');
        }
    }


    const handleGetExperience = async () => {
        try {
            const res = await API.get('/experience');
            console.log(res, '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<get experience');
            setExperience(res.data.data)
        } catch (error) {
            console.log(error.message);
            toast.error('Failed to Fetch Experience.');
        }
    }

    const [formdata, setFormdata] = useState({
        name: {
            element: 'input',
            value: '',
            config: {
                name: 'Fullname',
                type: 'text',
                placeholder: 'Enter your name'
            },
            validation: {
                required: true
            }
        },
        jobdesk: {
            element: 'input',
            value: '',
            config: {
                name: 'Job desk',
                type: 'text',
                placeholder: 'Enter your job desk'
            },
            validation: {
                required: true
            }
        },
        domicile: {
            element: 'input',
            value: '',
            config: {
                name: 'Domicile',
                type: 'text',
                placeholder: 'Enter your Domicile'
            },
            validation: {
                required: true
            }
        },
        workplace: {
            element: 'input',
            value: '',
            config: {
                name: 'Workplace',
                type: 'text',
                placeholder: 'Enter your Workplace'
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
        descriptionExperience: {
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
        skill: {
            element: 'input',
            value: '',
            config: {
                name: '',
                type: 'text',
                placeholder: 'Enter your Skill'
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
            }
        },
        company: {
            element: 'input',
            value: '',
            config: {
                name: 'Company name',
                type: 'text',
                placeholder: 'Enter your Company name'
            },
            validation: {
                required: true
            }
        },
        datecompany: {
            element: 'input',
            value: '',
            config: {
                name: 'Month/Year',
                type: 'text',
                placeholder: 'ex: January 2024'
            },
            validation: {
                required: true
            }
        },
        application: {
            element: 'input',
            value: '',
            config: {
                name: 'Application name',
                type: 'text',
                placeholder: 'Enter your Application name'
            },
            validation: {
                required: true
            }
        },
        repository: {
            element: 'input',
            value: '',
            config: {
                name: 'Link repository',
                type: 'text',
                placeholder: 'Enter your Link repository'
            },
            validation: {
                required: true
            }
        }
    });

    const handleTypePortofolio = (event) => {
        setSelectType(event.target.value);
    };

    const updateForm = (event) => {
        const newFormdata = update(event, formdata);
        setFormdata(newFormdata);

        if (event && event.target && event.target.id === 'skill') {
            setSkill(event.target.value);
        }
    }

    const AddExperience = () => {
        handleAddExperience();
        navigate('/workers/profile');
        toast.success('Add Work Experience Successfully!!')
    }

    const DeleteExperience = async (id) => {
        try {
            const res = await API.delete(`/experience/${id}`);
            setExperience(res.data.data);
            toast.success('Delete Work Experience Successfully!!')
        } catch (error) {
            console.log(error.message);
            toast.error('Failed to Delete Experience.');
        }
    }

    const handleAddPortfolio = async () => {

        try {
            const imageData = await handleAddImage();
            const portfolioData = {
                application_name: formdata.application.value,
                link_repository: formdata.repository.value,
                type_portfolio: selectType,
                upload_image: imageData.file_url,
            };

            const res = await API.post('/portfolio', portfolioData);
            setPortfolio([...portfolio, res.data]);
            toast.success('Portfolio Added Successfully!!');
            navigate('/workers/profile');
        } catch (error) {
            console.log('Error adding portfolio:', error.message);
            toast.error('Failed to add portfolio');
        }
    };

    const Deleteportfolio = async (id) => {
        try {
            console.log(id, '<<<<<<<<<<<<<<<<<<<<<DELETE THIS ID')
            const res = await API.delete(`/portfolio/${id}`);
            setPortfolio(res.data.data);
            toast.success('Delete Portfolio Successfully!!')
        } catch (error) {
            console.log(error.message);
            toast.error('Failed to Delete Portfolio.');
        }
    }


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

    const handleAddImage = async () => {
        try {
            const formData = new FormData();
            formData.append('photo', imageFile);
            const res = await API.post('/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            // console.log(res, '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<res add image');
            toast.success('Upload Image Successfully!!');
            return res.data.data;
        } catch (error) {
            console.error(error.message);
            toast.error('Failed to Add Image.');
            return null;
        }
    };

    const handleProfilePhoto = async () => {
        if (!imageFile) {
            toast.error('No image selected.');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('photo', imageFile);
            const res = await API.put('/workers/profile/photo', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setProfile(res.data.data);
            setPreviewImage(res.data.data.photo);
            toast.success('Profile photo updated successfully!');
            navigate('/workers/profile');
        } catch (error) {
            console.error(error.message);
            toast.error('Failed to update profile photo.');
        }
    };


    const handleGetPortfolio = async () => {
        try {
            const res = await API.get('/portfolio');
            // console.log(res.data.data, '<<<<<<<<<<<<<<<<<<<<res876876876876');
            setPort(res.data.data);

        } catch (error) {
            console.log(error.message);
            toast.error('Failed to Fetch portfolio.');
        }
    }

    const handleSaveButton = () => {
        handleUpdateProfile();
        navigate('/workers/profile');
        toast.success('Update Profile Successfully!!')
    }

    const handleCancelButton = () => {
        navigate('/workers/profile');
    }


    useEffect(() => {
        GetProfile();
        handleGetSkill();
        handleGetExperience();
        handleGetPortfolio();
    }, []);

    return (
        <div id='workerspages'>
            <section>
                <div className='homecolor bgedit'>
                    <div className='purplebackground'>
                        <div className='lefteditprofile'>
                            <div className='editprofilewrapper'>
                                <div className='imageprofile'>
                                    <img src={previewImage} alt="imagedefault" />
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
                                    <h3>{profile.name || 'Name:'}</h3>
                                    <h2>{profile.job_desk || 'Position:'}</h2>
                                    <p>{profile.domicile || 'Domicile:'}</p>
                                    <p>{profile.workplace || 'Company:'}</p>
                                </div>
                                <div className='editcontainer'>
                                    <div onClick={() => handleSaveButton()} className='Savebutton'>
                                        Save
                                    </div>
                                    <div onClick={() => handleCancelButton()} className='Cancelbutton'>
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
                                        id={'jobdesk'}
                                        formdata={formdata.jobdesk}
                                        change={(element) => updateForm(element)}
                                    />
                                    <FormField
                                        id={'domicile'}
                                        formdata={formdata.domicile}
                                        change={(element) => updateForm(element)}
                                    />
                                    <FormField
                                        id={'workplace'}
                                        formdata={formdata.workplace}
                                        change={(element) => updateForm(element)}
                                    />
                                    <div className='descriptionform'>
                                        <TextField
                                            id={'description'}
                                            formdata={formdata.description}
                                            change={(element) => updateForm(element)}
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className='editSkillprofile'>
                                <div className='title-skill'>
                                    Skill
                                </div>
                                <hr />
                                <form>
                                    <div className='skillContainer'>
                                        <FormField
                                            id={'skill'}
                                            formdata={formdata.skill}
                                            change={(event) => updateForm(event)}
                                            value={skill}
                                        />
                                        <div className='skill-button' onClick={handleAddSkill}>
                                            Add Skill
                                        </div>
                                    </div>
                                    <div className='skillbox'>
                                        {skills && skills.length > 0 ? (
                                            skills.map((item, index) => (
                                                <div key={item.id + '-' + index} className='skillcard'>
                                                    {item.skill_name} <IoIosCloseCircle onClick={() => handleDeleteSkill(item.id)} />
                                                </div>
                                            ))
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                </form>
                            </div>
                            <div className='work-experience'>
                                <div className='title-form'>
                                    Work Experience
                                </div>
                                <hr />
                                <form>
                                    <div className='workexperienceform'>
                                        <FormField
                                            id={'position'}
                                            formdata={formdata.position}
                                            change={(element) => updateForm(element)}
                                        />
                                        <div className='companyform'>
                                            <FormField
                                                id={'company'}
                                                formdata={formdata.company}
                                                change={(element) => updateForm(element)}
                                            />
                                            <FormField
                                                id={'datecompany'}
                                                formdata={formdata.datecompany}
                                                change={(element) => updateForm(element)}
                                            />
                                        </div>
                                        <div className='descriptionform'>
                                            <TextField
                                                id={'descriptionExperience'}
                                                formdata={formdata.descriptionExperience}
                                                change={(element) => updateForm(element)}
                                            />
                                        </div>
                                        <hr />
                                    </div>
                                    <div onClick={() => AddExperience()} className='add-experience'>
                                        Add Work Experience
                                    </div>
                                    {experience && experience.length > 0 ? (
                                        experience.map((item, index) => (
                                            <div key={item.id + '-' + index} className='experienceContainer'>
                                                <img src={experienceDefault} alt="experienceimg" />
                                                <div className='experiencedetail'>
                                                    <h4>{item.position}</h4>
                                                    <h2>{item.company_name}</h2>
                                                    <p>{item.month_company} {item.year_company}</p>
                                                    <div className='descExp'>
                                                        <p>{item.description_company}</p>
                                                    </div>
                                                    <div onClick={() => DeleteExperience(item.id)} className='DeleteExperience'>
                                                        Delete
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        ''
                                    )}
                                </form>
                            </div>
                            <div className='portofolio'>
                                <div className='title-form'>
                                    Portofolio
                                </div>
                                <hr />
                                <form>
                                    <div className='portofolioform'>
                                        <FormField
                                            id={'application'}
                                            formdata={formdata.application}
                                            change={(element) => updateForm(element)}
                                        />
                                        <FormField
                                            id={'repository'}
                                            formdata={formdata.repository}
                                            change={(element) => updateForm(element)}
                                        />
                                    </div>
                                    <div className='type-portofolio'>
                                        <div className='title-portofolio'>
                                            Type portofolio
                                        </div>
                                        <div className='portofolio-radio'>
                                            <label className="application-mobile">
                                                <input
                                                    type="radio"
                                                    checked={selectType === 'mobile'}
                                                    name="radio"
                                                    value="mobile"
                                                    onChange={handleTypePortofolio}
                                                />
                                                <span className="checkmark"></span>
                                                <p>Mobile Application</p>
                                            </label>
                                            <label className="application-web">
                                                <input
                                                    type="radio"
                                                    name="radio" />
                                                <span className="checkmark"></span>
                                                <p>Web Application</p>
                                            </label>
                                        </div>
                                    </div>
                                    <div className='uploadwrapper'>
                                        <div className='title-portofolio'>
                                            Upload Image
                                        </div>
                                        <div>
                                            <div id="file-upload" className='upload-image'>
                                                <input
                                                    type="file"
                                                    onChange={handleImageUpload}
                                                    style={{ display: 'none' }}
                                                    id="fileInput"
                                                    accept="image/png, image/jpeg, image/gif/ image/jpg"
                                                />
                                                <label htmlFor="fileInput">
                                                    <div className='cloud'>
                                                        <img src={cloud1} alt="cloud1" />
                                                        <h1>Drag & Drop untuk Upload Gambar Aplikasi Mobile</h1>
                                                        <p>Atau cari untuk mengupload file dari direktorimu.</p>
                                                    </div>
                                                    <div className='small-img'>
                                                        <div className='resolution-image'>
                                                            <img src={resolution} alt="resolution" />
                                                            <p>High-Res Image PNG, JPG or GIF</p>
                                                        </div>
                                                        <div className='size-image'>
                                                            <img src={size} alt="size" />
                                                            <p>Size 1080x1920 or 600x800</p>
                                                        </div>
                                                    </div>
                                                </label>
                                            </div>
                                            {image && (
                                                <div className='image-preview'>
                                                    <h2>Preview:</h2>
                                                    <img
                                                        src={image}
                                                        alt="Uploaded Preview"
                                                        style={{ maxWidth: '100%', height: 'auto' }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        <div className='work-portfolio'>
                                            <hr />
                                            <div onClick={() => handleAddPortfolio()} className='add-portfolio'>
                                                Add Portfolio
                                            </div>
                                        </div>
                                        <div>
                                            {port.length > 0 ? (
                                                port.map((item, index) => {
                                                    console.log(item, '<<<item')
                                                    return (
                                                        <div key={item.id + '-' + index} className='portfolioContainer'>
                                                            <img src={item.upload_image || portfolioDefault} alt="portfolioimage" />
                                                            <div className='portdata'>
                                                                <h4>{item.application_name}</h4>
                                                                <h2>{item.link_repository}</h2>
                                                                <p>{item.type_portfolio}</p>
                                                                <div onClick={() => Deleteportfolio(item.id)} className='deletebutton'>
                                                                    Delete
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            ) : (
                                                ''
                                            )}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <ToastContainer />
                </div>
            </section>
        </div>
    )
}

export default EditProfileWorkers