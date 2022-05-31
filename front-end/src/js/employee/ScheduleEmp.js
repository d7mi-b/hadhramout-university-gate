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

let schedules = [
    {
        id: 1,
        departement: 'هندسة حاسوب',
        levels: [
            {
                id: 11,
                level: 'المستوى الأول',
                semesters: [
                    {
                        id: 111,
                        semester: 'الفصل الدراسي الأول',
                        schedule: [
                            
                        ]
                    },
                    {
                        id: 112,
                        semester: 'الفصل الدراسي الثاني',
                        schedule: [
                            {
                                id: 1121,
                                day: 'الأحد',
                                subjects: [
                                    {
                                        id: 101,
                                        name: 'Integral Calclus',
                                        prof: 'أ. محمد بافقيه',
                                        time: '8AM - 10AM',
                                        place: 'A204'
                                    },
                                    {
                                        id: 102,
                                        name: 'Physics 2',
                                        time: '10AM - 12PM',
                                        place: 'A204'
                                    },
                                ]
                            },
                            {
                                id: 1122,
                                day: 'الإثنين',
                                subjects: [
                                    {
                                        id: 201,
                                        name: 'Islamic Culture 2',
                                        prof: 'د. رشيد بامعص',
                                        time: '8AM - 10AM',
                                        place: 'B204'
                                    },
                                    {
                                        id: 202,
                                        name: 'Arabic Language 2',
                                        time: '10AM - 12PM',
                                        place: 'C202'
                                    },
                                    {
                                        id: 203,
                                        name: 'English Language 2',
                                        prof: 'أ. نايف بن همام',
                                        time: '12PM - 2PM',
                                        place: 'C202'
                                    },
                                ]
                            },
                            {
                                id: 1123,
                                day: 'الثلاثاء',
                                subjects: [
                                    {
                                        id: 301,
                                        name: 'Computer Programming',
                                        prof: 'د. سهام بامطرف',
                                        time: '8AM - 10AM',
                                        place: 'C202'
                                    },
                                    {
                                        id: 302,
                                        name: 'Physics 2',
                                        time: '10AM - 12PM',
                                        place: 'Lab'
                                    },
                                    {
                                        id: 303,
                                        name: 'Computer Programming Tutorial',
                                        prof: 'م. غذوان باوزير',
                                        time: '12PM - 1PM',
                                        place: 'C201'
                                    },
                                ]
                            },
                            {
                                id: 1124,
                                day: 'الأربعاء',
                                subjects: [
                                    {
                                        id: 401,
                                        name: 'Computer Programming',
                                        prof: 'م. غذوان باوزير',
                                        time: '8AM - 10AM',
                                        place: 'Lab C2'
                                    },
                                ]
                            },
                            {
                                id: 1415,
                                day: 'الخميس',
                                subjects: [
                                    {
                                        id: 501,
                                        name: 'Integral Calculus',
                                        prof: 'أ. محمد بافقيه',
                                        time: '8AM - 10AM',
                                        place: 'A204'
                                    },
                                    {
                                        id: 502,
                                        name: 'Introduction to Computer Engineering',
                                        prof: 'د. عزت السعدي',
                                        time: '10AM - 12PM',
                                        place: 'A204'
                                    },
                                ]
                            },
                        ]
                    }
                ]
            },
            {
                id: 12,
                level: 'المستوى الثاني',
                semesters: [
                    {
                        id: 121,
                        semester: 'الفصل الدراسي الأول',
                        schedule: [
                            
                        ]
                    },
                    {
                        id: 122,
                        semester: 'الفصل الدراسي الثاني',
                        schedule: [
                            
                        ]
                    }
                ]
            },
            {
                id: 13,
                level: 'المستوى الثالث',
                semesters: [
                    {
                        id: 131,
                        semester: 'الفصل الدراسي الأول',
                        schedule: [
                            
                        ]
                    },
                    {
                        id: 132,
                        semester: 'الفصل الدراسي الثاني',
                        schedule: [
                            
                        ]
                    }
                ]
            },
            {
                id: 14,
                level: 'المستوى الرابع',
                semesters: [
                    {
                        id: 141,
                        semester: 'الفصل الدراسي الأول',
                        schedule: [
                            {
                                id: 1411,
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
                                id: 1412,
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
                                id: 1413,
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
                                id: 1414,
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
                                id: 1415,
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
                        ]
                    },
                    {
                        id: 142,
                        semester: 'الفصل الدراسي الثاني',
                        schedule: [
                            {
                                id: 1421,
                                day: 'الأحد',
                                subjects: [
                                    {
                                        id: 101,
                                        name: 'Artificial Intelligence',
                                        prof: 'د. رشا بن ثعلب',
                                        time: '8AM - 10AM',
                                        place: 'C202'
                                    },
                                    {
                                        id: 102,
                                        name: 'Computer Network 2',
                                        prof: 'د. مكارم بامطرف',
                                        time: '10AM - 1PM',
                                        place: 'C202'
                                    },
                                ]
                            },
                            {
                                id: 1422,
                                day: 'الإثنين',
                                subjects: [
                                    {
                                        id: 201,
                                        name: 'VLSI Circuit Design',
                                        prof: 'م. وفاء إدريس',
                                        time: '8AM - 10AM',
                                        place: 'Lab C1'
                                    },
                                    {
                                        id: 202,
                                        name: 'Artificial Intelligence',
                                        prof: 'م. عصمت',
                                        time: '10AM - 12PM',
                                        place: 'Lab C2'
                                    },
                                ]
                            },
                            {
                                id: 1423,
                                day: 'الثلاثاء',
                                subjects: [
                                    {
                                        id: 301,
                                        name: 'Data Security',
                                        prof: 'م. فاطمة بافرج',
                                        time: '8AM - 10AM',
                                        place: 'Arch. Lab'
                                    },
                                    {
                                        id: 302,
                                        name: 'Real-Time Computer Control & PLC',
                                        prof: 'م. علاء باسواقي',
                                        time: '10AM - 12PM',
                                        place: 'Lab'
                                    },
                                ]
                            },
                            {
                                id: 1424,
                                day: 'الأربعاء',
                                subjects: [
                                    {
                                        id: 401,
                                        name: 'Computer Network 2',
                                        prof: 'م. فاطمة بافرج',
                                        time: '8AM - 10AM',
                                        place: 'Lab'
                                    },
                                ]
                            },
                            {
                                id: 1425,
                                day: 'الخميس',
                                subjects: [
                                    {
                                        id: 501,
                                        name: 'VLSI Circuit Design',
                                        prof: 'د. خالد فوزي',
                                        time: '8AM - 10AM',
                                        place: 'C201'
                                    },
                                    {
                                        id: 502,
                                        name: 'Data Security',
                                        prof: 'د. مكارم بامطرف',
                                        time: '10AM - 12PM',
                                        place: 'C201'
                                    },
                                    {
                                        id: 503,
                                        name: 'Real-Time Computer Control & PLC',
                                        prof: 'م. علاء باسواقي',
                                        time: '12AM - 2PM',
                                        place: 'C201'
                                    },
                                ]
                            },
                        ]
                    }
                ]
            },
            {
                id: 15,
                level: 'المستوى الخامس',
                semesters: [
                    {
                        id: 151,
                        semester: 'الفصل الدراسي الأول',
                        schedule: [
                            
                        ]
                    },
                    {
                        id: 152,
                        semester: 'الفصل الدراسي الثاني',
                        schedule: [
                            
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 2,
        departement: 'هندسة إلكترونية',
        levels: [
            {
                id: 21,
                level: 'المستوى الأول',
                semesters: [
                    {
                        id: 211,
                        semester: 'الفصل الدراسي الأول',
                        schedule: [
                            
                        ]
                    },
                    {
                        id: 212,
                        semester: 'الفصل الدراسي الثاني',
                        schedule: [
                            
                        ]
                    }
                ]
            },
            {
                id: 22,
                level: 'المستوى الثاني',
                semesters: [
                    {
                        id: 221,
                        semester: 'الفصل الدراسي الأول',
                        schedule: [
                            
                        ]
                    },
                    {
                        id: 222,
                        semester: 'الفصل الدراسي الثاني',
                        schedule: [
                            
                        ]
                    }
                ]
            },
            {
                id: 23,
                level: 'المستوى الثالث',
                semesters: [
                    {
                        id: 231,
                        semester: 'الفصل الدراسي الأول',
                        schedule: [
                            
                        ]
                    },
                    {
                        id: 232,
                        semester: 'الفصل الدراسي الثاني',
                        schedule: [
                            
                        ]
                    }
                ]
            },
            {
                id: 24,
                level: 'المستوى الرابع',
                semesters: [
                    {
                        id: 241,
                        semester: 'الفصل الدراسي الأول',
                        schedule: [
                            
                        ]
                    },
                    {
                        id: 242,
                        semester: 'الفصل الدراسي الثاني',
                        schedule: [
                            
                        ]
                    }
                ]
            },
            {
                id: 25,
                level: 'المستوى الخامس',
                semesters: [
                    {
                        id: 251,
                        semester: 'الفصل الدراسي الأول',
                        schedule: [
                            
                        ]
                    },
                    {
                        id: 252,
                        semester: 'الفصل الدراسي الثاني',
                        schedule: [
                            
                        ]
                    }
                ]
            }
        ]
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

const ScheduleEmp = () => {
    const [departement, setdepartement] = useState(departements[0].label)
    const [level, setLevel] = useState(levels[0].label);
    const [semester, setSemester] = useState(semesters[1].label);
    const [group1, setgroup1] = useState(groubs1[0].label);
    const [group2, setgroup2] = useState(groubs2[0].label);

    const handelchangeDep = e => {
        setdepartement(e.target.value);
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

        console.log(btnAddSubj)

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

    useEffect(handelContent)
    
    return (
        <div className="container-schedule container-page container">
            <header className="header">
                <h2>جدول المحاضرات</h2>
            </header>

            <section className="choose-sechedule choose-data">
                <form action="#" method="POST">
                    <div>
                        <label for='departement'>القسم</label>
                        <select name="departement" className="departement" value={departement} onChange={handelchangeDep} >
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
                        <label for='level'>المستوى</label>
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
                        <label for='semester'>الفصل الدراسي</label>
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
                        <label for='group2'>المسار</label>
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
                        <label for='group1'>المجموعة</label>
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
            </section>

            <table className='schedule'>
                {
                    schedules.map(e => {
                        if (e.departement === departement)
                            return e.levels.map(e1 => {
                                if (e1.level === level)
                                    return e1.semesters.map(e2 => {
                                        if (e2.semester === semester)
                                            return e2.schedule.map(e3 => {
                                                return (
                                                    <tr className='day' key={e3.id}>
                                                        <th><h4>{e3.day}</h4></th>
                                                        {
                                                            e3.subjects.map((e4, i, arr) => {
                                                                return (
                                                                    <td className='subject subject-emp' key={e4.id}>
                                                                        <p className='bold'>{e4.name}</p>
                                                                        <p>{e4.prof}</p>
                                                                        <p>{e4.time}</p>
                                                                        <p className='place'>{e4.place}</p>
                                                                        <div className='delete icons'>
                                                                            <svg className='delete-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z"/></svg>
                                                                        </div>
                                                                    </td>
                                                                )
                                                            })
                                                        }
                                                    </tr>
                                                )}
                                            )
                                    })
                            }) 
                    })
                }
                <tr>
                    <td className='add-subject-icon icons' id='add-subject-icon' colSpan='5' onClick={handelContent}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM256 368C269.3 368 280 357.3 280 344V280H344C357.3 280 368 269.3 368 256C368 242.7 357.3 232 344 232H280V168C280 154.7 269.3 144 256 144C242.7 144 232 154.7 232 168V232H168C154.7 232 144 242.7 144 256C144 269.3 154.7 280 168 280H232V344C232 357.3 242.7 368 256 368z"/></svg>
                    </td>
                </tr>
            </table>
            
            <div className='background-section add-subject'>
                <section className='pay-section'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M160 32V64H288V32C288 14.33 302.3 0 320 0C337.7 0 352 14.33 352 32V64H400C426.5 64 448 85.49 448 112V160H0V112C0 85.49 21.49 64 48 64H96V32C96 14.33 110.3 0 128 0C145.7 0 160 14.33 160 32zM0 192H448V464C448 490.5 426.5 512 400 512H48C21.49 512 0 490.5 0 464V192zM80 256C71.16 256 64 263.2 64 272V368C64 376.8 71.16 384 80 384H176C184.8 384 192 376.8 192 368V272C192 263.2 184.8 256 176 256H80z"/></svg>
                    <h4>إضافة مادة</h4>
                    <section className='data-subject'>
                        <form action='#' method='POST'>
                            <div>
                                <label for='name-subj'>إسم المادة</label>
                                <input name='name-subj' type='text' />
                            </div>
                            <div>
                                <label for='prof'>الدكتور</label>
                                <input name='prof' type='text' />
                            </div>
                            <div>
                                <label for='time-from'>من</label>
                                <input className='time' name='time-from' type='text' />
                                <label for='time-to'>إلى</label>
                                <input className='time' name='time-to' type='text' />
                            </div>
                            <div>
                                <label for='place'>القاعة</label>
                                <input name='place' type='text' />
                            </div>
                        </form>
                    </section>
                    <div className='buttons'>
                        <button className='btn' id='add' >إضافة</button>
                        <button className='btn' id='cancel'>إلغاء</button>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default ScheduleEmp;