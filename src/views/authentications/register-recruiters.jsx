import React from 'react';
import FormField from '../utils/formfield';
import { generateData, isDataValid, update } from '../utils/formAction';
import { useNavigate } from 'react-router-dom';
import API from '../../configs/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterRecruiters = () => {

    const SignIn = () => {
       navigate('/auth/login');
    }

    const navigate = useNavigate();
    const [formdata, formdataHandler] = React.useState({
        name: {
            element: 'input',
            value: '',
            config: {
                name: 'Name',
                type: 'text',
                placeholder: 'Enter your name'
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
                type: 'email',
                placeholder: 'Enter your email'
            },
            validation: {
                required: true,
                email: true
            }
        },
        company: {
            element: 'input',
            value: '',
            config: {
                name: 'Company',
                type: 'Text',
                placeholder: 'Enter your company'
            },
            validation: {
                required: true,
                email: true
            }
        },
        position: {
            element: 'input',
            value: '',
            config: {
                name: 'Position',
                type: 'Text',
                placeholder: 'Enter your position in the company'
            },
            validation: {
                required: true,
                email: true
            }
        },
        phone: {
            element: 'input',
            value: '',
            config: {
                name: 'No Handphone',
                type: 'number',
                placeholder: 'Enter your phone number'
            },
            validation: {
                required: true
            }
        },
        password: {
            element: 'input',
            value: '',
            config: {
                name: 'Password',
                type: 'password',
                placeholder: 'Enter your password'
            },
            validation: {
                required: true
            }
        },
        confirmpassword: {
            element: 'input',
            value: '',
            config: {
                name: 'Confirm Password',
                type: 'password',
                placeholder: 'Confirm your password'
            },
            validation: {
                required: true
            }
        }
    });

    const updateForm = (event) => {
        const newFormdata = update(event, formdata);
        formdataHandler(newFormdata)
    }

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    const validatePhone = (phone) => {
        return /^[0-9]{10,12}$/.test(phone);
    }
    
    const submitForm = (event) => {
        event.preventDefault();
        event.stopPropagation();
    
        if (formdata.password.value !== formdata.confirmpassword.value) {
            toast.error('Password not match')
            console.log('Password not match');
            return;
        }
    
        if (!validateEmail(formdata.email.value)) {
            toast.error('Invalid email')
            console.log('Invalid email');
            return;
        }
    
        if (!validatePhone(formdata.phone.value)) {
            toast.error('Invalid phone number')
            console.log('Invalid phone number');
            return;
        }
    
        let data = generateData(formdata);
        let isvalid = isDataValid(formdata);
    
        if (isvalid) {
            API.post('/users/register/recruiters', data)
            .then(res => {
                toast.success('Register Successfully!!')
                console.log(res);
                navigate('/')
                return isvalid
            })
            .catch(error => {
                toast.error('Error fetching data')
                console.log('Error fetching data', error.message);
            })
        } else {
            toast.info('Please fill the form')
            console.log('Please fill the form')
        }
    }
    
    return (
        <div id="register" className='innerWrapper'>
            <div className='title'>
                <h1>Hello, Pewpeople</h1>
            </div>
            <div className='description'>
                <p>Please register first to enter this website.</p>
            </div>
            <form onSubmit={(event) => submitForm(event)}>
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
                    id={'company'}
                    formdata={formdata.company}
                    change={(element) => updateForm(element)}
                />
                <FormField
                    id={'position'}
                    formdata={formdata.position}
                    change={(element) => updateForm(element)}
                />
                <FormField
                    id={'phone'}
                    formdata={formdata.phone}
                    change={(element) => updateForm(element)}
                />
                <FormField
                    id={'password'}
                    formdata={formdata.password}
                    change={(element) => updateForm(element)}
                />
                <FormField
                    id={'confirmpassword'}
                    formdata={formdata.confirmpassword}
                    change={(element) => updateForm(element)}
                />
            </form>
            <div className='submitButton'
            onClick={(event)=> submitForm(event)}>
                Register
            </div>
            <div className='urlButton'>
                <p>Already have account ?<span onClick={SignIn}> Sign in</span></p>
            </div>
        </div>
    )
}

export default RegisterRecruiters;