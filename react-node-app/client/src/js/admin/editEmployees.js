import '../../css/employee/chargeWallte.css';
import { useState } from 'react';



const EditEmployee = () => {
    

    
    const handelSubmit =  (e) => {
        e.preventDefault();

        const form = document.getElementById("chargeWallet-form");
        const studentNo = form.idStudent.value;
        const studentName = form.name.value;
        const checkNo = +form.checkNo.value;
        const amount = +form.amount.value;
        const date = form.date.value;
        
    }

        

    return (
        <div className="container-form">
            <header>
                <h2>إضافة موظف جديد</h2>
            </header>
            <form onSubmit={handelSubmit} className="charge-form form" id='chargeWallet-form'>
                <label htmlFor="idEmployee">رقم الموظف</label>
                <input name="idEmployee" type='number' required />
                <label htmlFor="name">إسم الموظف</label>
                <input name="name" type='text' required />
                <label htmlFor="department">القسم</label>
                <input name="department" type='text' required />
                <label htmlFor="Email">الايميل</label>
                <input name="Email" type="email" required />
                <label htmlFor="password">الرقم السري</label>
                <input name="password" type='password' required />
                <label htmlFor="vali">تأكيد الرقم السري</label>
                <input name="date" type='password' required />
                <div className='chechbox'>
                    <div className='entercheckbox'>
                <input type="checkbox" name="news" value="news" className='check' />
                <label for="news">إضافة اخبار</label>
                </div>
                <div className='entercheckbox'>
                <input type="checkbox" name="advertisements" value="advertisements" className='check' />
                <label for="advertisements">إضافة اعلانات</label>
                </div>
                <div className='entercheckbox'>
                <input type="checkbox" name="chargeWallet" value="chargeWallet" className='check' />
                <label for="chargeWallet">شحن محفظة الطالب </label> 
                </div>
                <div className='entercheckbox'>
                <input type="checkbox" name="editSchedule" value="editSchedule" className='check' />
                <label for="editSchedule">اضافة الجداول </label>
                </div>
                <div className='entercheckbox'>
                <input type="checkbox" name="griverence" value="griverence" className='check' />
                <label for="griverence">مراجعة التظلمات </label>
                </div>
                <div className='entercheckbox'>
                <input type="checkbox" name="suggestions" value="suggestions" className='check' />
                <label for="suggestions">مراجعة الشكاوي والاقتراحات </label> 
                </div>               
                </div>
                <section className='buttons'>
                    <button className='btn'>إضافة</button>
                </section>
            </form>
        </div>
    );

}

export default EditEmployee;