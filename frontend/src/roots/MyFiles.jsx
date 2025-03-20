import React from "react";
import { Folder, FileEarmark, Plus, Upload, Image, Film, MusicNote, FileText, House, Person, Clock, Lock, ThreeDots, ThreeDotsVertical, Heart, HeartFill } from "react-bootstrap-icons";
import icon from "./../assets/img/app-icon.png";
import { Link } from "react-router-dom";

const fileTypes = [
  { name: "Folder", icon: <Folder size={40} className="text-warning" />, count: 5, size: "5.03GB" },
  { name: "Image", icon: <Image size={40} className="text-success" />, count: 6351, size: "5.03GB" },
  { name: "Videos", icon: <Film size={40} className="text-danger" />, count: 6351, size: "5.03GB" },
  { name: "Audios", icon: <MusicNote size={40} className="text-primary" />, count: 6351, size: "5.03GB" },
  { name: "Documents", icon: <FileText size={40} className="text-secondary" />, count: 6351, size: "5.03GB" },
  { name: "Favorites", icon: <HeartFill size={40} className="text-danger" />, count: 6351, size: "5.03GB" },
];

const recentItems = [
  { name: "Presentation.pptx", time: "10 mins ago", icon: <FileEarmark size={30} className="text-primary" /> },
  { name: "Notes.txt", time: "1 hour ago", icon: <FileText size={30} className="text-secondary" /> },
  { name: "Project.zip", time: "Yesterday", icon: <Folder size={30} className="text-warning" /> },
  { name: "Movie.mp4", time: "Yesterday", icon: <Film size={30} className="text-danger" /> },
];

export default () => {
  return (
    <div>
      {/* Header */}
      <nav className="navbar navbar-dark bg-dark p-3">
        <div className="container-fluid">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <img src={icon} alt="App Logo" width="40" height="40" className="me-2" />
            <span className="text-white">File Manager</span>
          </a>
          <div className="d-flex">
            <a href="#" className="text-white me-3"><House size={30} title="Home" /></a>
            <a href="#" className="text-white me-3"><Lock size={30} title="Privacy Folder" /></a>
            <a href="#" className="text-white me-3"><Person size={30} title="My Account" /></a>
          </div>
        </div>
      </nav>
      
      <div className="container-fluid p-4">
        {/* Breadcrumb Navigation */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item active" aria-current="page">My Drive</li>
          </ol>
        </nav>
        
        {/* Storage Info */}
        <div className="alert alert-info d-flex justify-content-between align-items-center">
          <strong>Storage Used:</strong> <span>25 GB / 100 GB</span>
        </div>
        
        {/* File Type Summary */}
        <div className="row mb-3">
          {fileTypes.map((file, index) => (
            <Link to='/file_list' key={index} className="col-md-2 col-sm-4 col-6 mb-2 text-decoration-none">
              <div className="card p-3 shadow-sm">
                <div className="d-flex align-items-center">
                  {file.icon}
                  <h3 className="mb-0 ms-1">{file.name}</h3>
                </div>
                <div className="card-body px-0">
                  <small className="mb-0">Total Items: {file.count}</small>
                  <br/>
                  <small className="mb-0">Total Size: {file.size}</small>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Recent Items */}
        <h5 className="mt-4">Recent Items</h5>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
          {recentItems.map((item, index) => (
            <div key={index} className="col">
              <div className="card p-3 shadow-sm d-flex flex-row align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  {item.icon}
                  <div className="ms-2">
                    <h6 className="mb-0">{item.name}</h6>
                    <small className="text-muted">
                      <Clock size={16} className="me-1" />
                      {item.time}
                    </small>
                  </div>
                </div>
                <details className="dropdown">
                  <summary className="btn p-1 border-0 bg-transparent text-black">
                    <ThreeDotsVertical size={20} />
                  </summary>
                  <div className="dropdown-menu show position-absolute end-0 mt-1 p-2 shadow-sm rounded">
                    <a className="dropdown-item" href="#">Favorite</a>
                    <a className="dropdown-item" href="#">Details</a>
                    <a className="dropdown-item" href="#">Rename</a>
                    <a className="dropdown-item" href="#">Copy</a>
                    <a className="dropdown-item text-danger" href="#">Delete</a>
                  </div>
                </details>
              </div>
            </div>
          ))}
        </div>
        
        {/* Action Button */}
        <div className="position-fixed" style={{ bottom: 20, right: 20 }}>
          <button className="btn btn-primary rounded-circle p-2">
            <Plus size={30} className="text-white" title="Add File" />
          </button>
        </div>
      </div>
    </div>
  );
};