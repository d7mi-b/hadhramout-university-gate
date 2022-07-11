import {useState, useEffect} from 'react';
import {useUser} from '../DataProvider';
import '../../css/employee/grivanceEmp.css';

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

const getDate = (e) => {
    const year = new Date(e).getFullYear();
    const month = new Date(e).getMonth();
    const day = new Date(e).getDate();

    return `${year}-${month}-${day}`;
}

const GrivenceEmp = () => {
    const [grivence, setGrivence] = useState([]);
    const [state, setState] = useState(states[0].label);
    const [pages, setPage] = useState(0)
    const employee = useUser();
    const [data, setData] = useState('');

    const handelPages = (e) => {
        setPage(pages + 1)
    }

    const handelChangeState = e => {
        setState(e.target.value);
    }

    const grvAccept = (e) => {
        const id = e.target.parentElement.parentElement.parentElement.id;

        // get subject to update its state
        fetch(`/grievances/singleGrivence/${id}`)
            .then(result => result.json())
            .then(data => setData(data[0]))
            .catch(err => console.log(err));

        //update state of grivances
        fetch('/grievances/update-state', {
                method: 'PATCH',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    _id: id,
                    state: 'مقبول',
                    subject: data.subject,
                    username: data.username
                })
            }).then((result) => console.log(result))
            .catch((err) => console.log(err));
    }

    const grvDisaccept = (e) => {
        const id = e.target.parentElement.parentElement.parentElement.id;

        // get subject to update its state
        fetch(`/grievances/singleGrivence/${id}`)
            .then(result => result.json())
            .then(data => setData(data[0]))
            .catch(err => console.log(err));

        //update state of grivances
        fetch('/grievances/update-state', {
                method: 'PATCH',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    _id: id,
                    state: 'مرفوض',
                    subject: data.subject,
                    username: data.username
                })
            }).then((result) => console.log(result))
            .catch((err) => console.log(err));
    }

    useEffect(() => {

        // get grivances from database
        fetch('/grievances/get?'  + new URLSearchParams({
            department: employee.department,
            page: +pages,
            state: state
        }))
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
                                    <time dateTime={getDate(e.date)}>التاريخ: {getDate(e.date)}</time>
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
            {
                grivence.length >= 5 &&
                <section className='pages'>
                    <button className='btn' onClick={handelPages}>المزيد...</button>
                </section>
            }
        </div>
    );
}

export default GrivenceEmp;
