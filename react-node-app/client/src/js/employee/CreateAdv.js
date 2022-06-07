const CreateAdv = () => {
    return (
        <div className="create-new create-adv">
            <header className="header">
                <h2>إعلان جديد</h2>
            </header>
            <form action="#" method="POST" >
                <label for='title'>الإعلان</label>
                <input name="title" type='text' id="title-new" />
                <label for='date'>التاريخ</label>
                <input name="date" type='date' id="date-new" />
                <button className='btn'>إنشاء</button>
            </form>
        </div>
    );
}

export default CreateAdv;