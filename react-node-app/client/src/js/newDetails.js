import '../css/newDetails.css';
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useNews } from './DataProvider';
import { useEffect, useState } from 'react';



const NewDetails = () => {
    const { id } = useParams();
    const [news, setNews] = useState([]);

    useEffect(() => {
        fetch(`/news/${id}`)
            .then((res) => res.json())
            .then((data) => setNews(data));
    }, [])

    return (
        <div className="new-details-page">
            <article className="new-details">
                <div className="image">
                    <img src='' alt="" />
                </div>
                <header>
                    <h1 className="title">{news.title}</h1>
                    <time datetime={news.date} className="date">{news.date}</time>
                </header>
                <section className='body'>{news.body}</section>
            </article>
        </div>
    );
}

export default NewDetails;