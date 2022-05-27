import '../../css/student/scheduleSt.css';

let department = 'هندسة حاسوب';
let level = 'مستوى رابع';
let semstire = 'الفصل الدراسي الأول'

let schedule = [
    {
        id: 1,
        day: 'الأحد',
        subjects: [
            {
                id: 101,
                name: 'Computer Graphics',
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
                time: '8AM - 10AM',
                place: 'B204'
            },
            {
                id: 202,
                name: 'Engineering Economics & Management',
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
                time: '8AM - 10AM',
                place: 'Lab B2'
            },
            {
                id: 402,
                name: 'Computer Graphics',
                time: '10AM - 12PM',
                place: 'Lab C1'
            },
            {
                id: 403,
                name: 'Microprocessor Interface',
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
                time: '8AM - 11AM',
                place: 'C202'
            },
            {
                id: 502,
                name: 'DSP',
                time: '11AM - 1PM',
                place: 'C202'
            },
        ]
    },
]

const ScheduleSt = () => {
    return (
        <div className="container-schedule container-page container">
            <header className="header">
                <h2>جدول المحاضرات</h2>
                <h3>{department} - {level} - {semstire}</h3>
            </header>
            <table className='schedule'>
                {
                    schedule.map(e => {
                        return (
                            <tr className='day' key={e.id}>
                                <th><h4>{e.day}</h4></th>
                                {
                                    e.subjects.map(e => {
                                        return (
                                            <td className='subject' key={e.id}>
                                                <h4>{e.name}</h4>
                                                <p>{e.time}</p>
                                                <p>{e.place}</p>
                                            </td>
                                        )
                                    })
                                }
                            </tr>
                        )
                    })
                }
            </table>
        </div>
    );
}

export default ScheduleSt;