import { Link } from 'react-router-dom';
import '../../css/student/navbarSt.css';
import logo from '../../images/HUGLogo.png';
import avatar from '../../images/avatar.jpg';

const NavbarEmp = () => {
    return (
        <nav className="navbar">
            <ul className='list'>
                <li><Link to='/home'>الرئيسية</Link></li>
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
                            <p>عبدالرحمن أحمد بهيان</p>
                            <p>هندسة حاسوب</p>
                            <p>مستوى رابع</p>
                        </section>
                        <a className='btn' href='/'>تسجيل الخروج</a>
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