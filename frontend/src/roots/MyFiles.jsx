import React from "react";
import { Folder, Image, Film, MusicNote, FileText, HeartFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import Header from "../comps/Header";
import BreadcrumbNavigation from "../comps/BreadcrumbNavigation";
import ItemList from "../comps/ItemList";
import ActionButton from "../comps/ActionButton";

const fileTypes = [
  { name: "Folder", icon: <Folder size={40} className="text-warning" />, count: 5, size: "5.03GB" },
  { name: "Image", icon: <Image size={40} className="text-success" />, count: 6351, size: "5.03GB" },
  { name: "Videos", icon: <Film size={40} className="text-danger" />, count: 6351, size: "5.03GB" },
  { name: "Audios", icon: <MusicNote size={40} className="text-primary" />, count: 6351, size: "5.03GB" },
  { name: "Documents", icon: <FileText size={40} className="text-secondary" />, count: 6351, size: "5.03GB" },
  { name: "Favorites", icon: <HeartFill size={40} className="text-danger" />, count: 6351, size: "5.03GB" },
];

export default () => {
  return (
    <div>
      {/* Header */}
      <Header />
      
      <div className="container-fluid p-4">
        {/* Breadcrumb Navigation */}
        <BreadcrumbNavigation />
        
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
        <ItemList />
        
        {/* Action Button */}
        <ActionButton />
      </div>
    </div>
  );
};