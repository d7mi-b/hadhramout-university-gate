import '../../css/employee/calanderEmp.css'
import React, { useEffect, useState } from 'react';

const years = [
    {
        id:1,
        label:'2021-2022',
        name:'2021-2022'
    },
    {
        id:2,
        label:'2022-2023',
        name:'2022-2023'
    },
    {
        id:3,
        label:'2023-2024',
        name:'2023-2024'
    },
    {
        id:4,
        label:'2024-2025',
        name:'2024-2025'
    }
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

const CalanderEmp = () => {
    const [semester, setSemester] = useState(semesters[0].name);
    const [year, setYear] = useState(years[0].label)
    const [id, setId] = useState()
    const [sem1, setSem1] = useState([])
    const [sem2, setSem2] = useState([])

    const addCalander = (e) => {
        const form = document.getElementById('cal-form')
        const details = form.details.value;
       

        fetch(`/calander/${year}`)
        .then(res => res.json())
        .then(data => {
            if(data){
                console.log(data._id)
                setId(data._id)
                setSem1(data.semester1)
                setSem2(data.semester2)
                if(details){
                    addDetails();
                }
                
            }
            else{
                fetch(`/calander`,{
                    method:'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({year})
                })
                .then(res => res.json())
                .then(result => {
                    console.log(result)
                    setId(result)})
                .catch(err => console.log(err))
            }
        })
        .catch(err => console.log(err))

         
    }

    const addDetails = (e) => {
        
        const form = document.getElementById('cal-form')
        const date = form.date.value;
        const details = form.details.value;
        const Id = Math.random();

        fetch(`/calander/${id}`,{
            method:'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({date, details, semester, Id})
        })
        .then(result => {
            setSem1(result.semester1)
            setSem2(result.semester2)
    
            addCalander(); 
        })
        .catch(err => console.log(err))
        
        
       
    }

    const handelChangeSem = e => {
        setSemester(e.target.value);
    }

    const handleChangeYr = e => {
        setYear(e.target.value);
    }

    React.useEffect(() => {
        addCalander();

    }, [])
    

    return(
        <div className='container-schedule container-page container'>
            <header className="header">
                <h2>إضافة تقويم السنة</h2>
            </header>
            <section className='choose-year choose-data'>
                <form method='POST' id='cal-form' >
                    <div>
                        <label htmlFor='years'>السنة الدراسية</label>
                        <select name='years' value={year} onChange={handleChangeYr}>
                            {
                                years.map(e => {
                                    return(
                                        <option name={e.name} key={e.id}>{e.label}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div>
                        <label>الفصل الدراسي</label>
                        <select name="semester"  value={semester} onChange={handelChangeSem}>
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
                        <label htmlFor='date' className='edit-text'>التاريخ</label>
                        <input name='date' type='date' className='form__field' ></input>
                    </div>
                    <div>
                        <label htmlFor='details' className='edit-text'>التفاصيل</label>
                        <input name='details' type='text' className='form__field'></input>
                    </div>
                    
                    
                </form>
                <div>
                        <button  className='btn btn-add' onClick={addCalander} >انشاء</button>
                </div>
                <button  className='btn btn-add'onClick={addDetails} >اضافة</button>
            </section>

            <section className='semestar'>
                <header>
                    <h4>الفصل الدراسي الأول</h4>
                </header>
                <table className='sem-table'>
                    <thead>
                        <tr>
                            <th><h4>التاريخ الميلادي</h4></th>
                            <th><h4>التفاصيل</h4></th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            sem1.map(e => {
                                return(
                                    <tr key={e.Id}>
                                        <td>{e.date}</td>
                                        <td>{e.details}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </section>
 
            {/* SECOND SEMESTER */}
            <section className='semestar'>
                <header>
                    <h4>الفصل الدراسي الثاني</h4>
                </header>
                <table className='sem-table'>
                    <thead>
                        <tr>
                            <td><h4>التاريخ الميلادي</h4></td>
                            <td><h4>التفاصيل</h4></td>

                        </tr>
                    </thead>
                    <tbody>
                    {
                            sem2.map(e => {
                                return(
                                    <tr key={e.Id}>
                                        <td>{e.date}</td>
                                        <td>{e.details}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </section>
        </div>
    )
}




export default CalanderEmp;