import React from 'react';
import '/Users/MaxK-W/Project-4-Team-5/Project-4-Team-5/src/App.css';
import ConfirmLink from '/Users/MaxK-W/Project-4-Team-5/Project-4-Team-5/src/Components/confirmlink.js';
function Dashboard() {
  return (
    <div>

      <div class = "banner"><h1>Welcome to the Student Dashboard</h1></div>
      <ul>
        
         <div class = "link-box"><ConfirmLink to ="/course1" message = "VERIFICATION">Course 1</ConfirmLink></div> 
     
     
         <div class = "link-box"><ConfirmLink to = "/course2" message = "VERIFICATION">Course 2</ConfirmLink></div> 
       
        
         <div class = "link-box"><ConfirmLink to = "/course3" message = "VERIFICATION">Course 3</ConfirmLink></div> 
        
       
         <div class = "link-box"><ConfirmLink to ="/course4" message = "VERIFICATION">Course 4</ConfirmLink></div> 
       
      
      </ul>
    </div>
  );
}

export default Dashboard;