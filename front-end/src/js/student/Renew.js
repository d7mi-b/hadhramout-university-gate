import React, { useState } from 'react';
import { useEffect } from 'react';
import '../../css/student/renewSt.css';

let amount = 5000;

const Renew = () => {
    const [studentSt, setStudentSt] = useState(false);

    const handelClick = () => {
        setStudentSt(true);
    }

    // HANDEL CONTENT
    const handelContent = () => {
        let backgroundSection = document.querySelector('.background-section');
        let btnRenew = document.getElementById('btnRenew');
        let btnCancel = document.querySelector('#cancel');
        let btnProve = document.querySelector('#prove');
        btnRenew.addEventListener('click', () => {
            backgroundSection.style.cssText = "display: flex";
        })

        btnCancel.addEventListener('click', () => {
            backgroundSection.style.cssText = "display: none";
        })

        btnProve.addEventListener('click', () => {
            backgroundSection.style.cssText = "display: none";
        })
    }
    React.useEffect(() => {
        handelContent();
    }, [])

    return (
        <div className="renew container container-page">
            <header className="header">
                <h2>تجديد قيد</h2>
            </header>

            {/* IF studentSt TRUE */}
            {
                studentSt
                &&
                <section className="check renew-container">
                    <div className="icon-renew">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z"/></svg>
                    </div>
                    <p className='bold'>القيد مجدد</p>
                </section>
            }

            {/* IF studentst FALSE */}
            {
                !studentSt 
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
                    <p>سحب من المحفظة {amount}</p>
                    <div className='buttons'>
                        <button className='btn' id='prove' onClick={handelClick}>سحب</button>
                        <button className='btn' id='cancel'>إلغاء</button>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Renew;