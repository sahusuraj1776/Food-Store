import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './page/Home';
import Header from './components/Header';
import About from './page/About';
import Blog from './page/Blog';
import Recipe from './page/Recipe';
import ContactUs from './page/ContactUs';
import Login from './page/Login';
import Register from './page/Register';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className='flex flex-col min-h-screen'>
      <ToastContainer position="top-right" autoClose={3000} newestOnTop closeOnClick pauseOnHover draggable />
      <Header/>
      <main className="flex-grow">
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/contact-us' element={<ContactUs/>} />
        <Route element={<ProtectedRoute/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='/about-us' element={<About/>}/>
          <Route path='/blog' element={<Blog/>}/>
          <Route path='/recipe' element={<Recipe/>} />
        </Route>
      </Routes>
      </main>
    </div>
  );
}

export default App;
