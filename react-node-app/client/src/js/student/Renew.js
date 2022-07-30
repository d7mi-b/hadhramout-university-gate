import { useEffect, useState } from 'react';
import '../../css/student/renewSt.css';
import { useUser } from '../DataProvider';

let amount = 5000;
const date = new Date();

const getDate = (e) => {
    const year = new Date(e).getFullYear();
    const month = new Date(e).getMonth() + 1;
    const day = new Date(e).getDate();

    return `${year}-${month}-${day}`;
}

const Renew = () => {
    const student = useUser();
    const [checkWallet, setCheckWallet] = useState(true);
    const [price, setPrice] = useState(0);

    // to post into transaction collection and get pdf for cirtifcation reg.
    const handelCirt = () => {
        fetch('/transaction/addTransaction', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                username: student.username,
                date: date,
                service: 'شهادة قيد',
                type: '',
                price: price
            })
        }).then(result => {
            if (result.status === 200) {
                fetch('/pdf/regCir?' + new URLSearchParams({
                    username: student.username,
                    name: student.name,
                    level: student.level,
                    department: student.department,
                    typeOfRegister: student.typeOfRegister,
                    collage: student.collage,
                    logo: '/server/public/Hadhrmout.jpg',
                    date: getDate(new Date())
                }))
                .then(res => {
                    fetch('/updateUser?' + new URLSearchParams({
                        username: student.username
                    }))
                    .then((res) => res.json())
                    .then((data) => {
                        window.sessionStorage.setItem('user', JSON.stringify(data))
                        window.location.replace("/renew")
                    });
                })
                .catch(err => console.log(err));

                
            }
        })
    }
    // to post into transaction collection and update state of student.
    const handelRenew = () => {
        // update state of student
        fetch('/updateUserState', {
            method: 'PATCH',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                username: student.username,
                state: true,
                wallet: student.wallet - amount
            })})
        .then((result) => {
            if (result.status === 200) {
                fetch('/updateUser?' + new URLSearchParams({
                    username: student.username
                }))
                .then((res) => res.json())
                .then((data) => {
                    window.sessionStorage.setItem('user', JSON.stringify(data))
                    window.location.reload()
                });
            }
        })
        .catch((err) => console.log(err));
    }

    // function to check wallte
    const payService = () => {
        if (price <= student.wallet) {
            setCheckWallet(true);
            if (student.state) {
                handelCirt();
            }
            else if (!student.state) {
                handelRenew();
            }
        }
        else {
            setCheckWallet(false);
        }
    }

    // HANDEL CONTENT
    const handelContent = () => {

        const backgroundSection = document.querySelector('.background-section');
        const checkSection = document.querySelector('.check-section');
        const btnRenew = document.getElementById('btnRenew');
        const btnCancel = document.querySelector('#cancel');
        const btnProve = document.querySelector('#prove');
        const btnClose = document.querySelector("#close");
        const btnCrt = document.getElementById('btnCrt');
        
        if (btnRenew) {
            btnRenew.addEventListener('click', () => {
                backgroundSection.style.cssText = "display: flex";
            })
        }
        else if (btnCrt) {
            btnCrt.addEventListener('click', () => {
                backgroundSection.style.cssText = "display: flex";
            })
        }

        btnCancel.addEventListener('click', () => {
            backgroundSection.style.cssText = "display: none";
        })

        btnProve.addEventListener('click', () => {
            checkSection.style.cssText = "display: flex";
        })

        btnClose.addEventListener('click', () => {
            backgroundSection.style.cssText = "display: none";
            checkSection.style.cssText = "display: none";
        })
    }

    // function to check price of services
    const checkPrice = () => {
        // to get the price of service
        if (student.state) {
            fetch('/services/checkPrice?' + new URLSearchParams({
                name: 'بيان درجات',
                type: ""
            }))
            .then((res) => res.json())
            .then(data => setPrice(data.price))
            .catch(err => console.log(err))
        }
        else if (!student.state) {
            fetch('/services/checkPrice?' + new URLSearchParams({
                name: 'تجديد القيد',
                type: ""
            }))
            .then((res) => res.json())
            .then(data => setPrice(data.price))
            .catch(err => console.log(err))
        }
    }

    useEffect(() => {
        checkPrice();
        handelContent();
    },[]);

    return (
        <div className="renew container container-page">
            <header className="header">
                <h2>تجديد قيد</h2>
            </header>

            {/* IF studentSt TRUE */}
            {
                student.state
                &&
                <section className="check renew-container">
                    <div className="icon-renew">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z"/></svg>
                    </div>
                    <p className='bold'>القيد مجدد</p>
                    <button className='btn' id='btnCrt'>شهادة قيد</button>
                </section>
            }

            {/* IF studentst FALSE */}
            {
                !student.state
                &&
                <section className='not-check renew-container'>
                    <div className='icon-renew'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM175 208.1L222.1 255.1L175 303C165.7 312.4 165.7 327.6 175 336.1C184.4 346.3 199.6 346.3 208.1 336.1L255.1 289.9L303 336.1C312.4 346.3 327.6 346.3 336.1 336.1C346.3 327.6 346.3 312.4 336.1 303L289.9 255.1L336.1 208.1C346.3 199.6 346.3 184.4 336.1 175C327.6 165.7 312.4 165.7 303 175L255.1 222.1L208.1 175C199.6 165.7 184.4 165.7 175 175C165.7 184.4 165.7 199.6 175 208.1V208.1z"/></svg>
                    </div>
                    <p className='bold'>القيد بحاجة إلى تجديد</p>
                    <button className='btn' id='btnRenew'>تجديد القيد</button>
                </section>
            }

            {/* SECTION OF PAYMENT */}
            <div className='background-section'>
                <section className='pay-section'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M48.66 79.13C128.4 100.9 208.2 80.59 288 60.25C375 38.08 462 15.9 549 48.38C565.9 54.69 576 71.62 576 89.66V399.5C576 423.4 550.4 439.2 527.3 432.9C447.6 411.1 367.8 431.4 288 451.7C200.1 473.9 113.1 496.1 26.97 463.6C10.06 457.3 0 440.4 0 422.3V112.5C0 88.59 25.61 72.83 48.66 79.13L48.66 79.13zM287.1 352C332.2 352 368 309 368 255.1C368 202.1 332.2 159.1 287.1 159.1C243.8 159.1 207.1 202.1 207.1 255.1C207.1 309 243.8 352 287.1 352zM63.1 416H127.1C127.1 380.7 99.35 352 63.1 352V416zM63.1 143.1V207.1C99.35 207.1 127.1 179.3 127.1 143.1H63.1zM512 303.1C476.7 303.1 448 332.7 448 368H512V303.1zM448 95.1C448 131.3 476.7 159.1 512 159.1V95.1H448z"/></svg>
                    <p>سحب من المحفظة {price}</p>
                    <div className='buttons'>
                        <button className='btn' id='prove' onClick={payService}>سحب</button>
                        <button className='btn' id='cancel'>إلغاء</button>
                    </div>
                </section>
                <section className='check-section'>
                {
                        !checkWallet && 
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM232 152C232 138.8 242.8 128 256 128s24 10.75 24 24v128c0 13.25-10.75 24-24 24S232 293.3 232 280V152zM256 400c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 385.9 273.4 400 256 400z"/></svg>
                            <p>لا يوجد رصيد كافي</p>
                        </div>
                    }
                    {
                        checkWallet && 
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z"/></svg>
                            <p>تم</p>
                        </div>
                    }
                    <div className='button'>
                        <button className='btn' id='close'>إغلاق</button>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Renew;
