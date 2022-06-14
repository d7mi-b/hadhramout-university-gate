import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../../css/student/homeSt.css'
import { useNews } from '../DataProvider';


let services = [
    {
        id: 1,
        title: 'التقويم الجامعي',
        icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M160 32V64H288V32C288 14.33 302.3 0 320 0C337.7 0 352 14.33 352 32V64H400C426.5 64 448 85.49 448 112V160H0V112C0 85.49 21.49 64 48 64H96V32C96 14.33 110.3 0 128 0C145.7 0 160 14.33 160 32zM0 192H448V464C448 490.5 426.5 512 400 512H48C21.49 512 0 490.5 0 464V192zM64 304C64 312.8 71.16 320 80 320H112C120.8 320 128 312.8 128 304V272C128 263.2 120.8 256 112 256H80C71.16 256 64 263.2 64 272V304zM192 304C192 312.8 199.2 320 208 320H240C248.8 320 256 312.8 256 304V272C256 263.2 248.8 256 240 256H208C199.2 256 192 263.2 192 272V304zM336 256C327.2 256 320 263.2 320 272V304C320 312.8 327.2 320 336 320H368C376.8 320 384 312.8 384 304V272C384 263.2 376.8 256 368 256H336zM64 432C64 440.8 71.16 448 80 448H112C120.8 448 128 440.8 128 432V400C128 391.2 120.8 384 112 384H80C71.16 384 64 391.2 64 400V432zM208 384C199.2 384 192 391.2 192 400V432C192 440.8 199.2 448 208 448H240C248.8 448 256 440.8 256 432V400C256 391.2 248.8 384 240 384H208zM320 432C320 440.8 327.2 448 336 448H368C376.8 448 384 440.8 384 432V400C384 391.2 376.8 384 368 384H336C327.2 384 320 391.2 320 400V432z"/></svg>,
        price: '',
        link: '/calender'
    },
    {
        id: 2,
        title: 'بيان درجات',
        icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M256 0v128h128L256 0zM224 128L224 0H48C21.49 0 0 21.49 0 48v416C0 490.5 21.49 512 48 512h288c26.51 0 48-21.49 48-48V160h-127.1C238.3 160 224 145.7 224 128zM272 416h-160C103.2 416 96 408.8 96 400C96 391.2 103.2 384 112 384h160c8.836 0 16 7.162 16 16C288 408.8 280.8 416 272 416zM272 352h-160C103.2 352 96 344.8 96 336C96 327.2 103.2 320 112 320h160c8.836 0 16 7.162 16 16C288 344.8 280.8 352 272 352zM288 272C288 280.8 280.8 288 272 288h-160C103.2 288 96 280.8 96 272C96 263.2 103.2 256 112 256h160C280.8 256 288 263.2 288 272z"/></svg>,
        price: '',
        link: '/degree-statement'
    },
    {
        id: 3,
        title: 'جدول المحاضرات',
        icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M160 32V64H288V32C288 14.33 302.3 0 320 0C337.7 0 352 14.33 352 32V64H400C426.5 64 448 85.49 448 112V160H0V112C0 85.49 21.49 64 48 64H96V32C96 14.33 110.3 0 128 0C145.7 0 160 14.33 160 32zM0 192H448V464C448 490.5 426.5 512 400 512H48C21.49 512 0 490.5 0 464V192zM80 256C71.16 256 64 263.2 64 272V368C64 376.8 71.16 384 80 384H176C184.8 384 192 376.8 192 368V272C192 263.2 184.8 256 176 256H80z"/></svg>,
        price: '',
        link: '/schedule'
    },
    {
        id: 4,
        title: 'القيد',
        icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M384 128h-128V0L384 128zM256 160H384v304c0 26.51-21.49 48-48 48h-288C21.49 512 0 490.5 0 464v-416C0 21.49 21.49 0 48 0H224l.0039 128C224 145.7 238.3 160 256 160zM245.8 264.4l-79.13 92.34l-29.69-29.69c-9.375-9.375-24.56-9.375-33.94 0s-9.375 24.56 0 33.94l48 48c4.5 4.5 10.62 7.031 16.97 7.031c.3125 0 .625 0 .9062-.0313c6.688-.25 12.97-3.281 17.31-8.344l96-112c8.625-10.06 7.469-25.22-2.594-33.84C269.6 253.2 254.4 254.3 245.8 264.4z"/></svg>,
        price: '',
        link: '/renew'
    }
]

const HomeSt = () => {
    const news = useNews();
    const [advertisement, setAdvertisement] = useState([]);

    useEffect(() => {
        fetch('/advertisements')
        .then(res => res.json())
        .then(data => setAdvertisement(data));
    }, [])

    return (
        <div className="home">
            <div className="container">

                {/* START FAST SERVICES */}
                <section className='fast-servcies'>
                    <header>
                            <h2>خدمات سريعة</h2>
                    </header>
                    <div className='services-container'>
                        {
                            services.map(e => {
                                return (
                                    <Link className='service' key={e.id} to={e.link}>
                                        <div className='icon'>
                                            {e.icon}
                                        </div>
                                        <h4>{e.title}</h4>
                                        <p className='price'>{e.price}</p>
                                    </Link>
                                );
                            })
                        }
                    </div>
                </section>
                {/* END FAST SERVICES */}

                {/* START NEWS */}
                <section className="news">
                    <header>
                        <h2>أحدث الأخبار</h2>
                        <Link className='all-news btn' to='/news'>جميع الأخبار</Link>
                    </header>
                    <div className="news-container">
                        {
                            news.map((e, i, arr) => {
                                if (arr.length - 3 <= i)
                                    return (
                                        <article className="new" key={e._id}>
                                            <div className="image">
                                                <img src={e.image} alt="" />
                                            </div>
                                            <section>
                                                <header>
                                                    <h3>{e.title.slice(0, 70)}..</h3>
                                                </header>
                                                <p>{e.body.slice(0, 120)}...</p>
                                                <time dateTime={e.dateNo} className="new-date">{e.date}</time>
                                                <Link to={`/new/${e.id}`}>قراءة المزيد</Link>
                                            </section>
                                        </article>
                                    );
                            })
                        }
                    </div>
                </section>
                {/* END NEWS */}
                
                {/* START ADVERTISEMENTS */}
                <section className='advertisements'>
                    <header>
                        <h2>إعلانات</h2>
                    </header>
                    <div className='advertisements-container'>
                        {
                            advertisement.map(e => {
                                return (
                                    <article className='advertisement' key={e._id}>
                                        <header>
                                            <h3>{e.title.slice(0, 60)}</h3>
                                        </header>
                                        <time dateTime={e.dateNo}>{e.date}</time>
                                    </article>
                                );
                            })
                        }
                    </div>
                </section>
                {/* END ADVERTISEMENTS */}
            </div>
        </div>
    );
}

export default HomeSt;