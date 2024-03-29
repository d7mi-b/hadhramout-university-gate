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
    const [page, setPage] = useState(0);
    const employee = useUser();
    const [singleGrivence, setSingleGrivence] = useState('');
    const [ search_student, setSearchStudent ] = useState(null);


    const handlePrevious = () => {
        setPage((p) => {
            if (p === 0) return p;
            return p - 1;
            });
    }

    const handleNext = () => {
        setPage((p) => {
            // if (p === pageCount) return p;
            return p + 1;
        });
    }

    const handelChangeState = e => {
        setState(e.target.value);
    }

    const grvAccept = (e) => {
        const id = e.target.parentElement.parentElement.parentElement.id;

        // get subject to update its state
        fetch(`/grievances/singleGrivence/${id}`)
            .then(result => result.json())
            .then(data => setSingleGrivence(data[0]))
            .catch(err => console.log(err));

        //update state of grivances
        fetch('/grievances/update-state', {
                method: 'PATCH',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    _id: id,
                    state: 'مقبول',
                    subject: singleGrivence.subject,
                    username: singleGrivence.username
                })
            }).then((result) => result)
            .catch((err) => console.log(err));
    }

    const grvDisaccept = (e) => {
        const id = e.target.parentElement.parentElement.parentElement.id;

        // get subject to update its state
        fetch(`/grievances/singleGrivence/${id}`)
            .then(result => result.json())
            .then(data => setSingleGrivence(data[0]))
            .catch(err => console.log(err));

        //update state of grivances
        fetch('/grievances/update-state', {
                method: 'PATCH',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    _id: id,
                    state: 'مرفوض',
                    subject: singleGrivence.subject,
                    username: singleGrivence.username
                })
            }).then((result) => result)
            .catch((err) => console.log(err));
    }

    const searchStudent = e => {
        const username = e.target.value;

        if (username.length === 11) {
            fetch('/grievances/myGrievances?' + new URLSearchParams({
                username,
            }))
            .then(res => res.json())
            .then(data => setSearchStudent(data))
            .catch(err => console.log(err));
        } else if (username === '') {
            setSearchStudent(null)
        }
    }

    const grievancesPDF = (e) => {
        e.preventDefault();

        fetch('/pdf/grievancyPDF?' + new URLSearchParams({
            name: employee.name,
            department: employee.department,
            date: getDate(new Date()),
            grivences: JSON.stringify(grivence)
        }))
        .then(response => {
            response.blob().then(blob => {
                // Creating new object of PDF file
                const fileURL = window.URL.createObjectURL(blob);
                // Setting various property values
                let alink = document.createElement('a');
                alink.href = fileURL;
                alink.download = `التظلمات.pdf`;
                alink.click();
            })
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        // get grivances from database
        fetch('/grievances/get?'  + new URLSearchParams({
            department: employee.department,
            page: page,
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

            <section className="choose-state">
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
                    <section className='search-student'>
                        <label htmlFor='search'>البحث عن طالب</label>
                        <input type='search' name='search' placeholder='رقم القيد الخاص بالطالب' onChange={searchStudent}/>
                    </section>
                    {
                        state === 'تحت المعالجة' && <button onClick={grievancesPDF} className='btn'>طباعة</button>
                    }
                </form>
            </section>
            <section className='grivance-container'>
                {
                    !search_student &&
                    grivence.filter(e => state === e.state).map(e => {
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
                {
                    search_student &&
                    search_student.filter(e => state === e.state).map(e => {
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
                grivence.length >= 3 && page !== 0 && !search_student &&
                <section className='pages'>
                    <button className='btn' onClick={handleNext}>التالي</button>
                    <button className='btn' onClick={handlePrevious}>السابق</button>
                </section>
            }
            {
                grivence.length >= 3 && page === 0 && !search_student  &&
                <section className='pages'>
                    <button className='btn' onClick={handleNext}>التالي</button>
                </section>
            }
            {
                grivence.length < 3 && page !== 0 && !search_student &&
                <section className='pages'>
                    <button className='btn' onClick={handlePrevious}>السابق</button>
                </section>
            }
        </div>
    );
}

export default GrivenceEmp;
