import '../../css/employee/chargeWallte.css';
import { useState } from 'react';



const EditEmployee = () => {
    

    
    const handelSubmit =  (e) => {
        

        const form = document.getElementById("addEmployee-form");
        const employeeNo = form.idEmployee.value;
        const employeeName = form.name.value;
        const department = form.department.value;
        const email = form.Email.value;
        const password = form.password.value;
        const verify = form.verify.value;
        console.log(employeeNo)
        
        if(password===verify)
       {
         fetch(`/registerE`,{
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({employeeNo,employeeName,department,email,password})
                })
                .then(res => res.json())
                .catch(err => console.log(err))
            }
            
        
    }

        

    return (
        <div className="container-form">
            <header>
                <h2>إضافة موظف جديد</h2>
            </header>
            <form onSubmit={handelSubmit} className="addEmployee-form form" id='chargeWallet-form'>
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
                <label htmlFor="verify">تأكيد الرقم السري</label>
                <input name="verify" type='password' required />
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