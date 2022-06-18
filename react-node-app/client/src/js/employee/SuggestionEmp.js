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

    const handelChangeType = (e) => {
        setType(e.target.value);
    }

    useEffect(() => {
        fetch('/suggestion/get-all')
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
        </div>
    );
}
 
export default SuggestionEmp;