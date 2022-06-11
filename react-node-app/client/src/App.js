import React from "react";
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

function App() {

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
              {/* HOME PAGE FOR STUDENT */}
              <Route path='/home'>
                <NavbarSt />
                <HomeSt />
                <Footer />
              </Route>

              {/* NEWS PAGE FOR STUDENT */}
              <Route path='/news'>
                <NavbarSt />
                <NewsST />
                <Footer />
              </Route>

              {/* NEW DETAILS PAGE */}
              <Route path="/news/:id">
                <NavbarSt />
                <NewDetails />
                <Footer />
              </Route>

              {/* UNVERSITY CALENDER PAGE FOR STUDENT */}
              <Route path='/calender'>
                <NavbarSt />
                <UnCalenderSt />
                <Footer />
              </Route>

              {/* SCHEDULE PAGE FOR STUDENT */}
              <Route path='/schedule'>
                <NavbarSt />
                <ScheduleSt />
                <Footer />
              </Route>

              {/* RENEW PAGE FOR STUDENT */}
              <Route path='/renew'>
                <NavbarSt />
                <Renew />
                <Footer />
              </Route>

              {/* DEGREE STATEMENT PAGE FOR STUDENT */}
              <Route path='/degree-statement'>
                <NavbarSt />
                <DegreeSt />
                <Footer />
              </Route>

              <Route path='/grievance-up'>
                <NavbarSt />
                <Grievance />
                <Footer />
              </Route>

            {/* EMPLOYEE */}
              {/* HOME PAGE FOR EMPLOYEE */}
              <Route path='/employee'>
                <NavbarEmp />
                <HomeEmp />
                <Footer />
              </Route>

              {/* NEWS PAGE FOR EMPLOYEE */}
              <Route path='/newsEmp'>
                <NavbarEmp />
                <NewsEmp />
                <Footer />
              </Route>

              {/* CREATE NEW NEWS PAGE */}
              <Route path='/create-new'>
                <NavbarEmp />
                <CreateNew />
                <Footer />
              </Route>

              {/* CHARGE WALLTE PAGE */}
              <Route path='/charge-wallte'>
                <NavbarEmp />
                <ChargeWallte />
                <Footer />
              </Route>

              {/* WITHDRAW FROM WALLTE PAGE */}
              <Route path='/withdraw'>
                <NavbarEmp />
                <Withdraw />
                <Footer />
              </Route>

              {/* SCHEDULE PAGE FOR STUDENT */}
              <Route path='/edit-schedule'>
                <NavbarEmp />
                <ScheduleEmp />
                <Footer />
              </Route>

              {/* ADVERTISEMENTS PAGE FOR EMPLOYEE */}
              <Route path='/advertisements'>
                <NavbarEmp />
                <AdvertisementsEmp />
                <Footer />
              </Route>

              {/* CREATE ADVERTISEMENTS PAGE FOR EMPLOYEE */}
              <Route path='/create-adv'>
                <NavbarEmp />
                <CreateAdv />
                <Footer />
              </Route>
            </DataProvider>
            {/* 404 PAGE */}
            <Route path='*'>
              <h1>404</h1>
            </Route>

          </Switch>
        </Router>
    </div>
  );
}

export default App;