import logo from './logo.svg';
import './App.css';
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from './UI/MainLayout';
import Login from './pages/Login/Login';
import AuthWrapper from './components/AuthWrapper';

function App() {
  const onSelectFiles = (event) => {
    const selectedFile = event.target.files[0]
    console.log(selectedFile);
    if (!selectedFile) return;

    const formData = new FormData();
    // formData.append("image", selectedFile);
    for (const file of event.target.files) {
      formData.append("image", file)
    }
    axios.post("http://localhost:5000/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTY1OGNmMGZjMmQwNGJiYjdlN2FjNjMiLCJ1c2VybmFtZSI6ImxhbiIsImVtYWlsIjoibGFuQG1haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkNVRycnlsdjg4eUJLWUw5Y0JuaGN6Ty5PSk9IR0taeWRxNS9adk90TS5WWjA3anlrRHZTajIiLCJfX3YiOjAsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwMTMyNDQ1N30.nFIT0n_3HDaN74j4Pr4HYiqElVSte6OM6V1jAGcSv6I",
      }
    })
      .then((response) => {
        console.log(response);

      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    // <div>
    //   <input type="file" multiple onChange={onSelectFiles} />
    // </div>
    <BrowserRouter>
      <Routes>
        <Route element={<AuthWrapper />}>
          <Route path="/" element={<MainLayout />}>
            <Route path="/login" element={<Login />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
