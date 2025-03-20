import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import Login from "./roots/Login";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Signup from "./roots/Signup";
import PasswordForgot from "./roots/PasswordForgot";
import MyFiles from "./roots/MyFiles";
import FileList from "./roots/FileList";

function App() {
  const [root, setRoot] = useState("Home");
  const [proList, setProList] = useState([]);
  const [pro, setPro] = useState();

  useEffect(() => {
    const getProList = async () => {
      try {
        const res = await axios.get("http://localhost:3000/programmer");
        setProList(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProList();
  }, []);

  return (
    <Router>
      {/* <Header setRoot={setRoot} /> */}
  
      {/* <Footer /> */}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/password_forgot" element={<PasswordForgot />} />
        <Route path="/my_files" element={<MyFiles />} />
        <Route path="/file_list" element={<FileList />} />
      </Routes>
    </Router>
  );
}

export default App;
