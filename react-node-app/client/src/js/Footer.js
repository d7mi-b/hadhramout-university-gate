import '../css/footer.css'
import {useUser} from './DataProvider';
import {Link} from 'react-router-dom';

const Footer = () => {
    const user = useUser();
    return (
        <footer className="footer">
            {
                !user.position &&
                <Link to='/suggestions-submet'>للشكاوى والإقتراحات على المنصة</Link>
            }
            <section className='copyright'>
                <h3>بوابة جامعة حضرموت</h3>
                <p>جميع الحقوق محفوظة &copy; 2022 - المجموعة السابعة - هندسة حاسوب مستوى رابع</p>
            </section>
        </footer>
    );
}

export default Footer;