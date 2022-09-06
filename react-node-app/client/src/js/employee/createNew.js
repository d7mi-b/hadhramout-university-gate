import '../../css/employee/createNew.css'
import React from 'react';

const submitNews = async (data) => {
    return fetch(`/news/add-new`,{
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'} 
        })
        .then(res =>  window.location.replace('/newsEmp'))
        .catch(err => console.log(err))
}

const CreateNew = () => {

    const handelSubmit = async (e) => {
    
        e.preventDefault();

        const form = document.getElementById('news_form'); 
        const title = form.title.value;
        const body = form.body.value;
        const image = form.image.value;
        const date = form.date.value;
        const employee = JSON.parse(window.sessionStorage.getItem('user')).username;

        const res = await submitNews({ title, body, image, date, employee});
    }


    return (
        <div className="create-new">
            <header className="header">
                <h2>خبر جديد</h2>
            </header>
            <form onSubmit={handelSubmit} id="news_form" >
                <label for='title'>العنوان</label>
                <input name="title" type='text' id="title-new" required />
                <label for='body'>الخبر</label>
                <textarea name="body" id="body-new" required ></textarea>
                <label for='image'>الصورة</label>
                <input type='file' name="image" id="image-new"/>
                <label for='date'>التاريخ</label>
                <input name="date" type='date' id="date-new" required />
                <button className='btn'>إنشاء</button>
            </form>
        </div>
    );
}

export default CreateNew;