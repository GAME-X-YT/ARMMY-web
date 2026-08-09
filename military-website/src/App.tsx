// // import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Home from './Page/Home';
// import Verify from "./components/Verify";
// import AdminDashboard from "./Page/AdminDashboard";
// import LiveSupport from './components/LiveSupport';
// import About from './Page/About';
// import TermsOfService from './components/Terms of Service';
 
// export function App() {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/Verify" element={<Verify handleVerify={undefined} code={undefined} setCode={undefined} loading={undefined} error={undefined} soldier={undefined} />} />
//         <Route path="/AdminDashboard" element={<AdminDashboard />} />
//         <Route path="/LiveSupport" element={<LiveSupport />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/terms" element={<TermsOfService />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './Page/Home';
// import Verify from "./components/Verify";
// import AdminDashboard from "./Page/AdminDashboard";
// import LiveSupport from './components/LiveSupport';
// import About from './Page/About';
// import TermsOfService from './components/Terms of Service';
// import PrivacyPolicy from './components/privacy';
// import Blog from './Page/BlogPage';
// import WardrobePage from './WardrobePage';

// export function App() {
//   const [code, setCode] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [soldier, setSoldier] = useState(null);

//   const handleVerify = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
    
//     try {
//       // Connect to your backend verification route here
//       const response = await fetch(`http://localhost:5000/api/verify/${code}`);
//       const data = await response.json();
      
//       if (!response.ok) {
//         throw new Error(data.message || 'Invalid or expired verification code.');
//       }
      
//       setSoldier(data);
//     } catch (err: any) {
//       setError(err.message || 'Network connection failed.');
//       setSoldier(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Router>
//       <div className="min-h-screen bg-black text-white flex flex-col selection:bg-amber-500 selection:text-black">
//         <main className="grow">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route 
//               path="/Verify" 
//               element={
//                 <Verify 
//                   handleVerify={handleVerify} 
//                   code={code} 
//                   setCode={setCode} 
//                   loading={loading} 
//                   error={error} 
//                   soldier={soldier} 
//                 />
//               } 
//             />
//             <Route path="/AdminDashboard" element={<AdminDashboard />} />
//             <Route path="/LiveSupport" element={<LiveSupport />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/terms" element={<TermsOfService />} />
//             <Route path="/privacy" element={<PrivacyPolicy />} />
//             <Route path="/blog" element={<Blog />} />
//             <Route path="/wardrobe" element={<WardrobePage />} />
//           </Routes>
//         </main>

//       </div>
//     </Router>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Page/Home';
import Verify from "./components/Verify";
import AdminDashboard from "./Page/AdminDashboard";
import LiveSupport from './components/LiveSupport';
import About from './Page/About';
import TermsOfService from './components/Terms of Service';
import PrivacyPolicy from './components/privacy';
import Blog from './Page/BlogPage';
import WardrobePage from './WardrobePage';

export function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white flex flex-col selection:bg-amber-500 selection:text-black">
        <main className="grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Verify" element={<Verify />} />
            <Route path="/AdminDashboard" element={<AdminDashboard />} />
            <Route path="/LiveSupport" element={<LiveSupport />} />
            <Route path="/about" element={<About />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/wardrobe" element={<WardrobePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;