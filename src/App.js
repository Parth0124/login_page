import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import ForgotPassword from './Pages/ForgotPassword';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from './Pages/Profile';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Profile />} />
          <Route path='/sign-in' element={<SignIn />} /> 
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
