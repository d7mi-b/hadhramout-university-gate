import React, { useContext, useState } from "react";

const NewsContext = React.createContext();

export function useNews() {
    return useContext(NewsContext)
}

const DataProvider = ({ children }) => {
    const [news, setNews] = useState([]);

    React.useEffect(() => {

        fetch("/news")
        .then((res) => res.json())
        .then((data) => setNews(data));

    
    }, []);

    return (
        <NewsContext.Provider value={news}>
            { children }
        </NewsContext.Provider>
    );
}

export default DataProvider;