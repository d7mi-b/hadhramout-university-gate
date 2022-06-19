import {useState, useEffect} from 'react';
import '../../css/employee/grivanceEmp.css';
import {useUser} from '../DataProvider';

const states = [
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

const GrivenceEmp = () => {
    const [grivence, setGrivence] = useState([]);
    const student = useUser();
    const [state, setState] = useState('تحت المعالجة');

    const handelChangeState = e => {
        setState(e.target.value);
    }

    const grvAccept = (e) => {
        const id = e.target.parentElement.parentElement.parentElement.id;

        //update state of grivances
        fetch('/grievances/update-state', {
                method: 'PATCH',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    _id: id,
                    state: 'مقبول'
                })
            }).then((result) => console.log(result))
            .catch((err) => console.log(err));
    }

    const grvDisaccept = (e) => {
        const id = e.target.parentElement.parentElement.parentElement.id;

        //update state of grivances
        fetch('/grievances/update-state', {
                method: 'PATCH',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    _id: id,
                    state: 'مرفوض'
                })
            }).then((result) => console.log(result))
            .catch((err) => console.log(err));
    }

    useEffect(() => {

        // get grivances from database
        fetch('/grievances/get')
            .then(res => res.json())
            .then(data => setGrivence(data));
    })

    return (
        <div className='container container-page'>
            <header className='header'>
                <h2>التظلمات</h2>
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
                                    {
                                        e.state === 'تحت المعالجة' &&
                                        <section className='buttons'>
                                            <button className='btn' id='btn-accept' onClick={grvAccept}>قبول التظلم</button>
                                            <button className='btn' id='btn-accept' onClick={grvDisaccept}>رفص التظلم</button>
                                        </section>
                                    }
                                </section>
                            </article>
                        )
                    })
                }
            </section>
        </div>
    );
}

export default GrivenceEmp;