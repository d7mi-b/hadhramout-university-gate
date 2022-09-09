import { useEffect, useState } from 'react';
import '../../css/student/editInfoStudent.css'
import { useUser } from '../DataProvider';

const EditInfoStudent = () => {
    const student = useUser();
    const [checkPass, setCheckPass] = useState(null);
    const [encryptPass, setEncruptPass] = useState(null);

    const checkOldPassword = (e) => {
        setEncruptPass(e.target.value)
    }

    const encryptOldPassword = () => {
        fetch('/checkOldPassword?' + new URLSearchParams({
            username: student.username,
            password: encryptPass
        }))
        .then(result => setCheckPass(result.status))
        .catch(err => console.log(err))
    }

    const checkPassword = () => {
        const newPassword = document.getElementById('new-password');
        const reNewPassword = document.getElementById('re-new-password');
        const check = document.getElementById('check-password');

        if (newPassword.value === reNewPassword.value) {
            check.style.cssText = 'display: flex';
            return true;
        } else if (newPassword.value === '' && reNewPassword.value === '') {
            check.style.cssText = 'display: none';
            return false;
        }
        else {
            check.style.cssText = 'display: none';
            return false;
        }
    }

    const changePassword = (e) => {
        e.preventDefault();

        const newPassword = document.getElementById('re-new-password');

        if (checkPassword() && checkPass === 200) {
            fetch('/changePassword', {
                method: 'PATCH',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    username: student.username,
                    password: newPassword.value
                })
            })
            .then(result => console.log('done'))
            .catch(err => console.log(err))
        }
    }

    const sendEmail = (e) => {
        e.preventDefault();

        if (student) {
            fetch('/sendForgetPass', {
                method: 'POST',
                body: JSON.stringify({
                    username: student.username,
                    email: student.email
                }),
                headers: {'Content-Type': 'application/json'} 
            })
            .then(result => console.log(result))
            .catch(err => console.log(err))
        }
    } 

    // HANDEL CONTENT
    const handelContent = () => {
        const backgroundSection = document.querySelector('.background-section');
        const btnCancelDeg = document.querySelector('#cancel');
        const link = document.querySelector('.link');

        link.addEventListener('click', () => {
            backgroundSection.style.cssText = "display: flex";
        })

        btnCancelDeg.addEventListener('click', () => {
            backgroundSection.style.cssText = "display: none";
        })
    }

    useEffect(() => {
        handelContent()
    }, [])

    return (
        <div className="container-page container">
            <header className='header'>
                <h2>تعديل المعلومات</h2>
            </header>

            <section className='edit-info-student'>
                <form className='edit-password' onSubmit={changePassword}>
                    <label htmlFor='password'>تغير كلمة المرور</label>
                    <section className='input'>
                        <input onChange={checkOldPassword} onBlur={encryptOldPassword} type='password' name='password' className='old' required placeholder='كلمة المرور الحالية' />
                    </section>
                    <section className='input'>
                        <p onClick={sendEmail} className='link'>نسيت كلمة المرور</p>
                    </section>
                    <section className='input'>
                        <input type='password' id='new-password' name='password' className='new' required placeholder='كلمة المرور الجديدة' />
                    </section>
                    <section className='input'>
                        <input onChange={checkPassword} type='password' id='re-new-password' name='password' className='new' required placeholder='إعادة كلمة المرور الجديدة' />
                    </section>
                    {
                        checkPassword && 
                        <div id='check-password' className="icon-check check-password">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z"/></svg>
                            <p>كلمات المرور متطابقة</p>
                        </div>
                    }
                    <button className='btn'>تعديل</button>
                </form>
            </section>

            <div className='background-section'>
                <section className='pay-section'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z"/></svg>
                    <p>تم إرسال رسالة إالى بريدك الإلكتروني</p>
                    <div className='buttons'>
                        <button className='btn' id='cancel'>إغلاق</button>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default EditInfoStudent;