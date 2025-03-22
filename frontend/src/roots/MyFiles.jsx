import React, { useEffect, useState } from "react";
import { Folder, Image, Film, MusicNote, FileText, HeartFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import Header from "../comps/Header";
import BreadcrumbNavigation from "../comps/BreadcrumbNavigation";
import ItemList from "../comps/ItemList";
import axios from "axios";
import { useGlobal } from "../context/GlobalProvider";
import api from "../api/api";
import ItemIcon from "../comps/ItemIcon";

export default () => {

  const [fileTypes, setFileTypes] = useState([])
  const [recentFiles, setRecentFiles] = useState([])

  const getData = async () => {
    try {
      const response = await api.get("frontend/my_files"); // No need to set headers manually
      if (response.data && response.data.data) {
        const { types, recent } = response.data.data;
        setFileTypes(types);
        setRecentFiles(recent);
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
          <strong>Storage Used:</strong> <span>25 GB / 100 GB</span>
        </div>

        {/* File Type Summary */}
        <div className="row mb-3">
          {fileTypes.map((file, index) => (
            <Link to={`/file_list?group=${file.type}`} key={index} className="col-md-2 col-sm-4 col-6 mb-2 text-decoration-none">
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

        {/* Recent Items */}
        <h5 className="mt-4">Recent Items</h5>
        <ItemList query="?group=recent"/>
      </div>
    </div>
  );
};