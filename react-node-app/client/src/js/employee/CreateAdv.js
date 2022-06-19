import React from 'react';



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
        .then(res => window.location.replace('/advertisements'))
        .then(data => window.location.replace('/advertisements') )
        .catch(err => console.log(err))
        
    }

  
    return (
        <div className="create-new create-adv">
            <header className="header">
                <h2>إعلان جديد</h2>
            </header>
            <form action="#" method="POST" id="adv-form" >
                <label htmlFor='title'>الإعلان</label>
                <input name="title" type='text' id="title-new" />
                <label htmlFor='date'>التاريخ</label>
                <input name="date" type='date' id="date-new" />
                <button className='btn' onClick={addAdv} >إنشاء</button>
            </form>
        </div>
    );
}

export default CreateAdv;