
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Header from './components/Header'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';


function App() {

  return (
    <Router>
      {/* header in all pages */}
      <Header/>
      <Routes>
        <Route path='/' element={<Home />} ></Route>
        <Route path='/about' element={<About />} ></Route>
        <Route path='/sign-in' element={<SignIn />} ></Route>
        <Route path='/sign-up' element={<SignUp />} ></Route>
        {/* Protected Route for Profile */}
        <Route  element={<PrivateRoute />} >
          <Route path='/profile' element={<Profile />} ></Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
