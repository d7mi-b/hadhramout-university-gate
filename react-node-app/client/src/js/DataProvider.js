import React, { Children, useContext, useState } from "react";

const WalletContext = React.createContext();
const NewsContext = React.createContext();
const StudentStateContext = React.createContext();
const studentLoginContext = React.createContext();

export function useWallet() {
    return useContext(WalletContext)
}

export function useNews() {
    return useContext(NewsContext)
}

export function useStudentState() {
    return useContext(StudentStateContext)
}

export function useStudentLogin() {
    return useContext(studentLoginContext)
}

const DataProvider = ({ children }) => {
    const [news, setNews] = useState([]);
    const [wallet, setWallet] = useState(0);
    const [studentState, setStudentState] = useState(false);
    const [steudent, setStudent] = useState({});
    const [studentLogin, setStudentLogin] = useState({});

    React.useEffect(() => {
        fetch("/api")
        .then((res) => res.json())
        .then((data) => setStudent(data));
        
        console.log(steudent)

        // setWallet(steudent.wallet);

        // setStudentState(steudent.state);

        fetch("/api")
        .then((res) => res.json())
        .then((data) => setWallet(data.wallet));

        fetch("/api")
        .then((res) => res.json())
        .then((data) => setStudentState(data.state));

        fetch("/news")
        .then((res) => res.json())
        .then((data) => setNews(data));

    
    }, []);

    return (
        <studentLoginContext.Provider value={{studentLogin, setStudentLogin}}>
            <WalletContext.Provider value={{ wallet, setWallet }}>
                <NewsContext.Provider value={news}>
                    <StudentStateContext.Provider value={studentState}>
                        { children }
                    </StudentStateContext.Provider>
                </NewsContext.Provider>
            </WalletContext.Provider>
        </studentLoginContext.Provider>
    );
}

export default DataProvider;