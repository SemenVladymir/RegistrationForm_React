import React from "react";
import './Registration.css';
import { useState } from "react";
import axios from "axios";


function Registration() {
  const [userLogin, setUserLogin] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const [userLoginValid, setUserLoginValid] = useState(false);
  const [userPasswordValid, setUserPasswordValid] = useState(false);
  const [userEmailValid, setUserEmailValid] = useState(false);

  const [userLoginError, setUserLoginError] = useState('You need input login');
  const [userPasswordError, setUserPasswordError] = useState('You need input password');
  const [userEmailError, setUserEmailError] = useState('You need input email');

  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();

  
  
  
  const saveFile = (e) => {
    var myfile = e.target;
    let image = document.getElementById("avatar");
    image.src = URL.createObjectURL(myfile.files[0]);
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    
    };

    const verification = async (e) => {
      console.log(file);
      const formData = new FormData();
      formData.append("Login", userLogin);
      formData.append("Password", userPassword);
      formData.append("Email", userEmail);
      formData.append("AvatarFile", file);
      
      try {
        const res = await axios.post("http://vladimyrsemen-001-site1.gtempurl.com/api/MyRegistration/Verification", formData);
        console.log(res);
      }
      catch (ex) {
        console.log(ex);
      }
    };


  const userLoginHandler = (e) => {
    setUserLogin(e.target.value);
    const log = /^[a-zA-z]{1}[a-zA-Z1-9]{3,20}$/;
    if (!log.test(e.target.value))
      setUserLoginError("Incorrect login");
    else
      setUserLoginError("");
  };

  const userPasswordHandler = (e) => {
    setUserPassword(e.target.value);
    const pass = /^(?=(?:[^A-Z]*[A-Z]){2,4}[^A-Z]*$)(?=(?:[^a-z]*[a-z]){2,4}[^a-z]*$)(?=(?:\D*\d){2,4}\D*$)\S{8,30}$/;
    if (!pass.test(e.target.value))
      setUserPasswordError("Incorrect password");
    else
      setUserPasswordError("");
  };

  const userEmailHandler = (e) => {
    setUserEmail(e.target.value);
    const mail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
    if (!mail.test(String(e.target.value).toLocaleLowerCase()))
      setUserEmailError("Incorrect email");
    else
      setUserEmailError("");
  };

  const blurHandler = (e) => {
    switch (e.target.type) {
      case 'login': setUserLoginValid(true);
        break;
      case 'password': setUserPasswordValid(true);
        break;
      case 'email': setUserEmailValid(true);
        break;
      default:
    }
  };

  const handlerSubmit = (e) => {
    e.preventDefault();

    alert("Вы прошли верификацию данных");
  };

return (
  <>
    <h2><strong>Форма регистрации</strong></h2>
    <div className="userPhoto">
      <p><strong>Введите свои регистрационные данные</strong></p>
      <div className="userData"></div>
      <p><strong>Введите данные для загрузки фотографии</strong></p>
      <div className="photoData"></div>
      <form onSubmit={handlerSubmit}>
        {(userLoginValid && userLoginError) && <div id="logErr" style={{ color: 'red' }}>{userLoginError}</div>}
        <input type="text" id="log" onChange={e => userLoginHandler(e)} value={userLogin} onBlur={e => blurHandler(e)} name='login' placeholder="Input login" />
        {(userPasswordValid && userPasswordError) && <div id="passErr" style={{ color: 'red' }}>{userPasswordError}</div>}
        <input type="password" id="pass" value={userPassword} onChange={e => userPasswordHandler(e)} onBlur={e => blurHandler(e)} name='password' placeholder="Input password" />
        {(userEmailValid && userEmailError) && <div id="mailErr" style={{ color: 'red' }}>{ userEmailError}</div>}
        <input type="email" id="email" value={userEmail} onChange={e => userEmailHandler(e)} onBlur={e => blurHandler(e)} name='email' placeholder="Input your email" />
        <input type="text" id="title" placeholder="Input name for your avatar" />
        <div id="textFile">Choose an image for your avatar (PNG, JPG, GIF)</div>
        <input type="file" id="imageFile" onChange={saveFile} placeholder="Insert folder with photo" accept=".jpg, .jpeg, .png, .gif" multiple/>
        <img id="avatar" alt="avatar"/>
        <input type="submit" id="submit" value="Registration" onClick={verification} />
      </form> 
    </div>
  </>
  );
}

export default Registration;