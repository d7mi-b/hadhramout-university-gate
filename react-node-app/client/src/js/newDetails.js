import '../css/newDetails.css';
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useNews } from './DataProvider';
// import new1 from '../images/new1.jpg';
// import new2 from '../images/new2.jpg';
// import new3 from '../images/new3.jpg';
import React from 'react';


const NewDetails = () => {
    const { id } = useParams();
    const news = useNews();
    let e;
    
    /* const j= fetch(`/news/${id}`,{
            method:'GET',        
        })
        .then(res => res.json())
        .then(data =>{console.log(data) 
        e=data})
        .catch(err => console.log(err))*/
    
   /*const get_data= async () => {
    try {
        const res = fetch(`/news/${id}`,{
            method:'GET',        
        })
        const data = await res.json();
        console.log(data)
        e = data;
    }
    catch(err) {

    }
   }

   get_data()*/
   /*React.useEffect(() => {
    get_data()    
    }, [])*/

    return (
        <div className="new-details-page">
            {
                //news.map((e)=> {
                    //if (id === e._id) {
                        //return (
                            <article className="new-details">
                                <div className="image">
                                    
                                </div>
                                <header>
                                    <h1 className="title">{e.title}</h1>
                                    <time dateلإime={e.dateNo} className="date">{e.date}</time>
                                </header>
                                <section className='body'>{e.body}</section>
                            </article>
                        //)
                    //}
                //})
            }
        </div>
    );
}

export default NewDetails;