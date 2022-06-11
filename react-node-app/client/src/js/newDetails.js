import '../css/newDetails.css';
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useNews } from './DataProvider';
// import new1 from '../images/new1.jpg';
// import new2 from '../images/new2.jpg';
// import new3 from '../images/new3.jpg';



const NewDetails = () => {
    const { id } = useParams();
    const news = useNews();

    return (
        <div className="new-details-page">
            {
                news.map((e)=> {
                    if (+id === e._id) {
                        return (
                            <article className="new-details">
                                <div className="image">
                                    <img src={e.image} alt="" />
                                </div>
                                <header>
                                    <h1 className="title">{e.title}</h1>
                                    <time datetime={e.dateNo} className="date">{e.date}</time>
                                </header>
                                <section className='body'>{e.body}</section>
                            </article>
                        )
                    }
                })
            }
        </div>
    );
}

export default NewDetails;