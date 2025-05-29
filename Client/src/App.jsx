import React from 'react';
import Signup from './pages/Signup'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Todo from './pages/to-do';

function App() {
  

  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/todo' element={<Todo />}/>
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
