const Withdraw = () => {
    return (
        <div className="container-form">
            <header className='header'>
                <h2>السحب من محفظة طالب</h2>
            </header>
            <form action='#' method='POST' className='withdraw-form form'>
                <label for='id-student'>رقم الطالب</label>
                <input name='id-student' type='number' required />
                <label for='name'>إسم الطالب</label>
                <input name='name' type='text' required />
                <label for="amount">المبلغ المسحوب</label>
                <input name='amount' type='number' required />
                <label for='reason'>سبب السحب</label>
                <input name='reason' type='text' />
                <label for='date'>التاريخ</label>
                <input name='date' type='date' required />
                <button className='btn'>سحب</button>
            </form>
        </div>
    );
}

export default Withdraw;