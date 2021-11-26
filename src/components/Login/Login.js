import React,{useState,useEffect, useReducer} from 'react';
import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import classes from './Login.module.css';

const emailReducer = (prevState, action) => {
    if(action.type === 'USER_INPUT') {
        return {
            value: action.value,
            isValid: action.value.includes('@'),
        }
    }
    if(action.type === 'INPUT_BLUR') {
        return {
            value: prevState.value,
            isValid: prevState.value.includes('@'),
        }
    }
    return {
        value: '',
        isValid: false
    }
}

const passwordReducer = (prevState, action) => {
    if(action.type === 'USER_INPUT') {
        return {
            value: action.value,
            isValid: action.value.trim().length > 6,
        }
    }
    if(action.type === 'INPUT_BLUR') {
        return {
            value: prevState.value,
            isValid: prevState.value.trim().length > 6,
        }
    }
    return {
        value: '',
        isValid: false
    }
}

const Login = (props) => {
    // const [enteredEmail, setEnteredEmail] = useState(''); // поле ввода емайл
    // const [emailIsValid, setEmailIsValid] = useState(false); // проверка поля true/false
    // const [enteredPassword, setEnteredPassword] = useState(''); // поле ввода пароль
    // const [passwordIsValid, setPasswordIsValid] = useState(false); // проверка поля true/false
    const [formIsValid, setFormIsValid] = useState(false); // проверка полей true/false емайл и пароль

    const [emailState, dispatchEmail] = useReducer(emailReducer, {
        value: '',
        isValid: false,
    })

    const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
        value: '',
        isValid: false,
    })

    const {isValid: emailIsValid} = emailState;
    const {isValid: passwordIsValid} = passwordState;

    useEffect(() => {
        const timer = setTimeout(() => {
            console.log('effect works every time when the state updated')
            setFormIsValid (
                emailState.isValid && passwordState.isValid
            );
        }, 2000);

        return () => {
            console.log('clean up the timer');
            clearTimeout(timer);
        }
    }, [emailIsValid,passwordIsValid])

    const emailChangeHandler = (event) => {
        // setEnteredEmail(e.target.value);
        dispatchEmail({type: "USER_INPUT", value:event.target.value})

        // setFormIsValid (
        //     event.target.value.includes('@') && passwordState.value.trim().length > 6
        // )
    }

    const passwordChangeHandler = (event) => {
        // setEnteredPassword(e.target.value);
        dispatchPassword({type: "USER_INPUT", value:event.target.value})

        // setFormIsValid (
        //     event.target.value.trim().length > 6 && emailState.value.includes('@')
        // )
    }

    const validateEmailHandler = () => {
        // setEmailIsValid(enteredEmail.includes('@'))
        dispatchEmail({type: "INPUT_BLUR"})
    }

    const validatePasswordHandler = () => {
        // setPasswordIsValid(enteredPassword.trim().length > 6)
        dispatchPassword({type: "INPUT_BLUR"})
    }

    const submitHandler = (e) => {
        e.preventDefault();
        props.onLogin(emailState.value,passwordState.value)
    }

    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <div
                    className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ''
                    }`}
                >
                <label htmlFor="email">E-Mail</label>
                <input 
                    type='email'
                    id='email'
                    onChange={emailChangeHandler}
                    value={emailState.value}
                    onBlur={validateEmailHandler}
                />
                </div>
                <div
                    className={`${classes.control} ${passwordState.isValid === false ? classes.invalid : ''
                    }`}
                >
                    <label htmlFor="password">Password</label>
                    <input 
                        type='password'
                        id='password'
                        onChange={passwordChangeHandler}
                        value={passwordState.value}
                        onBlur={validatePasswordHandler}
                    />
                </div>
                <div className={classes.actions}>
                    <Button type='submit' className={classes.btn} disabled={!formIsValid}>
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    )
}
export default Login;