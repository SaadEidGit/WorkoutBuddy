// npx create-react-app frontend creates the react app inside the frontend folder
// npm install react-router-dom to add different pages to this app

import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { useAuthContext } from "./hooks/useAuthContext"

// pages & components
import Home from './pages/home';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import WorkoutPlans from './pages/WorkoutPlans';

function App() {
  const { user } = useAuthContext()
  
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route path="/" element={user ? <WorkoutPlans /> : <Navigate to="/login" />}/>
            <Route path="/signup" element={!user ? <Signup/> : <Navigate to="/"/>}/>
            <Route path="/login" element={!user ? <Login/> : <Navigate to="/"/>}/>
            <Route path="/workouts/:planId" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
