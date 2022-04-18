import '../../css/student/unClanderSt.css'

const UnCalenderSt = () => {
    return (
        <div className="container calender">
            <header className='header'>
                <h2>التقويم الجامعي</h2>
            </header>

            {/* FIRST SEMESTER */}
            <section className='semestar'>
                <header>
                    <h4>الفصل الدراسي الأول</h4>
                </header>
                <table className='sem-table'>
                    <thead>
                        <tr>
                            <td><h4>التاريخ الميلادي</h4></td>
                            <td><h4>التاريخ الهجري</h4></td>
                            <td><h4>التفاصيل</h4></td>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>15/1/2022م</td>
                            <td>12/6/1443 هـ</td>
                            <td>إستناف الدراسة للفصل الأول</td>
                        </tr>
                        <tr>
                            <td>17/3/2022م</td>
                            <td>14/8/1443 هـ</td>
                            <td>إنتهاء الفصل الدراسي الأول</td>
                        </tr>
                        <tr>
                            <td>19 - 31/3/2022م</td>
                            <td>16 - 28/6/1443 هـ</td>
                            <td>إختبارات الفصل الدراسي الأول</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* SECOND SEMESTER */}
            <section className='semestar'>
                <header>
                    <h4>الفصل الدراسي الثاني</h4>
                </header>
                <table className='sem-table'>
                    <thead>
                        <tr>
                            <td><h4>التاريخ الميلادي</h4></td>
                            <td><h4>التاريخ الهجري</h4></td>
                            <td><h4>التفاصيل</h4></td>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>8/5/2022م</td>
                            <td>7/10/1443 هـ</td>
                            <td>بدء دراسة الفصل الدراسي الثاني</td>
                        </tr>
                        <tr>
                            <td>9 - 14/7/2022م</td>
                            <td>10 - 15/12/1443 هـ</td>
                            <td>إجازة عيد الأضحى المبارك</td>
                        </tr>
                        <tr>
                            <td>17/7/2022م</td>
                            <td>17/12/1443 هـ</td>
                            <td>إستناف الدراسة بعد عيد الأضحى</td>
                        </tr>
                        <tr>
                            <td>18/8/2022م</td>
                            <td>20/1/1444 هـ</td>
                            <td>إنتهاء الفصل الدراسي الثاني</td>
                        </tr>
                        <tr>
                            <td>20 - 22/8/2022م</td>
                            <td>22 - 24/1/1444 هـ</td>
                            <td>الإجازة التحضيرية لإختبارات الفصل الثاني</td>
                        </tr>
                        <tr>
                            <td>23/8 - 6/9/2022م</td>
                            <td>25/1 - 10/2/1444 هـ</td>
                            <td>فترة إختبارات الفصل الدراسي الثاني</td>
                        </tr>
                        <tr>
                            <td>11/9/2022م</td>
                            <td>15/2/1444 هـ</td>
                            <td>إعلان نتائج الفصل الدراسي الثاني</td>
                        </tr>
                        <tr>
                            <td>12/9/2022م</td>
                            <td>16/2/1444 هـ</td>
                            <td>بدء إجازة أعضاء هيئة التدريس</td>
                        </tr>
                        <tr>
                            <td>27/9 - 11/10/2022م</td>
                            <td>1- 15/3/1444 هـ</td>
                            <td>فترة إختبارات الدور التكميلي لعام 2021 - 2022 م</td>
                        </tr>
                        <tr>
                            <td>16/10/2022م</td>
                            <td>20/3/1444 هـ</td>
                            <td>بدء العام الجامعي 2022 - 2023 م</td>
                        </tr>
                    </tbody>
                </table>
            </section>
            
            {/* NOTES */}
            <p className='note'>بإستثناء كلية الهندسة والبترول وكلية الطب والعلوم الصحية تخصص طب بشري</p>
        </div>
    );
}

export default UnCalenderSt;