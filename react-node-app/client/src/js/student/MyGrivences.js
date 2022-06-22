import { useEffect, useState } from 'react';
import '../../css/employee/grivanceEmp.css'
import { useUser } from '../DataProvider';

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
    const [state, setState] = useState(states[0].label);
    const student = useUser();

    const handelChangeState = e => {
        setState(e.target.value);
    }

    useEffect(() => {

        fetch('/grievances/myGrievances?' + new URLSearchParams({
            username: student.username,
        }))
        .then((res) => res.json())
        .then((data) => setGrivence(data));

    })

    return (
        <div className="container container-page">
            <header className="header">
                <h2>تظلماتي</h2>
            </header>

            <sectoin className="choose-state">
                <form action='#' method=''>
                    <label htmlFor='state'>حالة التظلم</label>
                    <select name='state' value={state} onChange={handelChangeState}>
                        {
                            states.map(e => {
                                return (
                                    <option key={e.id}>{e.label}</option>
                                )
                            })
                        }
                    </select>
                </form>
            </sectoin>

            <section className='grivance-container'>
                {
                    grivence.map(e => {
                        if (state === e.state)
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
                                    <time dateTime={e.createdAt}>التاريخ: {e.date}</time>
                                </section>
                            </article>
                        )
                    })
                }
            </section>
        </div>
    );
}

export default MyGrivences;