import '../../css/student/navbarSt.css'
import logo from '../../images/HUGLogo.png';
import avatar from '../../images/avatar.png';
import { Link } from 'react-router-dom';
import { useUser } from '../DataProvider';
import { useEffect } from 'react';

const getDate = (e) => {
    const year = new Date(e).getFullYear();
    const month = new Date(e).getMonth();
    const day = new Date(e).getDate();

    return `${year}-${month}-${day}`;
}

function getTime(e) {
    var hours = new Date(e).getHours();
    var minutes = new Date(e).getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;

    return `${hours}:${minutes} ${ampm}`;
}

const NavbarSt = () => {
    const student = useUser();

    const logOut = () => {
        const logoutBtn = document.getElementById('logoutBtn');

        logoutBtn.addEventListener('click', () => {
            window.location.replace('/');
            window.sessionStorage.clear();
        })
    }

    const handelStateNotf = (e) => {
        const id = e.target.id;
        
        if (document.getElementById(`${id}`).classList.contains('new-notify')) {
            document.getElementById(`${id}`).classList.remove('new-notify')

            fetch('/stateNotification', {
                method: "PATCH",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    username: student.username,
                    id: id
                })
            })
            .then(res => res )
            .catch(err => console.log(err))
        }

    }

    useEffect(() => {
        logOut();

        student.notification.some((e, i) => {
            if (e.new === true && i < 25) {
                document.querySelector('.new-notification').style.cssText = "display: block";
                document.getElementById(`${e.id}`).classList.add('new-notify')
            }
        });

        if (student.notification.length > 5) {
            document.querySelector('.navigations').style.cssText = 'height: 435px; overflow-y: scroll;';
        }
    }, [student.notification])
    
    return (
        <nav className="navbar">

            <div className='list-section'>
                <div className='list-bar'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM64 256C64 238.3 78.33 224 96 224H480C497.7 224 512 238.3 512 256C512 273.7 497.7 288 480 288H96C78.33 288 64 273.7 64 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z"/></svg>
                </div>

                <ul className='list'>
                    <li><Link to='/home'>الرئيسية</Link></li>

                    {/* SERVICES LIST */}
                    <li className='services'>
                        <header>الخدمات </header>
                        <ul className='services-list nav-list'>
                            <li><Link to='/renew'>القيد</Link></li>
                            <li><Link to='/degree-statement'>بيان درجات</Link></li>
                            <li><Link to='/grievance-up'>رفع تظلم</Link></li>
                        </ul>
                    </li>

                    {/* SCHEDULES LIST */}
                    <li className='schedules'>
                        <header>الجداول</header>
                        <ul className='schedules-list nav-list'>
                            <li><Link to='/schedule'>جدول المحاضرات</Link></li>
                            <li><Link to='/calender'>التقويم الجامعي</Link></li>
                        </ul>
                    </li>
                </ul>
            </div>

            <section className='icons'>
                <img src={logo} alt='HUG' />

                {/* profile */}
                <div className='profile-list icon-list'>
                    <svg className='profile-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"/></svg>
                    <div className='profile'>
                        <section className='avatar'>
                            <img src={avatar} alt='avatar' />
                        </section>
                        <section className='info'>
                            <p>{student.name}</p>
                            <p>{student.department}</p>
                            <p>{student.level}</p>
                        </section>
                        <div className='wallet wallet-pro'>
                            <svg className='wallet-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M448 32C465.7 32 480 46.33 480 64C480 81.67 465.7 96 448 96H80C71.16 96 64 103.2 64 112C64 120.8 71.16 128 80 128H448C483.3 128 512 156.7 512 192V416C512 451.3 483.3 480 448 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H448zM416 336C433.7 336 448 321.7 448 304C448 286.3 433.7 272 416 272C398.3 272 384 286.3 384 304C384 321.7 398.3 336 416 336z"/></svg>
                            <div className='wallet-balance'>
                                : {student.wallet}
                            </div>
                        </div>
                        <section className='edit-info'>
                            <Link to='/edit-info'>تعديل المعلومات</Link>
                        </section>
                        <Link id='logoutBtn' className='btn' to='/' onClick={logOut}>تسجيل الخروج</Link>
                    </div>
                </div>

                {/* navigation */}
                <div className='navigation-list icon-list'>
                    <div className='new-notification'></div>
                    <svg className='navigation-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M256 32V51.2C329 66.03 384 130.6 384 208V226.8C384 273.9 401.3 319.2 432.5 354.4L439.9 362.7C448.3 372.2 450.4 385.6 445.2 397.1C440 408.6 428.6 416 416 416H32C19.4 416 7.971 408.6 2.809 397.1C-2.353 385.6-.2883 372.2 8.084 362.7L15.5 354.4C46.74 319.2 64 273.9 64 226.8V208C64 130.6 118.1 66.03 192 51.2V32C192 14.33 206.3 0 224 0C241.7 0 256 14.33 256 32H256zM224 512C207 512 190.7 505.3 178.7 493.3C166.7 481.3 160 464.1 160 448H288C288 464.1 281.3 481.3 269.3 493.3C257.3 505.3 240.1 512 224 512z"/></svg>
                    <section className='navigations'>
                        {
                            student.notification &&
                            student.notification.filter((e, i) => i < 25).map((e, i, arr) => {
                                return (
                                    <section className='navigation' key={e.id} id={e.id} onMouseEnter={handelStateNotf}>
                                        <time dateTime={getDate(e.date)}>
                                            <p>{getDate(e.date)}</p>
                                            <p>{getTime(e.date)}</p>
                                        </time>
                                        <section className='info'>
                                            
                                            <p>
                                                {e.notify}
                                            </p>
                                        </section>
                                    </section>
                                )
                            }).reverse()
                        }
                        {
                            student.notification.length === 0 &&
                            <section className='empty-notification'>
                                لا توجد إشعارات
                            </section>
                        }
                    </section>
                </div>

                {/* wallet */}
                <div className='wallet'>
                    <svg className='wallet-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M448 32C465.7 32 480 46.33 480 64C480 81.67 465.7 96 448 96H80C71.16 96 64 103.2 64 112C64 120.8 71.16 128 80 128H448C483.3 128 512 156.7 512 192V416C512 451.3 483.3 480 448 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H448zM416 336C433.7 336 448 321.7 448 304C448 286.3 433.7 272 416 272C398.3 272 384 286.3 384 304C384 321.7 398.3 336 416 336z"/></svg>
                    <div className='wallet-balance'>
                        : {student.wallet}
                    </div>
                </div>
            </section>

        </nav>
    );
}

export default NavbarSt;