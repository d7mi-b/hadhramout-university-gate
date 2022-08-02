import {useState, useEffect} from 'react';
import { useUser } from '../DataProvider';
import '../../css/employee/student.css'

const typesOfRegister = [
    {
        id: 1,
        label: "الكل"
    },
    {
        id: 2,
        label: "قبول عام"
    },
    {
        id: 3,
        label: "نفقة خاصة"
    },
    {
        id: 4,
        label: "موازي"
    }
];

const levels = [
    {
        id:6,
        label:'الكل',
        name: 'all'
    },
    {
        id:1,
        label:'المستوى الأول',
        name: 'first-level'
    },
    {
        id:2,
        label:'المستوى الثاني',
        name: 'second-level'
    },
    {
        id:3,
        label:'المستوى الثالث',
        name: 'thierd-level'
    },
    {
        id:4,
        label:'المستوى الرابع',
        name: 'fourth-level'
    },
    {
        id:5,
        label:'المستوى الخامس',
        name: 'fifth-level'
    },
];

const states = [
    {
        id:3,
        label:'الكل',
        state: ''
    },
    {
        id:1,
        label:'مجدد',
        state: true
    },
    {
        id:2,
        label:'غير مجدد',
        state: false
    },
]

const Student = () => {
    const employee = useUser();
    const [students, setStudents ] = useState([]);
    const [ typeOfRegister, setTypeOfRegister ] = useState(typesOfRegister[0].label);
    const [level, setLevel] = useState(levels[0].label);
    const [ state, setState ] = useState(states[0].label);
    const [ search_student, setSearchStudent ] = useState('');


    const handelTypesOfRegister = (e) => {
        setTypeOfRegister(e.target.value);
    }

    const handelChangeLevel = e => {
        setLevel(e.target.value);
    }

    const handelState = e => {
        if (e.target.value === 'مجدد')
            setState(true)
        else if (e.target.value === 'غير مجدد')
            setState(false)
        else 
            setState(states[0].label)
    }

    const addNotification = e => {
        const username = e.target.parentElement.parentElement.id;
        const notify = e.target.textContent;

        fetch('/addNotification', {
            method: "PATCH",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: username,
                notify: notify
            })
        })
        .then(res => res )
        .catch(err => console.log(err))
    }

    const searchStudent = e => {
        const username = e.target.value;

        fetch('/updateUser?' + new URLSearchParams({
            username,
        }))
        .then(res => res.json())
        .then(data => setSearchStudent(data))
        .catch(err => console.log(err));
    }

    useEffect(() => {
        
        fetch(`/getStudents/${employee.department}`)
        .then(res => res.json())
        .then(data => setStudents(data))
        .catch(err => console.log(err));
    }, [])

    return (
        <div className="container container-page">
            <header className='header'>
                <h2>الطلاب</h2>
            </header>

            <form className='students-fillter'>
                <section className='search-student'>
                    <label htmlFor='search'>البحث عن طالب</label>
                    <input type='search' name='search' placeholder='رقم القيد الخاص بالطالب' onChange={searchStudent}/>
                </section>
                <section className='selects'>
                    <section className='levels'>
                        <label htmlFor='level'>المستوى</label>
                        <select name='level' onChange={handelChangeLevel}>
                            {
                                levels.map(e => {
                                    return (
                                        <option key={e.id}>{e.label}</option>
                                    )
                                })
                            }
                        </select>
                    </section>
                    <section className='type-of-register'>
                        <label htmlFor='typeOfRegister'>نوع القبول</label>
                        <select name='typeOfRegister' onChange={handelTypesOfRegister}>
                            {
                                typesOfRegister.map(e => {
                                    return (
                                        <option key={e.id}>{e.label}</option>
                                    )
                                })
                            }
                        </select>
                    </section>
                    <section className='levels'>
                        <label htmlFor='level'>حالة القيد</label>
                        <select name='level' onChange={handelState}>
                            {
                                states.map(e => {
                                    return (
                                        <option key={e.id}>{e.label}</option>
                                    )
                                })
                            }
                        </select>
                    </section>
                </section>
            </form>

            <section className='students'>
                {
                    !search_student &&
                    students.map(e => {
                        if (typeOfRegister === e.typeOfRegister && level === e.level && state === e.state) {
                            return (
                                <article className='student' id={e.username} key={e._id}>
                                    <section className='student-info'>
                                        <p>الإسم: {e.name}</p>
                                        <p>رقم القيد: {e.username}</p>
                                        <p>التخصص: {e.department}</p>
                                        <p>المستوى: {e.level}</p>
                                        <p>المعدل التراكمي: {e.GPA}</p>
                                        <p>التقدير العام: {e.gread}</p>
                                        <p>نوع القبول: {e.typeOfRegister}</p>
                                        { e.state && <p>حالة القيد: مجدد</p>} { !e.state && <p>حالة القيد: غير مجدد</p>}
                                    </section>
                                    <section className='students-notification'>
                                        <p>إرسال اِشعار: </p>
                                        <p className='btn' onClick={addNotification}>مراجعة المختص</p>
                                        {
                                            !e.state && <p className='btn' onClick={addNotification}>تجديد القيد</p>
                                        }
                                    </section>
                                </article>
                            )
                        }
                        else if (typeOfRegister === "الكل" && level === e.level && state === e.state) {
                            return (
                                <article className='student' id={e.username} key={e._id}>
                                    <section className='student-info'>
                                        <p>الإسم: {e.name}</p>
                                        <p>رقم القيد: {e.username}</p>
                                        <p>التخصص: {e.department}</p>
                                        <p>المستوى: {e.level}</p>
                                        <p>المعدل التراكمي: {e.GPA}</p>
                                        <p>التقدير العام: {e.gread}</p>
                                        <p>نوع القبول: {e.typeOfRegister}</p>
                                        { e.state && <p>حالة القيد: مجدد</p>} { !e.state && <p>حالة القيد: غير مجدد</p>}
                                    </section>
                                    <section className='students-notification'>
                                        <p>إرسال اِشعار: </p>
                                        <p className='btn'>مراجعة المختص</p>
                                        {
                                            e.state && <p className='btn'>تجديد القيد</p>
                                        }
                                    </section>
                                </article>
                            )
                        }
                        else if (level === "الكل" && typeOfRegister === e.typeOfRegister && state === e.state) {
                            return (
                                <article className='student' id={e.username} key={e._id}>
                                    <section className='student-info'>
                                        <p>الإسم: {e.name}</p>
                                        <p>رقم القيد: {e.username}</p>
                                        <p>التخصص: {e.department}</p>
                                        <p>المستوى: {e.level}</p>
                                        <p>المعدل التراكمي: {e.GPA}</p>
                                        <p>التقدير العام: {e.gread}</p>
                                        <p>نوع القبول: {e.typeOfRegister}</p>
                                        { e.state && <p>حالة القيد: مجدد</p>} { !e.state && <p>حالة القيد: غير مجدد</p>}
                                    </section>
                                    <section className='students-notification'>
                                        <p>إرسال اِشعار: </p>
                                        <p className='btn' onClick={addNotification}>مراجعة المختص</p>
                                        {
                                            !e.state && <p className='btn' onClick={addNotification}>تجديد القيد</p>
                                        }
                                    </section>
                                </article>
                            )
                        }
                        else if (state === "الكل" && typeOfRegister === e.typeOfRegister && level === e.level) {
                            return (
                                <article className='student' id={e.username} key={e._id}>
                                    <section className='student-info'>
                                        <p>الإسم: {e.name}</p>
                                        <p>رقم القيد: {e.username}</p>
                                        <p>التخصص: {e.department}</p>
                                        <p>المستوى: {e.level}</p>
                                        <p>المعدل التراكمي: {e.GPA}</p>
                                        <p>التقدير العام: {e.gread}</p>
                                        <p>نوع القبول: {e.typeOfRegister}</p>
                                        { e.state && <p>حالة القيد: مجدد</p>} { !e.state && <p>حالة القيد: غير مجدد</p>}
                                    </section>
                                    <section className='students-notification'>
                                        <p>إرسال اِشعار: </p>
                                        <p className='btn' onClick={addNotification}>مراجعة المختص</p>
                                        {
                                            !e.state && <p className='btn' onClick={addNotification}>تجديد القيد</p>
                                        }
                                    </section>
                                </article>
                            )
                        }
                        else if (level === "الكل" && typeOfRegister === 'الكل' && state === e.state) {
                            return (
                                <article className='student' id={e.username} key={e._id}>
                                    <section className='student-info'>
                                        <p>الإسم: {e.name}</p>
                                        <p>رقم القيد: {e.username}</p>
                                        <p>التخصص: {e.department}</p>
                                        <p>المستوى: {e.level}</p>
                                        <p>المعدل التراكمي: {e.GPA}</p>
                                        <p>التقدير العام: {e.gread}</p>
                                        <p>نوع القبول: {e.typeOfRegister}</p>
                                        { e.state && <p>حالة القيد: مجدد</p>} { !e.state && <p>حالة القيد: غير مجدد</p>}
                                    </section>
                                    <section className='students-notification'>
                                        <p>إرسال اِشعار: </p>
                                        <p className='btn' onClick={addNotification}>مراجعة المختص</p>
                                        {
                                            !e.state && <p className='btn' onClick={addNotification}>تجديد القيد</p>
                                        }
                                    </section>
                                </article>
                            )
                        }
                        else if (level === e.level && typeOfRegister === 'الكل' && state === "الكل") {
                            return (
                                <article className='student' id={e.username} key={e._id}>
                                    <section className='student-info'>
                                        <p>الإسم: {e.name}</p>
                                        <p>رقم القيد: {e.username}</p>
                                        <p>التخصص: {e.department}</p>
                                        <p>المستوى: {e.level}</p>
                                        <p>المعدل التراكمي: {e.GPA}</p>
                                        <p>التقدير العام: {e.gread}</p>
                                        <p>نوع القبول: {e.typeOfRegister}</p>
                                        { e.state && <p>حالة القيد: مجدد</p>} { !e.state && <p>حالة القيد: غير مجدد</p>}
                                    </section>
                                    <section className='students-notification'>
                                        <p>إرسال اِشعار: </p>
                                        <p className='btn' onClick={addNotification}>مراجعة المختص</p>
                                        {
                                            !e.state && <p className='btn' onClick={addNotification}>تجديد القيد</p>
                                        }
                                    </section>
                                </article>
                            )
                        }
                        else if (level === "الكل" && typeOfRegister === e.typeOfRegister && state === "الكل") {
                            return (
                                <article className='student' id={e.username} key={e._id}>
                                    <section className='student-info'>
                                        <p>الإسم: {e.name}</p>
                                        <p>رقم القيد: {e.username}</p>
                                        <p>التخصص: {e.department}</p>
                                        <p>المستوى: {e.level}</p>
                                        <p>المعدل التراكمي: {e.GPA}</p>
                                        <p>التقدير العام: {e.gread}</p>
                                        <p>نوع القبول: {e.typeOfRegister}</p>
                                        { e.state && <p>حالة القيد: مجدد</p>} { !e.state && <p>حالة القيد: غير مجدد</p>}
                                    </section>
                                    <section className='students-notification'>
                                        <p>إرسال اِشعار: </p>
                                        <p className='btn' onClick={addNotification}>مراجعة المختص</p>
                                        {
                                            !e.state && <p className='btn' onClick={addNotification}>تجديد القيد</p>
                                        }
                                    </section>
                                </article>
                            )
                        }
                        else if (level === "الكل" && typeOfRegister === 'الكل' && state === "الكل") {
                            return (
                                <article className='student' id={e.username} key={e._id}>
                                    <section className='student-info'>
                                        <p>الإسم: {e.name}</p>
                                        <p>رقم القيد: {e.username}</p>
                                        <p>التخصص: {e.department}</p>
                                        <p>المستوى: {e.level}</p>
                                        <p>المعدل التراكمي: {e.GPA}</p>
                                        <p>التقدير العام: {e.gread}</p>
                                        <p>نوع القبول: {e.typeOfRegister}</p>
                                        { e.state && <p>حالة القيد: مجدد</p>} { !e.state && <p>حالة القيد: غير مجدد</p>}
                                    </section>
                                    <section className='students-notification'>
                                        <p>إرسال اِشعار: </p>
                                        <p className='btn' onClick={addNotification}>مراجعة المختص</p>
                                        {
                                            !e.state && <p className='btn' onClick={addNotification}>تجديد القيد</p>
                                        }
                                    </section>
                                </article>
                            )
                        }
                    })
                }
                {
                    search_student && 
                    <article className='student' id={search_student.username} key={search_student._id}>
                        <section className='student-info'>
                            <p>الإسم: {search_student.name}</p>
                            <p>رقم القيد: {search_student.username}</p>
                            <p>التخصص: {search_student.department}</p>
                            <p>المستوى: {search_student.level}</p>
                            <p>المعدل التراكمي: {search_student.GPA}</p>
                            <p>التقدير العام: {search_student.gread}</p>
                            <p>نوع القبول: {search_student.typeOfRegister}</p>
                            { search_student.state && <p>حالة القيد: مجدد</p>} { !search_student.state && <p>حالة القيد: غير مجدد</p>}
                        </section>
                        <section className='students-notification'>
                            <p>إرسال اِشعار: </p>
                            <p className='btn' onClick={addNotification}>مراجعة المختص</p>
                            {
                                !search_student.state && <p className='btn' onClick={addNotification}>تجديد القيد</p>
                            }
                        </section>
                    </article>
                }
            </section>
        </div>
    )
}

export default Student;