import React from 'react';

const CreateAdv = () => {

    const addAdv= async (req,res) => {
        const form = document.getElementById("adv-form");
        const title = form.title.value;
        const date = form.date.value;

        try{
            const res = await fetch('/advert/cre', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ title, date})
            });
            const data = await res.json();
                console.log(data);

                if(data.errors) {
                    console.log(data.errors)
                }
                if(data){
                
                }
        }
        catch(err){
            console.log(err);
        }
        window.location.replace('/ads')

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
                <button className='btn' onClick={addAdv}>إنشاء</button>
            </form>
        </div>
    );
}

export default CreateAdv;