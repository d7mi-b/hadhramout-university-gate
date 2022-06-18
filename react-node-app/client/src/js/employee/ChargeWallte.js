import '../../css/employee/chargeWallte.css'

const ChargeWallte = () => {
    return (
        <div className="container-form">
            <header>
                <h2>شحن محفظة طالب</h2>
            </header>
            <form action="#" method="POST" className="charge-form form">
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
                <button className='btn'>شحن</button>
            </form>
        </div>
    );
}

export default ChargeWallte;