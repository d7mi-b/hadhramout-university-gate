import React, { useContext, useState } from "react";

const StudentContext = React.createContext();

export function useStudent () {
    return useContext(StudentContext);
}

const StudentData = ({children}) => {
    const studentId = JSON.parse(window.sessionStorage.getItem("user"))
    const [student, setStudent] = useState(studentId);

    console.log(studentId)
    console.log(student)

    return (
        <StudentContext.Provider value={student}>
            {children}
        </StudentContext.Provider>
    );
}

export default StudentData 