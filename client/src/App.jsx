
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';


function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} ></Route>
        <Route path='/about' element={<About />} ></Route>
        <Route path='/sign-in' element={<SignIn />} ></Route>
        <Route path='/sign-up' element={<SignUp />} ></Route>
        <Route path='/profile' element={<Profile />} ></Route>
      </Routes>
    </Router>
  )
}

export default App
