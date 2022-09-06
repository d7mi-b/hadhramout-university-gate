import '../css/login.css';
import landding from '../images/operating_system.svg';
import logo from '../images/HUGLogo.png';
import had from '../images/Hadhrmout.jpg';
import signIn from '../images/sign_in.svg';
import { Link } from 'react-router-dom';
import React, {useState} from 'react';

const loginStudent = async (data) => {
    return fetch('/studentLogin', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        }).then(data => data.json());
}

const loginEmployee = async (data) => {
    return fetch('/employeeLogin', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        }).then(data => data.json());
}

const loginAdmin = async (data) => {
    return fetch('/adminLogin', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        }).then(data => data.json());
}

const Login = () => {
    const [ error, setError ] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    // HANDEL CONTENT
    const handelContent = () => {
        
        let loginData = document.querySelector('.login-data');
        let btnLogin = document.getElementById('btn-login');
        let btnCancel = document.querySelector('.cancel');

        btnLogin.addEventListener('click', () => {
            loginData.style.cssText = "display: flex";
        })

        btnCancel.addEventListener('click', () => {
            loginData.style.cssText = "display: none";
        })
    }

    const handelSubmit = async e => {
        const form = document.getElementById('login_form'); 
        const text = form.username.value;
        const password = form.password.value;

        e.preventDefault();
        if (text.length === 11) {
            const data = await loginStudent({username: text, password});
            if (data === 'incorrect user') {
                setErrMsg('اسم المستخدم غير صحيح')
                setError(true)
            }
            else if (data === 'incorrect password') {
                setErrMsg('كلمة المرور غير صحيحة')
                setError(true)
            }
            else {
                setError(false)
                window.sessionStorage.setItem("user", JSON.stringify(data));
                window.location.replace('/home')
            }
        }
        else if (text.length === 5) {
            const data = await loginEmployee({username: text, password});
            if (data === 'incorrect user') {
                setErrMsg('اسم المستخدم غير صحيح')
                setError(true)
            }
            else if (data === 'incorrect password') {
                setErrMsg('كلمة المرور غير صحيحة')
                setError(true)
            }
            else {
                setError(false)
                console.log(data)
                window.sessionStorage.setItem("user", JSON.stringify(data));
                window.location.replace('/employee')
            }
        }
        else if (text.length==9){
            const data = await loginAdmin({username: text, password});
            if (data === 'incorrect user') {
                setErrMsg('اسم المستخدم غير صحيح')
                setError(true)
            }
            else if (data === 'incorrect password') {
                setErrMsg('كلمة المرور غير صحيحة')
                setError(true)
            }
            else {
                setError(false)
                console.log( JSON.stringify(data))
                window.sessionStorage.setItem("user", JSON.stringify(data));
                window.location.replace('/admin')
            }
        }
    }

    const showPassword = (e) => {
        const input = e.target.previousElementSibling.previousElementSibling
        if (input.type === 'password') {
            input.type = 'text'
            e.target.innerHTML = '<svg onClick={showPassword} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M150.7 92.77C195 58.27 251.8 32 320 32C400.8 32 465.5 68.84 512.6 112.6C559.4 156 590.7 207.1 605.5 243.7C608.8 251.6 608.8 260.4 605.5 268.3C592.1 300.6 565.2 346.1 525.6 386.7L630.8 469.1C641.2 477.3 643.1 492.4 634.9 502.8C626.7 513.2 611.6 515.1 601.2 506.9L9.196 42.89C-1.236 34.71-3.065 19.63 5.112 9.196C13.29-1.236 28.37-3.065 38.81 5.112L150.7 92.77zM223.1 149.5L313.4 220.3C317.6 211.8 320 202.2 320 191.1C320 180.5 316.1 169.7 311.6 160.4C314.4 160.1 317.2 159.1 320 159.1C373 159.1 416 202.1 416 255.1C416 269.7 413.1 282.7 407.1 294.5L446.6 324.7C457.7 304.3 464 280.9 464 255.1C464 176.5 399.5 111.1 320 111.1C282.7 111.1 248.6 126.2 223.1 149.5zM320 480C239.2 480 174.5 443.2 127.4 399.4C80.62 355.1 49.34 304 34.46 268.3C31.18 260.4 31.18 251.6 34.46 243.7C44 220.8 60.29 191.2 83.09 161.5L177.4 235.8C176.5 242.4 176 249.1 176 255.1C176 335.5 240.5 400 320 400C338.7 400 356.6 396.4 373 389.9L446.2 447.5C409.9 467.1 367.8 480 320 480H320z"/></svg>'
        }
        else {
            input.type = 'password'
            e.target.innerHTML = '<svg onClick={showPassword} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M279.6 160.4C282.4 160.1 285.2 160 288 160C341 160 384 202.1 384 256C384 309 341 352 288 352C234.1 352 192 309 192 256C192 253.2 192.1 250.4 192.4 247.6C201.7 252.1 212.5 256 224 256C259.3 256 288 227.3 288 192C288 180.5 284.1 169.7 279.6 160.4zM480.6 112.6C527.4 156 558.7 207.1 573.5 243.7C576.8 251.6 576.8 260.4 573.5 268.3C558.7 304 527.4 355.1 480.6 399.4C433.5 443.2 368.8 480 288 480C207.2 480 142.5 443.2 95.42 399.4C48.62 355.1 17.34 304 2.461 268.3C-.8205 260.4-.8205 251.6 2.461 243.7C17.34 207.1 48.62 156 95.42 112.6C142.5 68.84 207.2 32 288 32C368.8 32 433.5 68.84 480.6 112.6V112.6zM288 112C208.5 112 144 176.5 144 256C144 335.5 208.5 400 288 400C367.5 400 432 335.5 432 256C432 176.5 367.5 112 288 112z"/></svg>'
        }
    }

    React.useEffect(() => {
        handelContent();
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
                    <form onSubmit={handelSubmit} className='form' id='login_form'>
                        {/* CANCEL MARK */}
                        <svg className='cancel' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/></svg>
                        <img src={signIn} alt='sign in' />
                        <div className="form__group field">
                            <input required placeholder="رقم المستخدم" name='username' className="form__field" type="input" />
                            <label className="form__label" htmlFor='username'>رقم المستخدم</label>
                        </div>
                        <div className="form__group field">
                            <input required placeholder="كلمة السر" name='password' className="form__field" type="password" />
                            <label className="form__label" htmlFor='password'>كلمة المرور</label>
                            <svg onClick={showPassword} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M279.6 160.4C282.4 160.1 285.2 160 288 160C341 160 384 202.1 384 256C384 309 341 352 288 352C234.1 352 192 309 192 256C192 253.2 192.1 250.4 192.4 247.6C201.7 252.1 212.5 256 224 256C259.3 256 288 227.3 288 192C288 180.5 284.1 169.7 279.6 160.4zM480.6 112.6C527.4 156 558.7 207.1 573.5 243.7C576.8 251.6 576.8 260.4 573.5 268.3C558.7 304 527.4 355.1 480.6 399.4C433.5 443.2 368.8 480 288 480C207.2 480 142.5 443.2 95.42 399.4C48.62 355.1 17.34 304 2.461 268.3C-.8205 260.4-.8205 251.6 2.461 243.7C17.34 207.1 48.62 156 95.42 112.6C142.5 68.84 207.2 32 288 32C368.8 32 433.5 68.84 480.6 112.6V112.6zM288 112C208.5 112 144 176.5 144 256C144 335.5 208.5 400 288 400C367.5 400 432 335.5 432 256C432 176.5 367.5 112 288 112z"/></svg>
                        </div>
                        {
                            error && 
                            <p className='error'>{errMsg}</p>
                        }
                        <button to='#' className='btn'>تسجيل الدخول</button>
                        <Link className='link' to='#'>نسيت كلمة المرور</Link>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default Login;