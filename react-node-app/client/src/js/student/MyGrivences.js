import { useEffect, useState } from 'react';
import '../../css/employee/grivanceEmp.css'
import { useUser } from '../DataProvider';

const getDate = (e) => {
    const year = new Date(e).getFullYear();
    const month = new Date(e).getMonth();
    const day = new Date(e).getDate();

    return `${year}-${month}-${day}`;
}

let states = [
    {
        id: 1,
        label: "تحت المعالجة"
    },
    {
        id: 2,
        label: "مقبول"
    },
    {
        id: 3,
        label: "مرفوض"
    }
]

const MyGrivences = () => {
    const [grivence, setGrivence] = useState([]);
    const [pages, setPage] = useState(0)
    const student = useUser();

    const handelPages = (e) => {
        setPage(pages + 1)
    }

    useEffect(() => {

        fetch('/grievances/myGrievances?' + new URLSearchParams({
            username: student.username
        }))
        .then((res) => res.json())
        .then((data) => setGrivence(data));

    })

    return (
        <div className="container container-page">
            <header className="header">
                <h2>تظلماتي</h2>
            </header>

            <section className='grivance-container'>
                {
                    grivence.map(e => {
                        return (
                            <article className='grivance' key={e._id} id={e._id}>
                                <p className='bold'>بيانات الطالب</p>
                                <section className='student-grv'>
                                    <p>رقم القيد: {e.username}</p>
                                    <p>الأسم: {e.name}</p>
                                    <p>القسم: {e.department}</p>
                                    <p>المستوى: {e.level}</p>
                                </section>
                                <p className='bold'>بيانات المادة</p>
                                <section className='subject-grv'>
                                    <p>المادة: {e.subject}</p>
                                    <p>الدرجة: {e.degree}</p>
                                    <p>نوع التظلم: {e.type}</p>
                                    <p>سبب التظلم: {e.reson}</p>
                                </section>
                                <section className='grv-state'>
                                    <p>حالة التظلم: {e.state}</p>
                                    <time dateTime={getDate(e.date)}>التاريخ: {getDate(e.date)}</time>
                                </section>
                            </article>
                        )
                    })
                }
            </section>
            {
                grivence.length >= 5 &&
                <section className='pages'>
                    <button className='btn' onClick={handelPages}>المزيد...</button>
                </section>
            }
        </div>
    );
}

export default MyGrivences;
