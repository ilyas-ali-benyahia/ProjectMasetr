



import LandingPage from './landinpage'
import {
 
  Routes,
  Route,
  BrowserRouter,
  

} from "react-router-dom";


import SmartContentUpload from './dashbord';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/dashbord" element={<SmartContentUpload/>} />
    </Routes>
    </BrowserRouter>
    
  )
}

export default App