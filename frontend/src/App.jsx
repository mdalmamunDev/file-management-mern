import "./App.css";
import { Toaster } from "react-hot-toast";
import Login from "./roots/Login";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Signup from "./roots/Signup";
import PasswordForgot from "./roots/PasswordForgot";
import MyFiles from "./roots/MyFiles";
import FileList from "./roots/FileList";
import CalendarFileList from "./roots/CalendarFileList";
import Profile from "./roots/Profile";

function App() {

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
        <Route path="/file_calander" element={<CalendarFileList />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
