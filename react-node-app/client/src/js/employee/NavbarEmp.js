import { Link } from 'react-router-dom';
import '../../css/student/navbarSt.css';
import logo from '../../images/HUGLogo.png';
import avatar from '../../images/avatar.png';
import { useUser } from '../DataProvider';


const NavbarEmp = () => {
    const employee = useUser();

    const logOut = () => {
        const logoutBtn = document.getElementById('logoutBtn');

        logoutBtn.addEventListener('click', () => {
            window.location.replace('/');
            window.sessionStorage.clear();
        })
    }

    return (
        <nav className="navbar">
            <ul className='list-emp'>
                <li className='home-written'><Link to='/employee'>الرئيسية</Link></li>
                <li className='home-icon'><Link to='/employee'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M575.8 255.5C575.8 273.5 560.8 287.6 543.8 287.6H511.8L512.5 447.7C512.5 450.5 512.3 453.1 512 455.8V472C512 494.1 494.1 512 472 512H456C454.9 512 453.8 511.1 452.7 511.9C451.3 511.1 449.9 512 448.5 512H392C369.9 512 352 494.1 352 472V384C352 366.3 337.7 352 320 352H256C238.3 352 224 366.3 224 384V472C224 494.1 206.1 512 184 512H128.1C126.6 512 125.1 511.9 123.6 511.8C122.4 511.9 121.2 512 120 512H104C81.91 512 64 494.1 64 472V360C64 359.1 64.03 358.1 64.09 357.2V287.6H32.05C14.02 287.6 0 273.5 0 255.5C0 246.5 3.004 238.5 10.01 231.5L266.4 8.016C273.4 1.002 281.4 0 288.4 0C295.4 0 303.4 2.004 309.5 7.014L564.8 231.5C572.8 238.5 576.9 246.5 575.8 255.5L575.8 255.5z"/></svg></Link></li>
            </ul>
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
                            <p>{employee.name}</p>
                            <p>{employee.department}</p>
                        </section>
                        <Link id='logoutBtn' className='btn' to='/' onClick={logOut}>تسجيل الخروج</Link>
                    </div>
                </div>
                
                {/* navigation */}
                <div className='navigation-list icon-list'>
                    <svg className='navigation-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M256 32V51.2C329 66.03 384 130.6 384 208V226.8C384 273.9 401.3 319.2 432.5 354.4L439.9 362.7C448.3 372.2 450.4 385.6 445.2 397.1C440 408.6 428.6 416 416 416H32C19.4 416 7.971 408.6 2.809 397.1C-2.353 385.6-.2883 372.2 8.084 362.7L15.5 354.4C46.74 319.2 64 273.9 64 226.8V208C64 130.6 118.1 66.03 192 51.2V32C192 14.33 206.3 0 224 0C241.7 0 256 14.33 256 32H256zM224 512C207 512 190.7 505.3 178.7 493.3C166.7 481.3 160 464.1 160 448H288C288 464.1 281.3 481.3 269.3 493.3C257.3 505.3 240.1 512 224 512z"/></svg>
                    <div className='navigations'>
                        لا يوجد تنبيهات
                    </div>
                </div>
            </section>
        </nav>
    );
}

export default NavbarEmp;