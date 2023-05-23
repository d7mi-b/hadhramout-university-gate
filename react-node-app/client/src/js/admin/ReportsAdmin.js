import React, { useEffect, useState } from 'react';
import '../../css/employee/scheduleEmp.css'
import '../../css/admin/reports.css'


let collections = [
    {
        id: 1,
        name:'employee',
        label:'الموظفين'
    },
    {
        id: 2,
        name:'advertisements',
        label:'الاعلانات'
    },
    {
        id: 4,
        name:"grievances",
        label:"التظلمات"
    },
    {
        id: 5,
        name:"news",
        label:"الاخبار"
    },
    {
        id: 7,
        name:"services",
        label:"الخدمات"
    },
    {
        id: 8,
        name:"suggestions",
        label:"الاقتراحات"
    },
    {
        id: 9,
        name:"transactions",
        label:"الطلبات"
    },
    {
        id: 10,
        name:"WalletCharge",
        label:"شحن المحفظة"
    }
]

const ReportsAdmin = () => {
    const [collection, setCollection] = useState(collections[0].name);
    const [data, setData] = useState([]);
    const [header, setHeader]= useState([]);

    const getCollection = (e) => {
        console.log("hi")
        fetch(`/collection/${collection}`)
        .then(res => res.json())
        .then(i => {
            filter(i)
            setData(i)
            let j = Object.keys(i[0]);
            setHeader(j);
            
        })
        .catch(err => console.log(err))
    }

    const filter = (e) => {
        e.map(i => {
            delete i.__v;
            delete i.createdAt;
            delete i.updatedAt;
            delete i.password;
        })
        return e;
    }

    const handelchangecollection = e => {
        setCollection(e.target.value);
    };

    const selects = () => {

        const ele=document.getElementsByName('selectAll');  
        if(ele.checked !== true)
        {
            for(let i = 0; i < ele.length; i++){  
            if(ele[i].type === 'checkbox')  
                ele[i].checked = true;  
        }  
    }
    else {
        for(let i = 0; i < ele.length; i++){  
            if(ele[i].type === 'checkbox')  
                ele[i].checked=false;  
        }  
    }
    }

    const archive = (e) => {
        e.preventDefault();
        fetch(`/archive/${collection}`)
        .then(response => {
            response.blob().then(blob => {
                // Creating new object of PDF file
                const fileURL = window.URL.createObjectURL(blob);
                // Setting various property values
                let alink = document.createElement('a');
                alink.href = fileURL;
                alink.download = `${collection} ${new Date().getFullYear()}.csv`;
                alink.click();
            })
        })
        .catch(err => console.log(err))
    }

    const printArchive = (e) => {
        e.preventDefault();
        fetch(`/archive/print${collection}`)
        .then(response => {
            response.blob().then(blob => {
                // Creating new object of PDF file
                const fileURL = window.URL.createObjectURL(blob);
                // Setting various property values
                let alink = document.createElement('a');
                alink.href = fileURL;
                alink.download = `${collection} ${new Date().getFullYear()}.csv`;
                alink.click();
            })
        })
        .catch(err => console.log(err))
    }

    const deleteEmployee = (e) => {
    }


    useEffect(() => {
        getCollection();
    }, [collection])

    return (
        <div className="container-schedule container-page container">
            <header className="header">
                <h2>التقارير</h2>
            </header>

            <section className="choose-sechedule choose-data">
                <form method='POST' >
                    <div>
                        <label htmlFor='collection'>المجموعات</label>
                        <select name="collection" className="departement" value={collection} onChange={handelchangecollection} >
                            {
                                collections.map(e => {
                                    return (
                                        <option name={e.name} key={e.id}>{e.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className='container btn-flex'>
                        <button onClick={archive} className='btn btn-add'>نقل إلى الارشيف</button>
                        <button onClick={printArchive} className='btn btn-add'>طباعة</button>
                    </div>
                </form>
            </section>
            <table className='schedule'>
                
                <thead>
                    <tr className='' key={Math.random()}>
                    {
                        data &&
                        header.map(i =>{
                            return(    
                                <th><p className='bold'>{i}</p></th>
                            )}
                        )
                    }
                    </tr>
                </thead>
                <tbody>
                    {
                        data &&
                        data.map(i => {
                            return(
                                <tr className='' key={Math.random()}>
                                    {
                                        Object.values(i).map(j => {
                                            return(
                                                <td>
                                                    <p>{j}</p>
                                                </td>
                                            )
                                        })  
                                    }
                                    {
                                        collection === 'employee' && <p onClick={deleteEmployee} className='btn'>حذف</p>
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default ReportsAdmin;