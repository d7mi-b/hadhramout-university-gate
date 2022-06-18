import '../../css/employee/chargeWallte.css'


const ChargeWallte = () => {
    
    const addToWallet= async (req,res) => {
        const form = document.getElementById("chargeWallet-form");
        const studentNo = form.idStudent.value;
        const studentName = form.name.value;
        const checkNo = form.checkNo.value;
        const date = form.date.value;

        try{
            const res = await fetch('/charge/add-wallet', {
                method: 'POST',
                body: JSON.stringify({ studentNo, studentName, checkNo, date}),
                headers: {'Content-Type': 'application/json'}
            });
            const data = await res.json();
                console.log(data)
               
                if(data.errors) {
    
                }
               if(data){
               
               }
        }
        catch(err){
            console.log(err);
        }
        window.location.replace('/charge-wallte')
    }
    

    return (
        <div className="container-form">
            <header>
                <h2>شحن محفظة طالب</h2>
            </header>
            <form action="#" method="POST" className="charge-form form" id='chargeWallet-form'>
                <label for="idStudent">رقم الطالب</label>
                <input name="idStudent" type='number' required />
                <label for="name">إسم الطالب</label>
                <input name="name" type='text' required />
                <label for="checkNo">رقم السند</label>
                <input name="checkNo" type='number' required />
                <label for="amount">المبلغ</label>
                <input name="amount" type="number" required />
                <label for="date">التاريخ</label>
                <input name="date" type='date' required />
                <button className='btn' onClick={addToWallet}>شحن</button>
            </form>
        </div>
    );
}

export default ChargeWallte;