import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import CreateNew from './js/employee/createNew';
import HomeEmp from './js/employee/HomeEmp';
import NavbarEmp from './js/employee/NavbarEmp';
import NewsEmp from './js/employee/NewsEmp';
import Footer from './js/Footer';
import Login from "./js/Login";
import NewDetails from './js/newDetails';
import HomeSt from './js/student/HomeSt';
import NavbarSt from './js/student/NavbarSt';
import NewsST from './js/student/NewsSt';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>

          {/* LOGIN PAGE */}
          <Route exact path="/">
            <Login />
          </Route>

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