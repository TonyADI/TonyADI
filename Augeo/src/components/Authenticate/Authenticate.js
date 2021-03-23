import React, { useState, useEffect } from 'react';
import { createData }  from '../../utilities/projectAPI';
import './Authenticate.css';

export const Authenticate = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [checked, setChecked] = useState(false);
  const [validData, setValidData] = useState(false);
  const [passwordType, setPasswordType] = useState('password');
  const [iconType, setIconType] = useState('fa fa-eye-slash');
  const [errorMessage, setErrorMessage] = useState('');
  
  const canSubmit = () => {
    const validEmail = email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
    const validPassword = password.length >= 6;
    const validFirstName = firstName.match(/^(?:[A-Za-z]+|)$/);
    const validLastName = lastName.match(/^(?:[A-Za-z]+|)$/);

    if(!errorMessage && checked && validEmail && validPassword && 
      ((props.type === 'Login') || (validFirstName && validLastName ))){
      setValidData(true);
    }
    else{
      setValidData(false);
    }
  }

  const togglePassword = () => {
    const newPasswordType = (passwordType === 'password') ? 'text' : 'password';
    const newIconType = (iconType === 'fa fa-eye-slash') ? 'fa fa-eye' : 'fa fa-eye-slash';
    setPasswordType(newPasswordType);
    setIconType(newIconType);
  }

  const handleChange = e => {
    switch(e.target.name){
      case 'email':
        setEmail(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      case 'first-name':
        setFirstName(e.target.value);
        break;
      case 'last-name':
        setLastName(e.target.value);
        break;
      default:
        console.log('Error!')
    }
    canSubmit();
  }
  
  const handleKeyPress = e => {
    if(e.which === 13 && validData){
        submitForm(e);
    }
  }

  const handleBlur = e => {
    switch(e.target.name){
      case 'email':
        if(email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
          setErrorMessage('')
        }
        else{
          setErrorMessage('Enter a valid Email Address');
        }
        break;
      case 'password':
        if(password.length >= 6){
          setErrorMessage('')
        }
        else{
          setErrorMessage('Enter a valid Password');
        }
        break;
      case 'first-name':
        if(firstName.match(/^(?:[A-Za-z]+|)$/)){
          setErrorMessage('');
        }
        else{
          setErrorMessage('First Name can only be letters.')
        }
        break;
      case 'last-name':
        if(lastName.match(/^(?:[A-Za-z]+|)$/)){
          setErrorMessage('');
        }
        else{
          setErrorMessage('Last Name can only be letters.')
        }
        break;
      default:
        setErrorMessage('');
    }
  }

  const submitForm = e => {
    const data = {email: email, password: password, first_name: firstName, last_name: lastName};
    const url = (props.type === 'Register') ? 'https://localhost:3000/users' : `https://localhost:3000/users/session`;
    createData(url, data).then(value => {
      if(value){
        props.setAccount(email);
        //window.location.replace('/'); UNCOMMENT THIS ???!!!!
      }
      else{
        switch(props.type){
          case 'Register':
            setErrorMessage('The email address already exists!');
            break;
          case 'Login':
            setErrorMessage('Your email address or password was entered incorrectly.');
            break;
          default:
            setErrorMessage('Something went wrong. Try Again.');
        }
      }
      });
    e.preventDefault();
  }
  
  useEffect(()=>{
    canSubmit();
  }, [checked, errorMessage]);


  useEffect(() => {
    setFirstName('');
    setLastName('');
    setErrorMessage('');
    setChecked(false);
  }, [props.type])

  return (
    <div>
      <div>
        <div><h1>{props.type}</h1></div>
        <div id="authenticate-container">
          <div id="authenticate-form">
          <form onSubmit={submitForm}>
              <div><span className="error-message">{errorMessage}</span></div>
              <div className="input-container">
                <input className="input-field" type="email" name="email" placeholder="Email Address" 
                value={email} onChange={handleChange} onKeyPress={handleKeyPress} onBlur={handleBlur}/>
              </div>
              <div className="input-container">
                <input className="input-field" type={passwordType} name="password" placeholder="Password (6 or more characters)" 
                value={password} onChange={handleChange}onKeyPress={handleKeyPress} onBlur={handleBlur}/>
                <i className={`${iconType} password-toggle cursor-pointer`} onClick={togglePassword}></i>
              </div>
              {props.type === 'Register' && <div>
                    <div className="input-container">
                        <input className="input-field" type="text" name="first-name" placeholder="First Name" 
                        value={firstName} onChange={handleChange} onKeyPress={handleKeyPress} onBlur={handleBlur}/>
                    </div>
                    <div className="input-container">
                        <input className="input-field" type="text" name="last-name" placeholder="Last Name" 
                        value={lastName} onChange={handleChange} onKeyPress={handleKeyPress} onBlur={handleBlur}/>
                    </div>
              </div> 
              }
              <div className="terms-container cursor-pointer" onClick={()=>
                  {setChecked(!checked)}}>
                <input type="checkbox" name="terms" id="termsCheckbox" onChange={() => setChecked(!checked)} checked={checked}/>
                <span id="terms"> By signing {props.type === 'Register' ? 'up' : 'in'}, you agree to the Terms of Service and 
                  Privacy Policy</span>
              </div>
            <input style={{cursor: validData ? 'pointer' : 'default', 
            backgroundColor: validData ? '#000' : 'grey'}} type="submit" 
            value={props.type} className="button" disabled={!validData}/>
          </form>
          </div>
        </div>
     </div>
    </div>
  );
}

export default Authenticate;
