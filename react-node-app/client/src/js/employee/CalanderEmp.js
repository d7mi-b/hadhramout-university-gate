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

    const getDate = (e) => {
        const year1 = new Date(e).getFullYear();
        const month = new Date(e).getMonth();
        const day = new Date(e).getDate();
    
        return `${year1}-${month}-${day}`;
    }

    

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
                if(details!==''){
                    addDetails()
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
                    setId(result)
                    setSem1([]);
                    setSem2([]);
                    console.log(result)
                    if(details!==''){
                        addDetails()
                    }
                    })
                .catch(err => console.log(err))
            }
        })
        .catch(err => console.log(err))

         
    }

    const hijri = (date) => {
        var now = date;
        var dayOfYear = Math.floor((new Date() - new Date(new Date(now).getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24))
        var hijriDate = ((new Date(now).getFullYear()-621.5643)*365.24225 + dayOfYear) / 354.36707
        var hijriYear = Math.floor(hijriDate)
        var hijriMonth = Math.ceil((hijriDate - Math.floor(hijriDate)) * 354.36707 / 29.530589)
        var hijriDay = Math.floor((hijriDate - Math.floor(hijriDate)) * 354.36707 % 29.530589)

        return `${hijriYear}-${hijriMonth}-${hijriDay-2}`;
    }
    
    function GetHijriDate(dateTime) {    
        var dayOfYear = Math.floor((new Date(dateTime) - new Date(new Date(dateTime).getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24))
        var hijriDate = ((new Date(dateTime).getFullYear() - 621.5643) * 365.24225 + dayOfYear) / 354.36707
        var hijriYear = Math.floor(hijriDate)
        var hijriMonth = Math.ceil((hijriDate - Math.floor(hijriDate)) * 354.36707 / 29.530589)
        var hijriDay = Math.floor((hijriDate - Math.floor(hijriDate)) * 354.36707 % 29.530589)
        return `${hijriYear}-${hijriMonth}-${hijriDay}`
    }

    const addDetails = (e) => {
        
        const form = document.getElementById('cal-form')
        const date = form.date.value;
        const details = form.details.value;
        const Id = Math.random();
        const hijridate = GetHijriDate(date);
    

        fetch(`/calander/${id}`,{
            method:'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({date, details, semester, Id, hijridate})
        })
        .then(res => res.json())
        .then(result => {
            setSem1(result.semester1)
            setSem2(result.semester2)
    
        })
        .catch(err => console.log(err))
        form.details.value = '';
        form.date.value = ''
        addCalander();
    }

    const deleteDet = (e,i) => {
        fetch(`/calander/deleteDet/${id}`,{
            method: 'PATCH',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({Id: e, sem:i}) 
            })
            .then(res =>addCalander())
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
                        <input name='date' type='date' className='form__field data' ></input>
                    </div>
                    <div>
                        <label htmlFor='details' className='edit-text'>التفاصيل</label>
                        <input name='details' type='text' className='form__field data'></input>
                    </div>
                </form>
                <div className='btn-add'>
                        <button  className='btn btn-add' onClick={addCalander} >اضافة</button>
                </div>
                
                
            </section>

            <section className='semestar'>
                <header>
                    <h4>الفصل الدراسي الأول</h4>
                </header>
                <table className='sem-table'>
                    <thead>
                        <tr>
                            <th><h4>التاريخ الميلادي</h4></th>
                            <th><h4>التاريخ الهجري</h4></th>
                            <th><h4>التفاصيل</h4></th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            sem1 &&
                            sem1.map(e => {
                                return(
                                    <tr key={e.Id}>
                                        <td><time dateTime={getDate(e.date)} className="new-date">{e.date}</time></td>
                                        <td><time dateTime={e.hijridate} className="new-date">{e.hijridate}</time></td>
                                        <td>{e.details}</td>
                                        <td className='deletebtn'>
                                            <div className='delete icons'>
                                                <svg className='delete-icon' onClick={() => deleteDet(e.Id,"sem1")} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z"/></svg>
                                            </div> 
                                        </td>
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
                            <th><h4>التاريخ الميلادي</h4></th>
                            <th><h4>التاريخ الهجري</h4></th>
                            <th><h4>التفاصيل</h4></th>

                        </tr>
                    </thead>
                    <tbody>
                    {
                            sem2 &&
                            sem2.map(e => {
                                return(
                                    <tr key={e.Id}>
                                        <td>{e.date}</td>
                                        <td>{e.hijridate}</td>
                                        <td>{e.details}</td>
                                        <td className='deletebtn'>
                                            <div className='delete icons'>
                                                <svg className='delete-icon' onClick={() => deleteDet(e.Id)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z"/></svg>
                                            </div>
                                        </td> 
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