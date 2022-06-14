import { useEffect, useState } from 'react';
import '../../css/student/grievance.css';
import { useUser } from '../DataProvider';

let subjects = [];

let amount = 5000;

// get the date of today
var d = new Date(); 
var NoTimeDate = d.getFullYear()+'/'+(d.getMonth()+1)+'/'+d.getDate();

let canSelect = true;
let selectType = true;

const Grievance = () => {
    const student = useUser();
    const [degrees, setDegree] = useState([]);

    let data = {
        username: student.username,
        name: student.name,
        department: student.department,
        level: student.level,
        data: NoTimeDate,
        subject: '',
        degree: 0,
        reaon: '',
        type: '',
        state: false,
    }

    const chooseSubject = (e) => {
        if(canSelect) {
            if(e.target.classList.contains('subject')) {
                const subject = e.target;
                subject.classList.toggle('choose');
                subjects.map(ele => {
                    if (+e.target.attributes.id.value === ele.id) {
                        data.subject = ele.name;
                        data.degree = ele.degree;
                    }
                })
            }
            else if(e.target.parentElement) {
                const subject = e.target.parentElement;
                subject.classList.toggle('choose');
                subjects.map(ele => {
                    if (+e.target.attributes.id.value === ele.id) {
                        data.subject = ele.name;
                        data.degree = ele.degree;
                    }
                })
            }
            canSelect = false;
        }
        else if (!canSelect && (e.target.classList.contains('choose') || e.target.parentElement.classList.contains('choose'))) {
            if (e.target.classList.contains('choose')) {
                e.target.classList.toggle('choose');
            }
            else if(e.target.parentElement) {
                const subject = e.target.parentElement;
                subject.classList.toggle('choose');
            }
            canSelect = true;
        }
    }

    const chooseType = (e) => {
        if (selectType) {
            e.target.classList.toggle('choose');
            data.type = e.target.textContent;
            selectType = false
        }
        else if (!selectType && e.target.classList.contains('choose')) {
            e.target.classList.toggle('choose');
            data.type = '';
            selectType = true;
        }
        console.log(data)
    }

    const handelContent = () => {
        
        let backgroundSection = document.querySelector('.background-section');
        let btnGriv = document.getElementById('btn-griv');
        let btnCancel = document.querySelector('#cancel');
        let btnProve = document.querySelector('#prove');
        let reason = document.getElementById('reason');
        if (btnGriv) {
            btnGriv.addEventListener('click', () => {
                backgroundSection.style.cssText = "display: flex";
                console.log(reason.value)
                data.reaon = reason.value;
                console.log(data)
            })

            btnCancel.addEventListener('click', () => {
                backgroundSection.style.cssText = "display: none";
            })

            btnProve.addEventListener('click', () => {
                backgroundSection.style.cssText = "display: none";
            })
        }
    }

    const checkAmount = () => {
        console.log(student.wallet)
        if (amount <= student.wallet) {
            console.log('DONE')
        }
        else
            console.log("FAILD")
    }

    useEffect(() => {
        handelContent();

        fetch('/degree?'  + new URLSearchParams({
            username: student.username,
            name: student.name
        }))
        .then((res) => res.json())
        .then((data) => setDegree(data));

    }, [])

    degrees.map((e, i, arr) => {
        arr[arr.length - 1].semesters.map((el, i, ar) => {
            return subjects =  ar[ar.length - 1].subjects;
        })
    })

    // check if all subject of student is very good or not for open test
    let openTest = subjects.every(e => {
        return e.points > 2
    }, 2);

    return (
        <div className="container container-page grievance">
            <header className="header">
                <h2>رفع تظلم</h2>
            </header>
            <section className="subjects">
                <header>
                    <h3>المواد المتاحة</h3>
                </header>
                <section className="subjects-container">
                    {
                        subjects.map(e => {
                            return (
                                <article className="subject" key={e.id} id={e.id} onClick={chooseSubject}>
                                    <p className='bold' id='name'>{e.name}</p>
                                    <p id='degree'>الدرجة: {e.degree}</p>
                                    <p id='grade'>التقدير: {e.grade}</p>
                                </article>
                            )
                        })
                    }
                </section>
                {/* if openTest = true then the student has opne test button */}
                {
                    openTest && 
                    <section className='options'>
                        <p className='bold btn open-test' onClick={chooseType}>فتح دفتر</p>
                        <p className='bold btn readd-degree' onClick={chooseType}>جمع درجات</p>
                    </section>
                }
                {
                    !openTest && 
                    <section className='options'>
                        <p className='bold btn readd-degree' onClick={chooseType}>جمع درجات</p>
                    </section>
                }
                <textarea name='reason' id='reason' className='reason' placeholder='سبب التظلم'></textarea>
                <section className='options'>
                    <button className='btn send-griv' id='btn-griv'>رفع التظلم</button>
                </section>
            </section>

            {/* SECTION OF PAYMENT */}
            <div className='background-section'>
                <section className='pay-section'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M48.66 79.13C128.4 100.9 208.2 80.59 288 60.25C375 38.08 462 15.9 549 48.38C565.9 54.69 576 71.62 576 89.66V399.5C576 423.4 550.4 439.2 527.3 432.9C447.6 411.1 367.8 431.4 288 451.7C200.1 473.9 113.1 496.1 26.97 463.6C10.06 457.3 0 440.4 0 422.3V112.5C0 88.59 25.61 72.83 48.66 79.13L48.66 79.13zM287.1 352C332.2 352 368 309 368 255.1C368 202.1 332.2 159.1 287.1 159.1C243.8 159.1 207.1 202.1 207.1 255.1C207.1 309 243.8 352 287.1 352zM63.1 416H127.1C127.1 380.7 99.35 352 63.1 352V416zM63.1 143.1V207.1C99.35 207.1 127.1 179.3 127.1 143.1H63.1zM512 303.1C476.7 303.1 448 332.7 448 368H512V303.1zM448 95.1C448 131.3 476.7 159.1 512 159.1V95.1H448z"/></svg>
                    <p>سحب من المحفظة {amount}</p>
                    <div className='buttons'>
                        <button className='btn' id='prove' onClick={checkAmount}>سحب</button>
                        <button className='btn' id='cancel'>إلغاء</button>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Grievance;