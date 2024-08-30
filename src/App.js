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
import ForgotPassword from './Components/ForgetPassword/ForgotPassword';
import DailyExpenses from './Components/DailyExpenses/DailyExpenses';
import CartProvider from './Components/CartContext/CartProvider';




function App() {
  return (
    <CartProvider>
    <AuthContextprovider>
   
      <BrowserRouter>
    
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<AuthForm />}/>
        <Route path='/contactDetails' element={<ContactDetails />} />
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/verifyEmail' element={<VerifyEmail/>} />
        <Route path='/forgotpassword' element={<ForgotPassword/>} />
        <Route path='/dailyExpenses' element={<DailyExpenses/>} />
      </Routes>
      </BrowserRouter>

    </AuthContextprovider>
    </CartProvider>
    
  );
}

export default App;
