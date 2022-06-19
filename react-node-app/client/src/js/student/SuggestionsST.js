import { useState } from 'react';
import {useUser} from '../DataProvider';
import '../../css/student/suggestionSt.css';

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

const SuggestionsST = () => {
    const student = useUser();
    const [data] = useState({
        username: student.username,
        name: student.name,
        department: student.department,
        level: student.level,
        type: 'إقتراح',
        body: ''
    });

    const handelChangeType = (e) => {
        data.type = e.target.value;
    }

    const handelChangeBody = (e) => {
        data.body = e.target.value;
    }

    const handelSubmet = () => {

        fetch('/suggestion/create', {
            method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            }).then(() => console.log('up done'))
            .catch((err) => console.log(err));

    }

    return (
        <div className="container container-page">
            <header className="header">
                <h2>الإقتراحات والشكاوى</h2>
            </header>

            <section className='data-section'>
                <form acton='#' method='POST'>
                    <div>
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
                    </div>
                    <textarea onChange={handelChangeBody}></textarea>
                </form>
                <button className='btn' onClick={handelSubmet}>إرسال</button>
            </section>
        </div>
    );
}

export default SuggestionsST;