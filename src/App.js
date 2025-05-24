import React from 'react';
import './App.css';
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import Signin from './Components/Signin';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './Components/Signup';
import Navbar from './Components/Navbar';
import Landing from './Components/Landing';
import Home from './Components/Home';
import Cart from './Components/Cart';
import Contact from './Components/Contact';
import Footer from './Components/Footer';
import AddProducts from './Components/AddProducts'


function App() {
  return (
    <div className="App">
        
        
          <Navbar />
          
      <main className="main-content">
        <BrowserRouter>
            
            <Routes>
              <Route path="/" element={<Landing/>}/>
              <Route path='/signin' element={<Signin/>}/>
              <Route path='/signup' element={<Signup/>}/>
              <Route path='/home' element={<Home/>}/>
              <Route path='/cart' element={<Cart/>}/>
              <Route path='/add' element={<AddProducts/>}/>
              <Route path='/contact' element={<Contact/>}/>

            </Routes>
         </BrowserRouter> 

         <Footer/>
      </main>
    </div>
  );
}

export default App;
