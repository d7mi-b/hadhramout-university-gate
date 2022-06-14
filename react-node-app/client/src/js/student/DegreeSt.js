import React, { useEffect, useState } from 'react';
import { useUser } from '../DataProvider';
import '../../css/student/degreeSt.css'

let levels = [
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

let semesters = [
    {
        id:1,
        label:'الفصل الدراسي الأول',
        name: 'first-semestar'
    },
    {
        id:2,
        label:'الفصل الدراسي الثاني',
        name: 'second-semestar'
    }
];

let amount = 5000;

const DegreeSt = () => {
    const [level, setLevel] = useState(levels[0].label);
    const [semester, setSemester] = useState(semesters[0].label);
    const student = useUser();
    const [degrees, setDegree] = useState([]);

    const handelChangeLevel = e => {
        setLevel(e.target.value);
    }

    const handelChangeSem = e => {
        setSemester(e.target.value);
    }

    // HANDEL CONTENT
    const handelContent = () => {
        let backgroundSection = document.querySelector('.background-section');
        let btnGetDeg = document.getElementById('get-dgrees');
        let btnCancelDeg = document.querySelector('#cancel');
        let btnProveDeg = document.querySelector('#prove');
        
        btnGetDeg.addEventListener('click', () => {
            backgroundSection.style.cssText = "display: flex";
        })

        btnCancelDeg.addEventListener('click', () => {
            backgroundSection.style.cssText = "display: none";
        })

        btnProveDeg.addEventListener('click', () => {
            backgroundSection.style.cssText = "display: none";
        })
    }

    useEffect(() => {

        fetch('/degree?'  + new URLSearchParams({
            username: student.username,
            name: student.name
        }))
        .then((res) => res.json())
        .then((data) => setDegree(data));

    }, [])

    return (
        <div className="container-page container">
            <header className="header">
                <h2>بيان درجات</h2>
            </header>
            {/* CHOOSE LEVEL AND SEMESTER */}
            <section className="choose-data">
                <form action="#" method="POST">
                    <label htmlFor='level'>المستوى</label>
                    <select name="level" className="level" value={level} onChange={handelChangeLevel} >
                        {
                            levels.map(e => {
                                return (
                                    <option name={e.name} key={e.id}>{e.label}</option>
                                )
                            })
                        }
                    </select>
                    <label htmlFor='semester'>الفصل الدراسي</label>
                    <select name="semester" className="semester" onChange={handelChangeSem}>
                        {
                            semesters.map(e => {
                                return (
                                    <option name={e.name} key={e.id}>{e.label}</option>
                                )
                            })
                        }
                    </select>
                </form>
            </section>

            {/* DISPALY DEGREE STATEMENT */}
            <section className='display-degrees'>
                {
                    degrees.map(e => {
                        if (e.levelName === level) {
                            return e.semesters.map(ele => {
                                if (ele.semester === semester) {
                                    return (
                                        <div key={e.id}>
                                            <header className='display-degrees-header'>
                                                <h4>{level}</h4>
                                                <h4>{semester}</h4>
                                            </header>
                                            <section className='averages'>
                                                <p className='bold'>المعدل الفصلي: {ele.semAvg}</p>
                                                <p className='bold'>المعدل التراكمي: {student.GPA}</p>
                                            </section>
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>المقرر الدراسي</th>
                                                        <th>الساعات المعتمدة</th>
                                                        <th>الدرجة</th>
                                                        <th>النقاط</th>
                                                        <th>التقدير</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        ele.subjects.map(el => {
                                                            return (
                                                                <tr key={el.id}>
                                                                    <td>{el.name}</td>
                                                                    <td>{el.hours}</td>
                                                                    <td>{el.degree}</td>
                                                                    <td>{el.points}</td>
                                                                    <td>{el.grade}</td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>

                                            <button className='get-dgree btn' id='get-dgrees' onClick={handelContent}>الحصول عليه</button>
                                        </div>
                                    )
                                }
                            })
                        }
                    })
                    // data.map(e => {
                    //     if (e.levelName === level)
                        
                    // })
                }
            </section>
            {/* SECTION OF PAYMENT */}
            <div className='background-section'>
                <section className='pay-section'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M48.66 79.13C128.4 100.9 208.2 80.59 288 60.25C375 38.08 462 15.9 549 48.38C565.9 54.69 576 71.62 576 89.66V399.5C576 423.4 550.4 439.2 527.3 432.9C447.6 411.1 367.8 431.4 288 451.7C200.1 473.9 113.1 496.1 26.97 463.6C10.06 457.3 0 440.4 0 422.3V112.5C0 88.59 25.61 72.83 48.66 79.13L48.66 79.13zM287.1 352C332.2 352 368 309 368 255.1C368 202.1 332.2 159.1 287.1 159.1C243.8 159.1 207.1 202.1 207.1 255.1C207.1 309 243.8 352 287.1 352zM63.1 416H127.1C127.1 380.7 99.35 352 63.1 352V416zM63.1 143.1V207.1C99.35 207.1 127.1 179.3 127.1 143.1H63.1zM512 303.1C476.7 303.1 448 332.7 448 368H512V303.1zM448 95.1C448 131.3 476.7 159.1 512 159.1V95.1H448z"/></svg>
                    <p>سحب من المحفظة {amount}</p>
                    <div className='buttons'>
                        <button className='btn' id='prove'>سحب</button>
                        <button className='btn' id='cancel'>إلغاء</button>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default DegreeSt;