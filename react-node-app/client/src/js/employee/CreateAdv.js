import '../../css/employee/createAdv.css'
const CreateAdv = () => {

    const addAdv = async () => {

        const form = document.getElementById("adv-form");
        const title = form.title.value;
        const date = form.date.value;
        
        const res= await fetch(`/ads/create-ads`,{
            method: 'POST',
            body: JSON.stringify({ title, date}),
            headers: {'Content-Type': 'application/json'} 
        })
        .then(() => window.location.replace('/advertisements'))
        .catch(err => console.log(err))
        
    }


    return (
        <div className="container container-page ">
            <header className="header">
                <h2>إعلان جديد</h2>
            </header>
            <section className='ads-data create-adv'>
                <form action="#" method="POST" id="adv-form" >
                    <label htmlFor='title'>الإعلان</label>
                    <input name="title" type='text' id="title-new" />
                    <label htmlFor='date'>التاريخ</label>
                    <input name="date" type='date' id="date-new" />
                </form>
                <button className='btn' onClick={addAdv} >إنشاء</button>
            </section>
        </div>
    );
}

export default CreateAdv;