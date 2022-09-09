import React, { useEffect, useState } from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ChargeWallte from './js/employee/ChargeWallte';
import CreateNew from './js/employee/createNew';
import HomeEmp from './js/employee/HomeEmp';
import NavbarEmp from './js/employee/NavbarEmp';
import NewsEmp from './js/employee/NewsEmp';
import ScheduleEmp from './js/employee/ScheduleEmp';
import Withdraw from './js/employee/Withdraw';
import Footer from './js/Footer';
import NewDetails from './js/newDetails';
import DegreeSt from './js/student/DegreeSt';
import HomeSt from './js/student/HomeSt';
import NavbarSt from './js/student/NavbarSt';
import NewsST from './js/student/NewsSt';
import Renew from './js/student/Renew';
import ScheduleSt from './js/student/ScheduleSt';
import UnCalenderSt from './js/student/UnvCalenderSt';
import Login from './js/Login'
import DataProvider from "./js/DataProvider";
import AdvertisementsEmp from "./js/employee/AdvertisementsEmp";
import CreateAdv from "./js/employee/CreateAdv";
import Grievance from "./js/student/Grievance";
import NotFound from "./js/NotFound";
import GrivenceEmp from "./js/employee/GrivenceEmp";
import MyGrivences from "./js/student/MyGrivences";
import SuggestionsST from "./js/student/SuggestionsST";
import SuggestionEmp from "./js/employee/SuggestionEmp";
import CalanderEmp from "./js/admin/CalanderEmp";
import Student from "./js/employee/Students";
import EditInfoStudent from "./js/student/EditInfoStudent";
import NavbarAdmin from "./js/admin/NavbarAdmin";
import HomeAdmin from "./js/admin/HomeAdmin";
import ReportsAdmin from "./js/admin/ReportsAdmin";
import EditEmployee from "./js/admin/editEmployees";

function App() {
  const [student, setStudent] = useState();
  const [employee, setEmployee] = useState(); 
  const [admin, setAdmin] = useState();

  const route = () => {
    if (!JSON.parse(window.sessionStorage.getItem('user')) && window.location.href !== 'http://localhost:3000/') {
        window.location.replace('/')
    }
  }

  route()

  useEffect(() => {
    
    
    if (JSON.parse(window.sessionStorage.getItem('user'))) {

      if (JSON.parse(window.sessionStorage.getItem('user')).position==='student')
        setStudent(true)
        
      else if(JSON.parse(window.sessionStorage.getItem('user')).position==='employee')
      setEmployee(true)
    
      else if(JSON.parse(window.sessionStorage.getItem('user')).position==='admin')
      setAdmin(true)
    }
    else{
    
    }
  }, [])

  return (
    <div className="App">
        <Router>
          <Switch>
            {/* LOGIN PAGE */}
            <Route exact path="/">
              <Login />
            </Route>

            <DataProvider>
            {/* STUDENT */}
            { student &&
              
              
              <div id="student">
                <NavbarSt />
                {/* HOME PAGE FOR STUDENT */}
                <Route path='/home'>
                  <HomeSt />
                </Route>

                {/* NEWS PAGE FOR STUDENT */}
                <Route path='/news'>
                  <NewsST />
                </Route>

                {/* NEWS DETAILS PAGE */}
                <Route path="/details/:id">
                  <NewDetails />
                </Route>

                {/* UNVERSITY CALENDER PAGE FOR STUDENT */}
                <Route path='/calender'>
                  <UnCalenderSt />
                </Route>

                {/* SCHEDULE PAGE FOR STUDENT */}
                <Route path='/schedule'>
                  <ScheduleSt />
                </Route>

                {/* RENEW PAGE FOR STUDENT */}
                <Route path='/renew'>
                  <Renew />
                </Route>

                {/* DEGREE STATEMENT PAGE FOR STUDENT */}
                <Route path='/degree-statement'>
                  <DegreeSt />
                </Route>

                <Route path='/grievance-up'>
                  <Grievance />
                </Route>

                <Route path='/my-grievane'>
                  <MyGrivences />
                </Route>

                <Route path='/suggestions-submet'>
                  <SuggestionsST />
                </Route>

                <Route path='/edit-info'>
                  <EditInfoStudent />
                </Route>
                
                <Footer />
              </div>
            
            }
            {
              employee && 
              <div id="employee">
                {/* EMPLOYEE */}
                <NavbarEmp />
                {/* HOME PAGE FOR EMPLOYEE */}
                <Route path='/employee'>
                  <HomeEmp />
                </Route>

                {/* NEWS PAGE FOR EMPLOYEE */}
                <Route path='/newsEmp'>
                  <NewsEmp />
                </Route>

                {/* NEWS DETAILS PAGE */}
                <Route path="/details/:id">
                  <NewDetails />
                </Route>

                {/* CREATE NEW NEWS PAGE */}
                <Route path='/create-new'>
                  <CreateNew />
                </Route>

                {/* CHARGE WALLTE PAGE */}
                <Route path='/charge-wallte'>
                  <ChargeWallte />
                </Route>

                {/* WITHDRAW FROM WALLTE PAGE */}
                <Route path='/withdraw'>
                  <Withdraw />
                </Route>

                {/* SCHEDULE PAGE FOR STUDENT */}
                <Route path='/edit-schedule'>
                  <ScheduleEmp />
                </Route>

                {/* ADVERTISEMENTS PAGE FOR EMPLOYEE */}
                <Route path='/advertisements'>
                  <AdvertisementsEmp />
                </Route>

                {/* CREATE ADVERTISEMENTS PAGE FOR EMPLOYEE */}
                <Route path='/create-adv'>
                  <CreateAdv />
                </Route>

                {/* GRIVENCES PAGE FOR EMPLOYEE */}
                <Route path='/grievance-emp'>
                  <GrivenceEmp />
                </Route>

                {/* SUGGESTION PAGE FOR EMPLOYEE */}
                <Route path='/suggestion-Emp'>
                  <SuggestionEmp />
                </Route>

                {/* STUDENTS PAGE FOR EMPLOYEE */}
                <Route path='/students'>
                  <Student />
                </Route>

                <Footer />
              </div>
            }
            {
              admin &&
              <div id="employee">
                <NavbarAdmin />

                <Route path='/admin'>
                  <HomeAdmin />
                </Route>

                <Route path='/reports'>
                  <ReportsAdmin /> 
                </Route>

                <Route path='/Add-calander'>
                    <CalanderEmp />
                </Route>

                <Route path='/editEmployee'>
                    <EditEmployee />
                </Route>
                
                <Footer />
              </div>
            }
            </DataProvider>
            {/* 404 PAGE */}
            <Route path='*'>
              <NotFound />
            </Route>

          </Switch>
        </Router>
    </div>
  );
}

export default App;