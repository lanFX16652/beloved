import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from './UI/MainLayout';
import Homepage from './pages/Homepage/Homepage';
import Shoppage from "./pages/Shoppage/Shoppage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/shoppage" element={<Shoppage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
