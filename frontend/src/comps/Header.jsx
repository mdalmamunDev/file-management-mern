
import { House, Person, Lock } from "react-bootstrap-icons";
import icon from "./../assets/img/app-icon.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-dark bg-dark p-3">
      <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center" href="#">
          <img src={icon} alt="App Logo" width="40" height="40" className="me-2" />
          <span className="text-white">File Manager</span>
        </a>
        <div className="d-flex">
          <Link to="/my_files" href="#" className="text-white me-3"><House size={30} title="Home" /></Link>
          <Link to='/file_list' href="#" className="text-white me-3"><Lock size={30} title="Privacy Folder" /></Link>
          <Link to="/profile" className="text-white me-3"><Person size={30} title="My Account" /></Link>
        </div>
      </div>
    </nav>
  )
}

export default Header;