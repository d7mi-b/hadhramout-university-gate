import React from 'react';



const CreateAdv = () => {

    const addAdv= async (req,res) => {
        const form = document.getElementById("adv-form");
        const title = form.title.value;
        const date = form.date.value;

        try{
            const res = await fetch('/ads/create-ads', {
                method: 'POST',
                body: JSON.stringify({ title, date}),
                headers: {'Content-Type': 'application/json'}
            });
            window.location.replace('/advertisements')
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
       

    }

    return (
        <div className="create-new create-adv">
            <header className="header">
                <h2>إعلان جديد</h2>
            </header>
            <form action="#" method="POST" id="adv-form" >
                <label for='title'>الإعلان</label>
                <input name="title" type='text' id="title-new" />
                <label for='date'>التاريخ</label>
                <input name="date" type='date' id="date-new" />
                <button className='btn' onClick={addAdv}>إنشاء</button>
            </form>
        </div>
    );
}

export default CreateAdv;