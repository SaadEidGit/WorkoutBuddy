import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { WorkoutsContextProvider } from './context/WorkoutContext';
import { WorkoutPlansContextProvider } from './context/WorkoutPlanContext';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <WorkoutPlansContextProvider>
        <WorkoutsContextProvider>
          <App />
        </WorkoutsContextProvider>
      </WorkoutPlansContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
