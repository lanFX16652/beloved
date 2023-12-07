import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from './UI/MainLayout';
import Homepage from './pages/Homepage/Homepage';
import Shoppage from "./pages/Shoppage/Shoppage";
import Detailpage from "./pages/Detailpage/Detailpage";
import Login from './pages/Login/Login';
import Cartpage from './pages/Cartpage/Cartpage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/shoppage" element={<Shoppage />} />
          <Route path="/detailpage/:productId" element={<Detailpage />} />
          <Route path="/cartpage" element={<Cartpage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
