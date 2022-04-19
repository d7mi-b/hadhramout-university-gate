import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ChargeWallte from './js/employee/ChargeWallte';
import CreateNew from './js/employee/createNew';
import HomeEmp from './js/employee/HomeEmp';
import NavbarEmp from './js/employee/NavbarEmp';
import NewsEmp from './js/employee/NewsEmp';
import Withdraw from './js/employee/Withdraw';
import Footer from './js/Footer';
import Login from "./js/Login";
import NewDetails from './js/newDetails';
import HomeSt from './js/student/HomeSt';
import NavbarSt from './js/student/NavbarSt';
import NewsST from './js/student/NewsSt';
import Renew from './js/student/Renew';
import ScheduleSt from './js/student/ScheduleSt';
import UnCalenderSt from './js/student/UnvCalenderSt';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>

          {/* LOGIN PAGE */}
          <Route exact path="/">
            <Login />
          </Route>

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
          <Route path="/new/:id">
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