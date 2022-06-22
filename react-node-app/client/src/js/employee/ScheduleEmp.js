import React, { useEffect, useState } from 'react';
import '../../css/employee/scheduleEmp.css'


let departements = [
    {
        id: 1,
        name: 'computer',
        label: 'هندسة حاسوب'
    },
    {
        id: 2,
        name: 'electronic',
        label: 'هندسة إلكترونية وإتصالات'
    },
    {
        id: 3,
        name: 'petrol',
        label: 'هندسة بترولية'
    },
    {
        id: 4,
        name: 'civil',
        label: 'هندسة مدنية'
    },
    {
        id: 5,
        name: 'chemical',
        label: 'هندسة كيميائية'
    },
    {
        id: 6,
        name: 'architectureal',
        label: 'هندسة معمارية'
    }
]

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
]

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
]


let groubs1 = [
    {
        id: 1,
        label: 'A'
    },
    {
        id: 2,
        label: 'B'
    }
]

let groubs2 = [
    {
        id: 1,
        label: 'صباحي',
        name: 'morning'
    },
    {
        id: 2,
        label: 'موازي',
        name: 'afternone'
    }
]

let days =  [
    {
        id:1,
        day:'الاحد'
    },
    {
        id:2,
        day:'الاثنين'
    },
    {
        id:3,
        day:"الثلاثاء"
    },
    {
        id:4,
        day:'الاربعاء'
    },
    {
        id:5,
        day:'الخميس'
    }
]

const ScheduleEmp = () => {
    const [department, setdepartment] = useState(departements[0].label)
    const [level, setLevel] = useState(levels[0].label);
    const [semester, setSemester] = useState(semesters[0].label);
    const [group1, setgroup1] = useState(groubs1[0].label);
    const [group2, setgroup2] = useState(groubs2[0].label);
    const [schedules, setSchedules] = useState([]);
    const [id, setId] = useState();
    


    const addSubject = async (e) => {

        console.log(id)
        const form = document.getElementById('subject-form');
        const subject =form.name_subj.value;
        const prof = form.prof.value;
        const time_from = form.time_from.value;
        const time_to = form.time_to.value;
        const place = form.place.value;
        const day = form.day.value;
        const Id= Math.random()

        const res = await fetch(`/schedule/${id}`, {
            method:'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ subject, prof, time_from, time_to, place, day, Id})
        })
        .then(res => res )
        .catch(err => console.log(err))

        e.preventDefault();
        getSchedule();

    }

    const getSchedule = () => {

        fetch(`/schedule/${department}/${level}/${semester}/${group1}/${group2}`)
        .then(res => res.json())
    .then(data => {
        if(data){
        setSchedules(data.subjects)
        setId(data._id)
        }
        else{
            fetch('/schedule/add', {
                method:'POST',
                body: JSON.stringify({ department, level, semester, group2, group1}),
                headers: {'Content-Type': 'application/json'} 
            })
            .then(res => res.json())
            .then(data =>{
                setSchedules(data.subjects)
                setId(data._id)
            } )
            .catch(err => console.log(err))
                
        }
    })
        .catch(err => console.log(err));

    }

    const deleteSubj= (e) => {

        fetch(`/schedule/${id}/${e}`,{

        })
    }

    const handelchangeDep = e => {
        setdepartment(e.target.value);
    }

    const handelChangeLevel = e => {
        setLevel(e.target.value);
    }

    const handelChangeSem = e => {
        setSemester(e.target.value);
    }

    const handelChangeGroup2 = e => {
        setgroup2(e.target.value);
    }

    const handelChangeGroup1 = e => {
        setgroup1(e.target.value);
    }

    const handelContent = () => {
        let backgroundSection = document.querySelector('.background-section');
        let btnAddSubj = document.getElementById('add-subject-icon');
        let btnCancel = document.querySelector('#cancel');
        let btnAdd = document.querySelector('#add');

        btnAddSubj.addEventListener('click', () => {
            backgroundSection.style.cssText = "display: flex";
        })

        btnCancel.addEventListener('click', () => {
            backgroundSection.style.cssText = "display: none";
        })

        btnAdd.addEventListener('click', () => {
            backgroundSection.style.cssText = "display: none";
        })
    }

    

    useEffect(handelContent);

    React.useEffect(() => {
        getSchedule();

    }, [])
    
    return (
        <div className="container-schedule container-page container">
            <header className="header">
                <h2>جدول المحاضرات</h2> 
            </header>

            <section className="choose-sechedule choose-data">
                <form >
                    <div>
                        <label htmlFor='department'>القسم</label>
                        <select name="department" className="departement" value={department} onChange={handelchangeDep} >
                            {
                                departements.map(e => {
                                    return (
                                        <option name={e.name} key={e.id}>{e.label}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div>
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
                    </div>
                    <div>
                        <label htmlFor='semester'>الفصل الدراسي</label>
                        <select name="semester" className="semester" value={semester} onChange={handelChangeSem}>
                            {
                                semesters.map(e => {
                                    return (
                                        <option name={e.name} key={e.id}>{e.label}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div>
                        <label htmlFor='group2'>المسار</label>
                        <select name="group2" className="group2" value={group2} onChange={handelChangeGroup2}>
                            {
                                groubs2.map(e => {
                                    return (
                                        <option name={e.name} key={e.id}>{e.label}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div>
                        <label htmlFor='group1'>المجموعة</label>
                        <select name="group1" className="group1" value={group1} onChange={handelChangeGroup1}>
                            {
                                groubs1.map(e => {
                                    return (
                                        <option name={e.label} key={e.id}>{e.label}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    
                </form>
                <div className='buttons'>
                    <button className="btn" onClick={getSchedule}>انشاء</button>
                    
                </div>
            </section>

            <table className='schedule'>
                <tbody>
                    {
                        
                            days.map(i =>{
                            
                                return (
                                    <tr className='day' key={i.id}>
                                        <th><p className='bold'>{i.day}</p></th>

                                       { 
                                        schedules.map(e => {
                                            if (e.day === i.day){
                                                return(
                                                    <td className='subject subject-emp' key={e.Id}>
                                                        <p className='bold'>{e.subject}</p>
                                                        <p>{e.prof}</p>
                                                        <p>{e.time_from} - {e.time_to}</p>
                                                        <p>{e.place}</p>
                                                        <div className='delete icons'>
                                                            <svg className='delete-icon' onClick={() => deleteSubj(e.Id)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z"/></svg>
                                                        </div>
                                                    </td>
                                                )
                                            }
                                             })
                                        } 
                                    </tr>

                                )
                            
                        })
                    }
                    <tr>
                        <td className='add-subject-icon icons' id='add-subject-icon' colSpan='5' onClick={handelContent}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM256 368C269.3 368 280 357.3 280 344V280H344C357.3 280 368 269.3 368 256C368 242.7 357.3 232 344 232H280V168C280 154.7 269.3 144 256 144C242.7 144 232 154.7 232 168V232H168C154.7 232 144 242.7 144 256C144 269.3 154.7 280 168 280H232V344C232 357.3 242.7 368 256 368z"/></svg>
                        </td>
                    </tr>
                </tbody>
            </table>
            
            <div className='background-section add-subject'>
                <section className='pay-section'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M160 32V64H288V32C288 14.33 302.3 0 320 0C337.7 0 352 14.33 352 32V64H400C426.5 64 448 85.49 448 112V160H0V112C0 85.49 21.49 64 48 64H96V32C96 14.33 110.3 0 128 0C145.7 0 160 14.33 160 32zM0 192H448V464C448 490.5 426.5 512 400 512H48C21.49 512 0 490.5 0 464V192zM80 256C71.16 256 64 263.2 64 272V368C64 376.8 71.16 384 80 384H176C184.8 384 192 376.8 192 368V272C192 263.2 184.8 256 176 256H80z"/></svg>
                    <h4>إضافة مادة</h4>
                    <section className='data-subject'>
                        <form  id='subject-form'>
                            <div>
                                <label htmlFor='name-subj'>إسم المادة</label>
                                <input name='name_subj' type='text' required />
                            </div>
                            <div>
                                <label htmlFor='prof'>الدكتور</label>
                                <input name='prof' type='text' />
                            </div>
                            <div>
                                <label htmlFor='time-from'>من</label>
                                <input className='time' name='time_from' type='text' />
                                <label htmlFor='time-to'>إلى</label>
                                <input className='time' name='time_to' type='text' />
                            </div>
                            <div>
                                <label htmlFor='place'>القاعة</label>
                                <input name='place' type='text' />
                                <label htmlFor='day'>اليوم</label>
                                <input name='day' type='text' required />
                            </div>
                        </form>
                    </section>
                    <div className='buttons'>
                        <button className='btn' id='add' onClick={addSubject}>إضافة</button>
                        <button className='btn' id='cancel'>إلغاء</button>
                    </div>
                   
                </section>
            </div>
        </div>
    );
}

export default ScheduleEmp;