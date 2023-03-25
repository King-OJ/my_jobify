import { Error, Landing, PrivateRoute, Register } from "./pages";
import SharedLayout from './pages/dashboard/SharedLayout';
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import {AddJob, AllJobs, Profile, Stats} from './pages/dashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <PrivateRoute>
            <SharedLayout/>
          </PrivateRoute>
        }>
          <Route index element={<Stats />}/>
          <Route path="add-job" element={<AddJob />}/>
          <Route path="profile" element={<Profile />}/>
          <Route path="all-jobs" element={<AllJobs />}/>
        </Route>
        
        <Route path='/landing' element={<Landing />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='*' element={<Error />}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
