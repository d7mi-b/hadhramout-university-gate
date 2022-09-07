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
    const [page, setPage] = useState(0);

    const handlePrevious = () => {
        setPage((p) => {
            if (p === 0) return p;
            return p - 1;
            });
    }

    const handleNext = () => {
        setPage((p) => {
            // if (p === pageCount) return p;
            return p + 1;
        });
    }

    const handelChangeType = (e) => {
        setType(e.target.value);
    }

    useEffect(() => {
        fetch('/suggestion/get-all?'  + new URLSearchParams({
            page: page,
        }))
            .then(res => res.json())
            .then(data => setSuggestion(data));
    }, [page]);

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
                    suggestion.filter(e => type === e.type).map(e => {
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
                suggestion.length >= 7 && page !== 0 &&
                <section className='pages'>
                    <button className='btn' onClick={handleNext}>التالي</button>
                    <button className='btn' onClick={handlePrevious}>السابق</button>
                </section>
            }
            {
                suggestion.length >= 7 && page === 0 &&
                <section className='pages'>
                    <button className='btn' onClick={handleNext}>التالي</button>
                </section>
            }
            {
                suggestion.length < 7 && page !== 0 && 
                <section className='pages'>
                    <button className='btn' onClick={handlePrevious}>السابق</button>
                </section>
            }
        </div>
    );
}

export default SuggestionEmp;