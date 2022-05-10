import React, { useState, useEffect } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  //debouncing, debounce

  useEffect(() => {   //этот хук здесь помогает нам управлять таймером

    const timer = setTimeout(() => {
      setFormIsValid(enteredEmail.includes('@') &&   //тут идет проверка формы на символы по определенному интервалу времени
      enteredPassword.trim().length > 6);
    }, 500)

    //clean up function - возвращает useEffect
    return () => {
      clearTimeout(timer)
    }
    
  }, [enteredEmail, enteredPassword])   //внутри массива мы дали наши состояния в качестве зависимости, 
    //если изменятся эти зависимости, тогда сработает функция внутри useEffect

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value)   //тут берется значение email инпута
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value)
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${    
            emailIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}     //событие onBlur сработает тогда, когда после фокуса на инпут мы ничего не написав 
            //мы уберем фокус от инпута, потому что сюда мы дали функцию которое также делает проверку на наличие символов
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
