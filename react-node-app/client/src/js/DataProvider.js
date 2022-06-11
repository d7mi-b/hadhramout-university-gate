import React, { useContext, useState } from "react";

const NewsContext = React.createContext();
const UserContext = React.createContext();

export function useNews() {
    return useContext(NewsContext)
}

export function useUser() {
    return useContext(UserContext);
}

const DataProvider = ({ children }) => {
    const [news, setNews] = useState([]);
    const [ user ] = useState(JSON.parse(window.sessionStorage.getItem("user")));

    React.useEffect(() => {

        fetch("/news")
        .then((res) => res.json())
        .then((data) => setNews(data));

    
    }, []);

    return (
        <UserContext.Provider value={user}>
            <NewsContext.Provider value={news}>
                { children }
            </NewsContext.Provider>
        </UserContext.Provider>
    )
}

export default DataProvider;