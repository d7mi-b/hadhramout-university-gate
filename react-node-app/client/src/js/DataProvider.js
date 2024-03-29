import React, { useContext, useState } from "react";

const NewsContext = React.createContext();
const UserContext = React.createContext();
const AdvContext = React.createContext();


export function useNews() {
    return useContext(NewsContext)
}

export function useUser() {
    return useContext(UserContext);
}

export function useAdv() {
    return useContext(AdvContext);
}



const DataProvider = ({ children }) => {
    const [news, setNews] = useState([]);
    const [user, setUser] = useState(JSON.parse(window.sessionStorage.getItem("user")));
    const [advertisement, setAdvertisement] = useState([]);
   

    React.useEffect(() => {

        fetch('/ads')
        .then(res => res.json())
        .then(data => setAdvertisement(data));

        fetch("/news")
        .then((res) => res.json())
        .then((data) => setNews(data));

        if (!user.position) {
            fetch('/updateUser?' + new URLSearchParams({
                username: user.username,
                name: user.name
            }))
            .then((res) => res.json())
            .then((data) => {
                window.sessionStorage.setItem('user', JSON.stringify(data))
            });
            setUser(JSON.parse(window.sessionStorage.getItem("user")));
        }

    }, []);

    return (
        <AdvContext.Provider value={advertisement}>
            <UserContext.Provider value={user}>
                <NewsContext.Provider value={news}>
                    
                        { children }
                   
                </NewsContext.Provider>
            </UserContext.Provider>
        </AdvContext.Provider>
    )
}

export default DataProvider;