import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import {BrowserRouter,Route, Routes} from 'react-router-dom';
import Home from './Components/Home/Home';
import AuthForm from './Components/SignUp/AuthForm';
import { AuthContextprovider } from './Components/AuthContext/auth-context';
import ContactDetails from './Components/ContactDetails/ContactDetails';
import Profile from './Components/Profile/Profile';
import VerifyEmail from './Components/VerifyEmail/VerifyEmail';



function App() {
  return (
    <AuthContextprovider>
   
      <BrowserRouter>
    
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<AuthForm />}/>
        <Route path='/contactDetails' element={<ContactDetails />} />
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/verifyEmail' element={<VerifyEmail/>} />
      </Routes>
      </BrowserRouter>

    </AuthContextprovider>
  );
}

export default App;
