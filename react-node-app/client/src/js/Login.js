import '../css/login.css';
import landding from '../images/operating_system.svg';
import logo from '../images/HUGLogo.png';
import had from '../images/Hadhrmout.jpg';
import signIn from '../images/sign_in.svg';
import { Link } from 'react-router-dom';
import React from 'react';
import { useEffect, useState } from 'react'
import { useStudentLogin } from './DataProvider'; 

const Login = () => {
    const {studentLogin, setStudentLogin} = useStudentLogin();

    // HANDEL CONTENT
    const handelContent = () => {
        
        let loginData = document.querySelector('.login-data');
        let btnLogin = document.getElementById('btn-login');
        let btnCancel = document.querySelector('.cancel');

        btnLogin.addEventListener('click', () => {
            loginData.style.cssText = "display: flex";
            console.log("click")
            
        })

        btnCancel.addEventListener('click', () => {
            loginData.style.cssText = "display: none";
        })
    }

    const logInData = async () => {

        const form = document.getElementById('login_form'); 
        const text = form.username.value;
        const password = form.password.value;

        try{
            const res = await fetch('/', {
                method: 'POST',
                body: JSON.stringify({username: text, password}),
                headers: {'Content-Type': 'application/json'}
            });
            const data = await res.json();
            console.log(data)
            console.log(data.student)
            if(data.errors) {

            }
            if(data.student) {
                setStudentLogin(data)
                console.log(studentLogin);
                window.location.replace('/home')
            }
            else {
               /* const res = await fetch('/', {
                    method: 'POST',
                    body: JSON.stringify({username: text, password}),
                    headers: {'Content-Type': 'application/json'}
                });*/
                //const data = await res.json();
                console.log(data)
                if(data.employee) {
                    setStudentLogin(data.employee)
                    window.location.replace('/employee')
                }
            }
        }
        catch(err) {
            console.log(err);
        }

    }

    React.useEffect(() => {
        handelContent();
        logInData();
    }, [])

    return (
        <div className="login">

            <nav className='navbar-login'>
                <div className='logo'>
                    <img src={logo} alt='HUG' />
                    <img src={had} alt='HUG' />
                </div>
            </nav>

            <div className="container">

                <header className="header">
                    <h2>مرحبًا بكم في بوابة جامعة حضرموت</h2>
                    <h3>الوجهة الأولى لخدمات الطالب</h3>
                    <button className="btn" id='btn-login'>تسجيل الدخول</button>
                </header>
                <div className="image">
                    <img src={landding} alt="HUG" />
                </div>

                {/* LOGIN FORM */}
                <div className='login-data background-section'>
                    <form action='#' method='POST' className='form' id='login_form'>
                        {/* CANCEL MARK */}
                        <svg className='cancel' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/></svg>
                        <img src={signIn} alt='sign in' />
                        <input type='text' className='input' name='username' placeholder='رقم القيد' />
                        <input type='password' className='input' name='password' placeholder='كلمة المرور' />
                        <Link to='#' className='btn' onClick={logInData}>تسجيل الدخول</Link>
                        <Link className='link' to='#'>نسيت كلمة المرور</Link>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default Login;