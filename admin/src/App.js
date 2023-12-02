import logo from './logo.svg';
import './App.css';
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from './UI/MainLayout';
import Login from './pages/Login/Login';
import AuthWrapper from './components/AuthWrapper';
import Dashboard from './pages/Dashboard/Dashboard';
import Products from './pages/Products/Products';
import AddProduct from './pages/AddProduct/AddProduct';

function App() {

  return (
    // <div>
    //   <input type="file" multiple onChange={onSelectFiles} />
    // </div>
    <BrowserRouter>
      <Routes>
        <Route element={<AuthWrapper />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<Products />} />
            <Route path="/add-product" element={<AddProduct />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
