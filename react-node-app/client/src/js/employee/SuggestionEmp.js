import {useEffect, useState} from 'react';
import '../../css/employee/suggestionEmp.css';

const types = [
    {
        id: 1,
        label: 'إقتراح'
    },
    {
        id: 2,
        label: 'شكوى'
    }
]

const SuggestionEmp = () => {
    const [suggestion, setSuggestion] = useState([]);
    const [type, setType] = useState('إقتراح');
    const [pages, setPage] = useState(0);

    const handelPages = (e) => {
        setPage(pages + 1)
    }

    const handelChangeType = (e) => {
        setType(e.target.value);
    }

    useEffect(() => {
        fetch('/suggestion/get-all?'  + new URLSearchParams({
            page: +pages,
        }))
            .then(res => res.json())
            .then(data => setSuggestion(data));
    }, []);

    return (
        <div className='container container-page'>
            <header className='header'>
                <h2>الشكاوى والإقتراحات</h2>
            </header>

            <section className='choose-type'>
                <label htmlFor='type'>النوع</label>
                <select name='type' onChange={handelChangeType}>
                    {
                        types.map(e => {
                            return(
                                <option key={e.id}>{e.label}</option>
                            )
                        })
                    }
                </select>
            </section>

            <section className='suggestion-container'>
                {
                    suggestion.map(e => {
                        if(type === e.type)
                        return (
                            <article className='suggestion' key={e._id}>
                                <header>
                                    <h3>{e.type}</h3>
                                </header>
                                <section>المحتوى: {e.body}</section>
                                <section className='student-info'>
                                    <p>المرسل: </p>
                                    <p>{e.username}</p>
                                    <p>{e.name}</p>
                                    <p>{e.department}</p>
                                    <p>{e.level}</p>
                                </section>
                            </article>
                        )
                    })
                }
            </section>
            {
                suggestion.length >= 5 &&
                <section className='pages'>
                    <button className='btn' onClick={handelPages}>المزيد...</button>
                </section>
            }
        </div>
    );
}
 
export default SuggestionEmp;