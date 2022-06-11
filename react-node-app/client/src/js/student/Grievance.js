import '../../css/student/grievance.css';

const subjects = [
    {
        id:21,
        name: 'رياضيات 4',
        hours: 3,
        degree: 100,
        points: 2,
        grade: 'جيد',
    },
    {
        id:22,
        name: 'هيكلة بيانات',
        hours: 3,
        degree: 124,
        points: 3,
        grade: 'جيد جدًا',
    },
    {
        id:23,
        name: 'تصميم منطقي',
        hours: 4,
        degree: 177,
        points: 3,
        grade: 'جيد جدًا',
    },
    {
        id:24,
        name: 'إشارات ونظم',
        hours: 2,
        degree: 81,
        points: 3,
        grade: 'جيد جدًا',
    },
    {
        id:25,
        name: 'تصميم مواقع الإنترنت',
        hours: 3,
        degree: 143,
        points: 4,
        grade: 'ممتاز',
    },
    {
        id:26,
        name: 'دوائر الكترونية',
        hours: 3,
        degree: 129,
        points: 3,
        grade: 'جيد جدًا',
    },
]

let openTest = subjects.every(e => {
    return e.points > 2
}, 2);

console.log(openTest)

const Grievance = () => {

    const chooseSubject = (e) => {
        if(e.target.classList.contains('subject')) {
            const subject = e.target;
            subject.classList.toggle('choose');
        }
        else if(e.target.parentElement) {
            const subject = e.target.parentElement;
            subject.classList.toggle('choose');
        }
    }

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
                                <article className="subject" key={e.id} onClick={chooseSubject}>
                                    <p className='bold' id='name'>{e.name}</p>
                                    <p id='degree'>الدرجة: {e.degree}</p>
                                    <p id='grade'>التقدير: {e.grade}</p>
                                </article>
                            )
                        })
                    }
                </section>
            </section>
        </div>
    );
}

export default Grievance;