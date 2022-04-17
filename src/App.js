import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HomeEmp from './js/employee/HomeEmp';
import NavbarEmp from './js/employee/NavbarEmp';
import Footer from './js/Footer';
import Login from "./js/Login";
import HomeSt from './js/student/HomeSt';
import NavbarSt from './js/student/NavbarSt';
import NewsST from './js/student/NewsSt';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>

          <Route exact path="/">
            <Login />
          </Route>

          <Route path='/home'>
            <NavbarSt />
            <HomeSt />
            <Footer />
          </Route>

          <Route path='/news'>
            <NavbarSt />
            <NewsST />
            <Footer />
          </Route>

          <Route path='/employee'>
            <NavbarEmp />
            <HomeEmp />
            <Footer />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;