import '../../css/employee/chargeWallte.css'


const ChargeWallte = () => {
   
    
    const addToWallet= () => {

        const form = document.getElementById("chargeWallet-form");
        const studentNo = form.idStudent.value;
        const studentName = form.name.value;
        const checkNo = form.checkNo.value;
        const amount = form.amount.value;
        const date = form.date.value;

        fetch('/charge/add-wallet', {
                method: 'POST',
                body: JSON.stringify({ studentNo, studentName, checkNo, amount, date}),
                headers: {'Content-Type': 'application/json'}
            })
            .then(() => console.log('Add') )
            .catch(err => console.log(err));
            
            
        fetch('/charge/update-wallet',{
                method: 'PATCH',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username: Number(studentNo) ,amount: Number(amount)}) 
                })
                .then((res) => res.window.location.replace('/charge-wallte'))
                .catch(err => console.log(err))

        }
        
    
    

    return (
        <div className="container-form">
            <header>
                <h2>شحن محفظة طالب</h2>
            </header>
            <form action="#" method="POST" className="charge-form form" id='chargeWallet-form'>
                <label for="idStudent">رقم الطالب</label>
                <input name="idStudent" type='number' required />
                <label htmlFor="name">إسم الطالب</label>
                <input name="name" type='text' required />
                <label htmlFor="checkNo">رقم السند</label>
                <input name="checkNo" type='number' required />
                <label htmlFor="amount">المبلغ</label>
                <input name="amount" type="number" required />
                <label htmlFor="date">التاريخ</label>
                <input name="date" type='date' required />
                <button className='btn' onClick={addToWallet}>شحن</button>
            </form>
        </div>
    );
}

export default ChargeWallte;