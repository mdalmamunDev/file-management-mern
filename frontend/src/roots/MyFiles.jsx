import React, { useEffect, useState } from "react";
import { Calendar2Date, FolderSymlink } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import Header from "../comps/Header";
import BreadcrumbNavigation from "../comps/BreadcrumbNavigation";
import ItemList from "../comps/ItemList";
import api from "../api/api";
import ItemIcon from "../comps/ItemIcon";

export default () => {

  const [fileTypes, setFileTypes] = useState([])
  const [usedStorage, setUsedStorage] = useState([])

  const getData = async () => {
    try {
      const response = await api.get("frontend/my_files"); // No need to set headers manually
      if (response.data && response.data.data) {
        const { types, used_storage } = response.data.data;
        setFileTypes(types);
        setUsedStorage(used_storage);
      }
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  };


  useEffect(() => {
    getData();
  }, []);


  return (
    <div>
      {/* Header */}
      <Header />

      <div className="container-fluid p-4">
        {/* Breadcrumb Navigation */}
        <BreadcrumbNavigation />

        {/* Storage Info */}
        <div className="alert alert-info d-flex justify-content-between align-items-center">
          <strong>Storage Used:</strong> <span>{usedStorage} / 5 GB</span>
        </div>

        {/* File Type Summary */}
        <div className="row mb-3">
          {fileTypes.map((file, index) => (
            <Link
              to={`/file_list?group=${file.type}&parent_name=${file.name}`}
              key={index}
              className="col-md-2 col-sm-4 col-6 mb-2 text-decoration-none"
            >
              <div className="card p-3 shadow-sm">
                <div className="d-flex align-items-center">
                  {/* Conditionally render icons based on the file name */}
                  <ItemIcon type={file.type} />
                  <h3 className="mb-0 ms-1">{file.name}</h3>
                </div>
                <div className="card-body px-0">
                  <small className="mb-0">Total Items: {file.count}</small>
                  <br />
                  <small className="mb-0">Total Size: {file.size}</small>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Browse All Section */}
        <Link
          to="/file_list?group=all&parent_name=Browse All"
          className="col-md-2 col-sm-4 col-6 mb-2 text-decoration-none"
        >
          <div className="card p-3 shadow-sm">
            <div className="d-flex align-items-center justify-content-center">
              <FolderSymlink size={30} className="me-2" /> {/* Folder Icon */}
              <h3 className="mb-0 ms-1">Browse All</h3>
            </div>
          </div>
        </Link>

        {/* Recent Items */}
        <div className="mt-5 d-flex justify-content-between align-items-center">
          <h5 className="mt-4">Recent Items</h5>
          <Link to="/file_calendar" className="text-decoration-none text-secondary" title="Calendar view">
            <Calendar2Date size={20} className="me-2" />
          </Link>
        </div>
        <ItemList query="?group=recent" />
      </div>
    </div>
  );
};