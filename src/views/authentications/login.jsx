import React, { useEffect } from 'react';
import FormField from '../utils/formfield';
import { generateData, isDataValid, update } from '../utils/formAction';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../storeredux/actions';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

const LoginPage = () => {
    const { user, error } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formdata, formdataHandler] = React.useState({
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
            },
            valid: false,
            validationMessage: ''
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
            },
            valid: false,
            validationMessage: ''
        }
    });

    const register = () => {
        navigate('/auth/register-options');
    }

    const updateForm = (event) => {
        const newFormdata = update(event, formdata);
        formdataHandler(newFormdata);
    }

    const submitForm = (event) => {
        event.preventDefault();
        event.stopPropagation();

        let data = generateData(formdata);
        let isvalid = isDataValid(formdata);

        if (isvalid) {
            dispatch(loginAction(data.email, data.password, navigate));
        } else {
            console.log('invalid data');
        }
    }

    useEffect(() => {
        if (user) {
            const { role } = user.data;
            if (role === 'workers') {
                navigate('/workers/home');
            } else if (role === 'recruiters') {
                navigate('/recruiters/home');
            }
            toast.success('Welcome!!!');
        }
    }, [user, navigate]);

    useEffect(() => {
        if (error) {
            toast.error('Your Email & Password is incorrect. Please try again.');
        }
    }, [error]);

    return (
        <div id="login" className='innerWrapper'>
            <ToastContainer position="bottom-right" />
            <div className='title'>
                <h1>Hello, Pewpeople</h1>
            </div>
            <div className='description'>
                <p>Log in to find many of the best talents only here according to your needs.</p>
            </div>
            <form onSubmit={(event) => submitForm(event)}>
                <FormField
                    id={'email'}
                    formdata={formdata.email}
                    change={(element) => updateForm(element)}
                />
                <FormField
                    id={'password'}
                    formdata={formdata.password}
                    change={(element) => updateForm(element)}
                />
            </form>
            <div className='forgetButton'>
                Forget Password?
            </div>
            <div
                className='submitButton'
                onClick={(event) => submitForm(event)}>
                Login
            </div>
            <div className='urlButton'>
                <p>You have not account?<span onClick={register}> Sign up</span></p>
            </div>
        </div>
    );
}

export default LoginPage;
