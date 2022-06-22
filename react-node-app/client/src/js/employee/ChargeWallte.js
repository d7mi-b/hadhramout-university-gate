import '../../css/employee/chargeWallte.css';
import { useState } from 'react';

const chargeWallet = async (data) => {
    return fetch('/charge/update-wallet',{
                method: 'PATCH',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username: data.studentNo, amount: data.amount}) 
                })
                .then((res) => {
                    if(res.status === 200) {
                        fetch('/charge/add-wallet', {
                            method: 'POST',
                            body: JSON.stringify(data),
                            headers: {'Content-Type': 'application/json'}
                        })
                        .then(() => window.location.reload())
                        .catch(err => console.log(err));
                        
                    }
                })
                .catch(err => console.log(err))
}

const ChargeWallte = () => {
    const [data] = useState({
        studentNo: 0,
        studentName: '',
        checkNo: 0,
        amount: 0,
        type: 'إيداع',
        date: ''
    });

    
    const handelSubmit = async (e) => {
        e.preventDefault();

        const form = document.getElementById("chargeWallet-form");
        data.studentNo = +form.idStudent.value;
        data.studentName = form.name.value;
        data.checkNo = +form.checkNo.value;
        data.amount = +form.amount.value;
        data.date = form.date.value;

        const charge = await chargeWallet(data);

        }

    return (
        <div className="container-form">
            <header>
                <h2>شحن محفظة طالب</h2>
            </header>
            <form onSubmit={handelSubmit} className="charge-form form" id='chargeWallet-form'>
                <label htmlFor="idStudent">رقم الطالب</label>
                <input name="idStudent" type='number' required />
                <label htmlFor="name">إسم الطالب</label>
                <input name="name" type='text' required />
                <label htmlFor="checkNo">رقم السند</label>
                <input name="checkNo" type='number' required />
                <label htmlFor="amount">المبلغ</label>
                <input name="amount" type="number" required />
                <label htmlFor="date">التاريخ</label>
                <input name="date" type='date' required />
                <section className='buttons'>
                    <button className='btn'>شحن</button>
                </section>
            </form>
        </div>
    );
}

export default ChargeWallte;