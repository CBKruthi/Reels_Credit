
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import ReelsFeed from './pages/ReelsFeed';
// import ProfilePage from './pages/ProfilePage';

// function App() {
//   return (
    
//      <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<ReelsFeed />} />
//         <Route path="/studio" element={<ReelsFeed />} />
//         <Route path="/profile/:username" element={<ProfilePage />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }


// export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReelsFeed from './pages/ReelsFeed';
import ProfilePage from './pages/ProfilePage';
import Dashboard from './pages/Dashboard';
import ReelUpload from './pages/ReelUpload';
import CreditRedemption from './pages/CreditRedemption';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ReelsFeed />} />
        <Route path="/studio" element={<ReelsFeed />} />
        <Route path="/reels" element={<ReelsFeed />} />
        <Route path="/profile/:username" element={<ProfilePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<ReelUpload />} />
        <Route path="/redeem" element={<CreditRedemption />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;