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

const date = new Date();

const DegreeSt = () => {
    const [level, setLevel] = useState(levels[0].label);
    const [semester, setSemester] = useState(semesters[0].label);
    const student = useUser();
    const [degrees, setDegree] = useState([]);
    const [price, setPrice] = useState(0);
    const [checkPrice, setCheckPrice] = useState(true);
    const [data, setData] = useState([]);

    const handelChangeLevel = e => {
        setLevel(e.target.value);
    }

    const handelChangeSem = e => {
        setSemester(e.target.value);
    }

    // HANDEL CONTENT
    const handelContent = () => {
        const backgroundSection = document.querySelector('.background-section');
        const btnCancelDeg = document.querySelector('#cancel');
        const btnProveDeg = document.querySelector('#prove');

        btnCancelDeg.addEventListener('click', () => {
            backgroundSection.style.cssText = "display: none";
        })

        btnProveDeg.addEventListener('click', () => {
            backgroundSection.style.cssText = "display: none";
        })
    }

    const checkWallet = () => {
        if (price <= student.wallet) {
            setCheckPrice(true);

            fetch('/transaction/addTransaction', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    username: student.username,
                    date: date,
                    service: 'بيان درجات',
                    type: '',
                    price: price
                })
            }).then(result => {
                if (result.status === 200) {
                    // to get deree statement of student
                    fetch('/pdf/degreeSt?' + new URLSearchParams({
                        username: student.username,
                        name: student.name,
                        collage: student.collage,
                        department: student.department,
                        level: student.level,
                        GPA: student.GPA,
                        degreeLevel: level,
                        semestar: data.semester,
                        semAvg: data.semAvg,
                        semGrd: data.semGrd,
                        sex: student.sex,
                        nationality: student.nationality,
                        POB: student.POB,
                        DOB: new Date(student.DOB).getFullYear(),
                        yearToJoin: student.yearToJoin,
                        gread: student.gread,
                        subjects: JSON.stringify(data.subjects)
                    }))
                    .then(() => console.log('done'))
                    .catch(err => console.log(err))

                    fetch('/updateUser?' + new URLSearchParams({
                        username: student.username
                    }))
                    .then((res) => res.json())
                    .then((data) => {
                        window.sessionStorage.setItem('user', JSON.stringify(data))
                        window.location.reload()
                    });
                }
            }).catch(err => console.log(err))
        }
        else {
            setCheckPrice(false);
        }
    }

    // to get data of subjects
    const handelGetDegSt = (e) => {
        setData(JSON.parse(e.target.attributes.send.value));
        const backgroundSection = document.querySelector('.background-section');
        backgroundSection.style.cssText = "display: flex";
    }

    useEffect(() => {

      // to get the price of service
        fetch('/services/checkPrice?' + new URLSearchParams({
            name: 'بيان درجات',
            type: ""
        }))
        .then((res) => res.json())
        .then(data => setPrice(data.price))
        .catch(err => console.log(err))

        // to fetch degrees of student
        fetch('/degree?'  + new URLSearchParams({
            username: student.username,
        }))
        .then((res) => res.json())
        .then((data) => setDegree(data));

        handelContent();
    }, [])

    return (
        <div className="container-page container container-degree-page">
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

                                            <button className='get-dgree btn' id='get-dgrees' onClick={handelGetDegSt} send={JSON.stringify(ele)}>الحصول عليه</button>
                                        </div>
                                    )
                                }
                            })
                        }
                    })
                }
            </section>
            {/* SECTION OF PAYMENT */}
            <div className='background-section'>
                <section className='pay-section'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M48.66 79.13C128.4 100.9 208.2 80.59 288 60.25C375 38.08 462 15.9 549 48.38C565.9 54.69 576 71.62 576 89.66V399.5C576 423.4 550.4 439.2 527.3 432.9C447.6 411.1 367.8 431.4 288 451.7C200.1 473.9 113.1 496.1 26.97 463.6C10.06 457.3 0 440.4 0 422.3V112.5C0 88.59 25.61 72.83 48.66 79.13L48.66 79.13zM287.1 352C332.2 352 368 309 368 255.1C368 202.1 332.2 159.1 287.1 159.1C243.8 159.1 207.1 202.1 207.1 255.1C207.1 309 243.8 352 287.1 352zM63.1 416H127.1C127.1 380.7 99.35 352 63.1 352V416zM63.1 143.1V207.1C99.35 207.1 127.1 179.3 127.1 143.1H63.1zM512 303.1C476.7 303.1 448 332.7 448 368H512V303.1zM448 95.1C448 131.3 476.7 159.1 512 159.1V95.1H448z"/></svg>
                    <p>سحب من المحفظة {price}</p>
                    <div className='buttons'>
                        <button className='btn' id='prove' onClick={checkWallet}>سحب</button>
                        <button className='btn' id='cancel'>إلغاء</button>
                    </div>
                </section>
                <section className='check-section'>
                    {
                        !checkPrice &&
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM232 152C232 138.8 242.8 128 256 128s24 10.75 24 24v128c0 13.25-10.75 24-24 24S232 293.3 232 280V152zM256 400c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 385.9 273.4 400 256 400z"/></svg>
                            <p>لا يوجد رصيد كافي</p>
                        </div>
                    }
                    {
                        checkPrice &&
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z"/></svg>
                            <p>تم تجديد القيد</p>
                        </div>
                    }
                    <div className='buttons'>
                        <button className='btn' id='close'>إغلاق</button>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default DegreeSt;
