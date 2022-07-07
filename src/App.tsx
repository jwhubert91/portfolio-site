import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Profile from './pages/Profile';

function App() {
  return (
    <div className='min-w-screen min-h-screen m-0 p-0'>
     <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:profileId" element={<Profile />} />
        </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;