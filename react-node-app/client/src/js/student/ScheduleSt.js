import React from 'react';
import { useState } from 'react';
import '../../css/student/scheduleSt.css';
import { useUser } from '../DataProvider';




/*let schedule = [
    {
        id: 1,
        day: 'الأحد',
        subjects: [
            {
                id: 101,
                name: 'Computer Graphics',
                prof: 'د. رشا بن ثعلب',
                time: '8AM - 10AM',
                place: 'D203'
            },
        ]
    },
    {
        id: 2,
        day: 'الإثنين',
        subjects: [
            {
                id: 201,
                name: 'Microprocessor Interface',
                prof: 'د. عبدالله باحسن',
                time: '8AM - 10AM',
                place: 'B204'
            },
            {
                id: 202,
                name: 'Engineering Economics & Management',
                prof: 'أ. روينا',
                time: '10AM - 12PM',
                place: 'C202'
            },
        ]
    },
    {
        id: 3,
        day: 'الثلاثاء',
        subjects: [
            {
                id: 301,
                name: 'Course Project',
                time: '',
                place: ''
            },
        ]
    },
    {
        id: 4,
        day: 'الأربعاء',
        subjects: [
            {
                id: 401,
                name: 'Computer Network 1',
                prof: 'م. فاطمة بافرج',
                time: '8AM - 10AM',
                place: 'Lab B2'
            },
            {
                id: 402,
                name: 'Computer Graphics',
                prof: 'م. صفاء جوهر',
                time: '10AM - 12PM',
                place: 'Lab C1'
            },
            {
                id: 403,
                name: 'Microprocessor Interface',
                prof: 'م. عصمت',
                time: '12PM - 2PM',
                place: 'Lab D2'
            },
        ]
    },
    {
        id: 5,
        day: 'الخميس',
        subjects: [
            {
                id: 501,
                name: 'Computer Network 1',
                prof: 'د. مكارم بامطرف',
                time: '8AM - 11AM',
                place: 'C202'
            },
            {
                id: 502,
                name: 'DSP',
                prof: 'د. خالد فوزي',
                time: '11AM - 1PM',
                place: 'C202'
            },
        ]
    },
]*/

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
        .then(data => setSchedule(data.subjects))
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