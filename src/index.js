import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SubjectPage from './subjectPage/SubjectPage';
import TechSupportPage from './techSupportPage/TechSupportPage';
import ClassPage from './subjectPage/ClassPage';
import StudentCode from './studentCode/StudentCode';
import LoginPage from './login.js';
import UserContext from './usercontext';
// import AdminTicketsPage from './adminTicketsPage/AdminTicketsPage'
import TicketPage from './ticketPages/ticketPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage/>
  },
  {
    path: "/dashboard",
    element: <App/>
  },
  {
    path: "subjectPage/SubjectPage",
    element: <SubjectPage/>
  },
  {
    path: "subjectPage/ClassPage",
    element: <ClassPage/>
  },
  {
    path: "techSupportPage",
    element: <TechSupportPage/>
  }, 
  {
    path: "studentCode",
    element: <StudentCode/>
  },
  {
    path: "tickets", // this path will go once the combined all user ticket page is created
    element: <TicketPage/>
  }
])

function RootComponent() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <RouterProvider router={router}>
        {/* Rest of your app components */}
      </RouterProvider>
    </UserContext.Provider>
  );
}

// Render the RootComponent
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RootComponent />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
