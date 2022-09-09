import '../../css/employee/chargeWallte.css';
import { useState } from 'react';



const EditEmployee = () => {
    

    
    const handelSubmit = async (e) => {
        e.preventDefault();

        const form = document.getElementById("chargeWallet-form");
        const studentNo = form.idStudent.value;
        const studentName = form.name.value;
        const checkNo = +form.checkNo.value;
        const amount = +form.amount.value;
        const date = form.date.value;
        

        

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
                <section className='buttons'>
                    <button className='btn'>إضافة</button>
                </section>
            </form>
        </div>
    );
}
}

export default EditEmployee;