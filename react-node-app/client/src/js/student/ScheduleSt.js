import React from 'react';
import { useState } from 'react';
import '../../css/student/scheduleSt.css';
import { useUser } from '../DataProvider';


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

const ScheduleSt = () => {

    const student = useUser();
    const [schedule, setSchedule] = useState([]);
    const department = student.department;
    const level = student.level;
    const semester = student.semester;
    const group1 = student.group1;
    const group2 = student.group2;

    const getSchedule= () => {

        fetch(`/schedule/${department}/${level}/${semester}/${group1}/${group2}`)
        .then(res => res.json())
        .then(data => {
            
            setSchedule(data.subjects)})
        .catch(err => console.log(err))
    }

    React.useEffect(() => {
        getSchedule();

    }, [])

    return (
        <div className="container-schedule container-page container">
            <header className="header">
                <h2>جدول المحاضرات</h2>
                <h3>{department} - {level} - {semester}</h3>
            </header>
            <table className='schedule'>
                <tbody>
                    {
                        days.map(e => {
                            return (
                                <tr className='day' key={e.id}>
                                    <th><p className='bold'>{e.day}</p></th>
                                    {
                                        
                                        schedule.map(i => {
                                            if (e.day === i.day)
                                           { 
                                               return (
                                                <td className='subject' key={i.Id}>
                                                    <p className='bold'>{i.subject}</p>
                                                    <p>{i.prof}</p>
                                                    <p>{i.time_from}-{i.time_to}</p>
                                                    <p>{i.place}</p>
                                                </td>
                                            )}
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default ScheduleSt;