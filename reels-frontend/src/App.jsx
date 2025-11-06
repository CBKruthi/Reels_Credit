
// // import { BrowserRouter, Routes, Route } from "react-router-dom";
// // import ReelsFeed from './pages/ReelsFeed';
// // import ProfilePage from './pages/ProfilePage';

// // function App() {
// //   return (
    
// //      <BrowserRouter>
// //       <Routes>
// //         <Route path="/" element={<ReelsFeed />} />
// //         <Route path="/studio" element={<ReelsFeed />} />
// //         <Route path="/profile/:username" element={<ProfilePage />} />
// //       </Routes>
// //     </BrowserRouter>
// //   );
// // }


// // export default App;



// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import ReelsFeed from './pages/ReelsFeed';
// import ProfilePage from './pages/ProfilePage';
// import Dashboard from './pages/Dashboard';
// import ReelUpload from './pages/ReelUpload';
// import CreditRedemption from './pages/CreditRedemption';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import ProtectedRoute from './components/ProtectedRoute';
// import Header from './components/Header.jsx';

// function App() {
//   return (
//     <BrowserRouter>
//       <Header />
//       <Routes>
//         <Route path="/" element={<ReelsFeed />} />
//         <Route path="/studio" element={<ReelsFeed />} />
//         <Route path="/reels" element={<ReelsFeed />} />
//         <Route path="/profile/:username" element={<ProfilePage />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/upload" element={<ReelUpload />} />
//         <Route path="/redeem" element={<CreditRedemption />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />


        
//         <Route
//           path="/upload"
//           element={
//             <ProtectedRoute roles={["user", "creator", "admin"]}>
//               <ReelUpload />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/redeem"
//           element={
//             <ProtectedRoute roles={["user", "creator"]}>
//               <CreditRedemption />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute roles={["creator"]}>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />

//         {/* Role-based routes */}
//         <Route
//           path="/studio"
//           element={
//             <ProtectedRoute roles={["creator"]}>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>

//     </BrowserRouter>
//   );
// }

// export default App;




// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Header from "./components/Header";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import Feed from "./pages/Feed";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Header />
//       <Routes>
//         <Route path="/" element={<Feed />} />
//         <Route path="/feed" element={<Feed />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }



// import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
// import ReelsFeed from './pages/ReelsFeed';
// import ProfilePage from './pages/ProfilePage';
// import Dashboard from './pages/Dashboard';
// import ReelUpload from './pages/ReelUpload';
// import CreditRedemption from './pages/CreditRedemption';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import ProtectedRoute from './components/ProtectedRoute';


// function AppContent() {
//   const location = useLocation();
//   const hideHeaderRoutes = ["/login", "/register"]; // Header hidden here

//   return (
//     <>
//       {!hideHeaderRoutes.includes(location.pathname) && <Header />}
//       <Routes>
//         <Route path="/" element={<ReelsFeed />} />
//         <Route path="/feed" element={<ReelsFeed />} />
//         <Route path="/studio" element={<ReelsFeed />} />
//         <Route path="/reels" element={<ReelsFeed />} />
//         <Route path="/profile/:username" element={<ProfilePage />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/upload" element={<ReelUpload />} />
//         <Route path="/redeem" element={<CreditRedemption />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         {/* ✅ Protected routes (role-based) */}
//         <Route
//           path="/upload"
//           element={
//             <ProtectedRoute roles={["user", "creator", "admin"]}>
//               <ReelUpload />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/redeem"
//           element={
//             <ProtectedRoute roles={["user", "creator"]}>
//               <CreditRedemption />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute roles={["creator"]}>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/studio"
//           element={
//             <ProtectedRoute roles={["creator"]}>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </>
//   );
// }

// export default function App() {
//   return (
//     <BrowserRouter>
//       <AppContent />
//     </BrowserRouter>
//   );
// }



import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReelsFeed from './pages/ReelsFeed';
import ProfilePage from './pages/ProfilePage';
import Dashboard from './pages/Dashboard';
import ReelUpload from './pages/ReelUpload';
import CreditRedemption from './pages/CreditRedemption';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<ReelsFeed />} />
//         <Route path="/feed" element={<ReelsFeed />} />
//         <Route path="/studio" element={<ReelsFeed />} />
//         <Route path="/reels" element={<ReelsFeed />} />
//         <Route path="/profile/:username" element={<ProfilePage />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/upload" element={<ReelUpload />} />
//         <Route path="/redeem" element={<CreditRedemption />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route
          path="/upload"
          element={
            <ProtectedRoute roles={["user", "creator", "admin"]}>
              <ReelUpload />
            </ProtectedRoute>
          }
        />
        <Route
          path="/redeem"
          element={
            <ProtectedRoute roles={["user", "creator"]}>
              <CreditRedemption />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute roles={["creator"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/studio"
          element={
            <ProtectedRoute roles={["creator"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
