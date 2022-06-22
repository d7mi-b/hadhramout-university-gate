import { useState } from 'react';

const withdrawWallet = async (data) => {
    return fetch('/charge/whitdrawWallet',{
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

const Withdraw = () => {
    const [data] = useState({
        studentNo: 0,
        studentName: '',
        checkNo: 0,
        amount: 0,
        type: 'سحب',
        date: ''
    });

    
    const handelSubmit = async (e) => {
        e.preventDefault();

        const form = document.getElementById("withdraw-wallet-form");
        data.studentNo = +form.idStudent.value;
        data.studentName = form.name.value;
        data.amount = +form.amount.value;
        data.date = form.date.value;

        const withdraw = await withdrawWallet(data);

    }

    return (
        <div className="container-form">
            <header className='header'>
                <h2>السحب من محفظة طالب</h2>
            </header>
            <form onSubmit={handelSubmit} className='withdraw-form form' id="withdraw-wallet-form">
                <label htmlFor='idStudent'>رقم الطالب</label>
                <input name='idStudent' type='number' required />
                <label htmlFor='name'>إسم الطالب</label>
                <input name='name' type='text' required />
                <label htmlFor="amount">المبلغ المسحوب</label>
                <input name='amount' type='number' required />
                <label htmlFor='date'>التاريخ</label>
                <input name='date' type='date' required />
                <section className='buttons'>
                    <button className='btn'>سحب</button>
                </section>
            </form>
        </div>
    );
}

export default Withdraw;