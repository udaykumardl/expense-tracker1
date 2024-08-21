import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import {BrowserRouter,Route, Routes} from 'react-router-dom';
import Home from './Components/Home/Home';
import AuthForm from './Components/SignUp/AuthForm';


function App() {
  return (
    <div>
      <BrowserRouter>
    
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<AuthForm />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
