import { Link } from 'react-router-dom';
import '../../css/student/newsSt.css'
import { useNews } from '../DataProvider';

const getDate = (e) => {
    const year = new Date(e).getFullYear();
    const month = new Date(e).getMonth();
    const day = new Date(e).getDate();

    return `${year}-${month}-${day}`;
}

const NewsST = () => {
    let news = useNews();

    return (
        <section className="news news-page container-page container">
            <header className='header'>
                <h2>الأخبار</h2>
            </header>
            <div className="news-container">
                {
                    news.map((e) => {
                        return (
                            <article className="new" key={e._id}>
                                <div className="image">
                                    
                                </div>
                                <section>
                                    <header>
                                        <h3>{e.title.slice(0, 70)}..</h3>
                                    </header>
                                    <p>{e.body.slice(0, 120)}...</p>
                                    <time dateTime={getDate(e.date)} className="new-date">{getDate(e.date)}</time>
                                    <Link to={`/details/${e._id}`}>قراءة المزيد</Link>
                                </section>
                            </article>
                        );
                    })
                }
            </div>
        </section>
    );
}

export default NewsST;
