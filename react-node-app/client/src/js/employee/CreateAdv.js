import '../../css/employee/createAdv.css'

const adsCreate = async (data) => {
    return fetch(`/ads/create-ads`,{
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'} 
        })
        .then(() => window.location.replace('/advertisements'))
        .catch(err => console.log(err))
}

const CreateAdv = () => {
    
    const handelSubmit = async (e) => {

        e.preventDefault();

        const form = document.getElementById("adv-form");
        const title = form.title.value;
        const date = form.date.value;
        const employee = JSON.parse(window.sessionStorage.getItem('user')).username;
        

        const data = await adsCreate({ title, date, employee});
    }


    return (
        <div className="container container-page ">
            <header className="header">
                <h2>إعلان جديد</h2>
            </header>
            <section className='ads-data create-adv'>
                <form onSubmit={handelSubmit} id="adv-form" >
                    <label htmlFor='title'>الإعلان</label>
                    <input name="title" type='text' id="title-new" required />
                    <label htmlFor='date'>التاريخ</label>
                    <input name="date" type='date' id="date-new" required />
                    <button className='btn'>إنشاء</button>
                </form>
            </section>
        </div>
    );
}

export default CreateAdv;