import '../../css/employee/createNew.css'

const CreateNew = () => {
    return (
        <div className="create-new">
            <form action="#" method="POST" >
                <label for='title'>العنوان</label>
                <input name="title" type='text' id="title-new" />
                <label for='body'>الخبر</label>
                <textarea name="body" id="body-new"></textarea>
                <label for='image'>الصورة</label>
                <input type='file' name="image" id="image-new"/>
                <label for='date'>التاريخ</label>
                <input name="date" type='date' id="date-new" />
                <button className='btn'>إنشاء</button>
            </form>
        </div>
    );
}

export default CreateNew;