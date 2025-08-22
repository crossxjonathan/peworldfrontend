/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import map from '../.././../../assets/images/map.png';
import imageDefault from '../../../../assets/images/profile1.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { update } from '../../../utils/formAction';
import FormField from '../../../utils/formfield';
import API from '../../../../configs/api';
import { useNavigate, useParams } from 'react-router-dom';
import TextField from '../../../utils/textfield';
import { useDispatch, useSelector } from 'react-redux';
import { hireWorker } from '../../../../storeredux/actions/hire.action';


const HirePage = () => {
    const [activeTab, setActiveTab] = useState('portfolio');
    const [workers, setWorkers] = useState({});
    const [skill, setSkill] = useState({});
    // const [hire, setHire] = useState('');
    const {id} = useParams();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // const hire = useSelector((state) => state.hireWorker);

    const formRef = useRef();

    const [formdata, setFormdata] = useState({
        name: {
            element: 'input',
            value: '',
            config: {
                name: 'Fullname',
                type: 'text',
                placeholder: 'Enter your Fullname'
            },
            validation: {
                required: true,
                email: true
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
        email: {
            element: 'input',
            value: '',
            config: {
                name: 'Email',
                type: 'text',
                placeholder: 'Enter your Email'
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
        message: {
            element: 'input',
            value: '',
            config: {
                name: 'Message Purpose',
                type: 'text',
                placeholder: 'Enter your Message Purpose'
            },
            validation: {
                required: true
            }
        },
    });

    const updateForm = (event) => {
        const newFormdata = update(event, formdata);
        setFormdata(newFormdata);
    }
    

    const handleGetWorkers = async () => {
        try {
            const res = await API.get(`/workers/${id}`);
            setWorkers(res.data.data);
            console.log(res, '<<<<<<<<<<<<<<<<<<<<<<<res workers');
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleGetSkillById = async () => {
        try {
          const res = await API.get(`/skills/${id}`)
          setSkill(res.data.data)
          console.log(id, '<<<<<<<<<<<res skill');
        } catch (error) {
          console.log(error.message);
        }
      }

      const handleHire = async () => {
        try {
            const formData = {
                name: formdata.name.value,
                description: formdata.description.value,
                email: formdata.email.value,
                phone: formdata.phone.value,
                message_purpose: formdata.message.value,
                workers_id: id
            };
            dispatch(hireWorker(formData))
            formRef.current.reset()
            navigate('/recruiters/history')
            toast.success('Hiring Successfully!!');
            // console.log(res, '<<<<<<<<<<<<<<<<<<<<<res hire');
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        handleGetWorkers()
        handleGetSkillById();
    }, [id])

    return (
        <div id='workerspages'>
            <section>
                <div className='homecolor'>
                    <div className='workerscontainer'>
                        <div>
                        </div>
                        <div className='workerswrapper'>
                            <div className='RectangleWhiteLeft'>
                                <div className='personalProfile'>
                                    <div className='imageprofile'>
                                        <img src={workers.photo || imageDefault} alt="imagedefault" />
                                    </div>
                                    <div className='profiledata'>
                                        <h3>{workers.name || 'Name:' }</h3>
                                        <h2>{workers.job_desk || 'Position:'}</h2>
                                        <div className='domicilemap'>
                                            <img src={map} alt="mapdomicile" /> <p>{workers.domicile || 'Domicile:'}</p>
                                        </div>
                                        <p>{workers.workplace || 'Work Place:'}</p>
                                        <p>{workers.description || 'Description:'}</p>
                                    </div>
                                    <div>
                                        <h3>Skill</h3>
                                        <div className='skillContainer'>
                                            {skill.length > 0 ? (
                                                skill.map((item) =>(
                                                    <div key={item.id} className='yellowSkill'>
                                                <p>{item.skill_name || 'Skill:'}</p>
                                            </div>
                                                ))
                                            ) : (
                                                ''
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='RectangleTransparentRight'>
                                <div className='righteditprofile'>
                                    <div className='editformwrapper'>
                                        <div className='title-form'>
                                            <h1>Contact Person</h1>
                                            <p>If you are looking for dedicated and experienced workers for your project, we are ready to help. Please fill out the form below with the required information, and we will contact you as soon as possible.</p>
                                        </div>
                                        <form ref={formRef}>
                                            <FormField
                                                id={'message'}
                                                formdata={formdata.message}
                                                change={(element) => updateForm(element)}
                                            />
                                            <FormField
                                                id={'name'}
                                                formdata={formdata.name}
                                                change={(element) => updateForm(element)}
                                            />
                                            <FormField
                                                id={'email'}
                                                formdata={formdata.email}
                                                change={(element) => updateForm(element)}
                                            />
                                            <FormField
                                                id={'phone'}
                                                formdata={formdata.phone}
                                                change={(element) => updateForm(element)}
                                            />
                                            <div className='descriptionform'>
                                                <TextField
                                                    id={'description'}
                                                    formdata={formdata.description}
                                                    change={(element) => updateForm(element)}
                                                />
                                            </div>
                                            <div onClick={() => handleHire()} className='hirebutton'>
                                                Hire
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ToastContainer />
                </div>
            </section>
        </div>
    );
}

export default HirePage;
