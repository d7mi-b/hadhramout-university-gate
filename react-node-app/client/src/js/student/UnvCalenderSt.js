import React from 'react';
import '../../css/student/unClanderSt.css'
import { useState } from 'react';

const getDate = (e) => {
    const year = new Date(e).getFullYear();
    const month = new Date(e).getMonth();
    const day = new Date(e).getDate();

    return `${year}-${month}-${day}`;
}

const UnCalenderSt = () => {
    const [sem1, setSem1] = useState([])
    const [sem2, setSem2] = useState([])
    const [year, setYear] = useState()

    React.useEffect(() => {
        fetch(`/calander/last`)
        .then(res => res.json())
        .then(result => 
        {
            setSem1(result.semester1)
            setSem2(result.semester2)
            setYear(result.year)
        })
        .catch(err => console.log(err))
    },[])
    return (
        <div className="container-page container">
            <header className='header'>
                <h2>التقويم الجامعي {year}</h2>
            </header>

            {/* FIRST SEMESTER */}
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
                                        <td>{getDate(e.date)}</td>
                                        <td>{e.hijridate}</td>
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
                                        <td>{getDate(e.date)}</td>
                                        <td>{e.hijridate}</td>
                                        <td>{e.details}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </section>

            {/* NOTES */}
            
        </div>
    );
}

export default UnCalenderSt;
