import '../css/newDetails.css';
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from 'react';

const getDate = (e) => {
    const year = new Date(e).getFullYear();
    const month = new Date(e).getMonth();
    const day = new Date(e).getDate();

    return `${year}-${month}-${day}`;
}

const NewDetails = () => {
    const { id } = useParams();
    const [news, setNews] = useState([]);

    useEffect(() => {
        fetch(`/news/${id}`)
            .then((res) => res.json())
            .then((data) => setNews(data));
    }, [id])

    return (
        <div className="new-details-page">
            <article className="new-details">
                <div className="image">
                    <img src='' alt="" />
                </div>
                <header>
                    <h1 className="title">{news.title}</h1>
                    <time dateTime={getDate(news.date)} className="date">{getDate(news.date)}</time>
                </header>
                <section className='body'>{news.body}</section>
            </article>
        </div>
    );
}

export default NewDetails;
