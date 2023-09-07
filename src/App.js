import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';

// Import your components
import Dashboard from './pages/dashboard.js'; // Make sure to provide the correct path to your Dashboard component
import Course1 from './pages/course1';
import Course2 from './pages/course2';
import Course3 from './pages/course3';
import Course4 from './pages/course4';

function App() {
  return (
    <Router>
      <div>
          <ul>
            <li class = "banner">
              <Link to="/Dashboard">Dashboard</Link>
            </li>
           
          </ul>
   

        <Routes> 
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Course1" element={<Course1/>} />
        <Route path="/Course2" element={<Course2/>} />
        <Route path="/Course3" element={<Course3/>} />
        <Route path="/Course4" element={<Course4/>} />
        </Routes>
        
          {/* Add more routes here for other pages */}
        
      </div>
    </Router>
  );
}


export default App;

