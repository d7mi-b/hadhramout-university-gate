import '../../css/employee/createNew.css'
import React from 'react';





const CreateNew = () => {

    const addNews = async () => {
    
        
        const form = document.getElementById('news_form'); 
        const title = form.title.value;
        const body = form.body.value;
        const image = form.image.value;
        const date = form.date.value;

        const res = await fetch(`/news/add-new`,{
            method: 'POST',
            body: JSON.stringify({ title, body, image, date}),
            headers: {'Content-Type': 'application/json'} 
        })
        .then(res =>  window.location.replace('/newsEmp'))
        .then(data => window.location.replace('/newsEmp') )
        .catch(err => console.log(err))
        
    }


    return (
        <div className="create-new">
            <header className="header">
                <h2>خبر جديد</h2>
            </header>
            <form action="#" method="POST" id="news_form" >
                <label for='title'>العنوان</label>
                <input name="title" type='text' id="title-new" />
                <label for='body'>الخبر</label>
                <textarea name="body" id="body-new"></textarea>
                <label for='image'>الصورة</label>
                <input type='file' name="image" id="image-new"/>
                <label for='date'>التاريخ</label>
                <input name="date" type='date' id="date-new" />
                <button className='btn' onClick={addNews}>إنشاء</button>
            </form>
        </div>
    );
}

export default CreateNew;