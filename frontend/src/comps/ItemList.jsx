import React, { useState, useEffect, useRef } from "react";
import { Clock, Dot, ThreeDotsVertical, Plus, Copy, Folder } from "react-bootstrap-icons";
import ItemIcon from "./ItemIcon";
import { useGlobal } from "../context/GlobalProvider";
import { Link } from "react-router-dom";
import api from "../api/api";
import axios from "axios";

export default ({ query }) => {
    const [items, setItems] = useState([]);
    const { timeAgo, urlGenerate } = useGlobal();
    const [parentId, setParentId] = useState(null);
    const [showRI, setShowRI] = useState(false);
    const [newName, setNewName] = useState();
    const [showCF, setShowCF] = useState(false);
    const [showCopy, setShowCopy] = useState(false);
    const [showMove, setShowMove] = useState(false);
    const [allFolders, setAllFolders] = useState([]);
    const [folderName, setFolderName] = useState("New Folder");

    const fileInputRef = useRef(null);


    const getData = async (parentId = null) => {
        try {
            let url = "items";
            if (parentId) {
                url += `?parent_id=${parentId}`;
                setParentId(parentId); // Set the parentId for the action button
            } else if (query) {
                url += query;
            }

            const response = await api.get(url);
            const {items, folders} = response.data;
            setAllFolders(folders || []);
            setItems(items);
        } catch (error) {
            console.error("Fetch failed:", error);
        }
    };

    useEffect(() => {
        if (query && query.includes("parent_id")) {    // If the query includes parent_id, fetch items for that parent
            const parentId = new URLSearchParams(query).get("parent_id");
            getData(parentId);
        } else {    // Default fetch for root-level items
            getData();
        }
    }, [query]);

    const deleteItem = async (_id) => {
        try {
            await api.delete(`items/${_id}`);
            getData(parentId); // Refresh list after deletion
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    const doFavorite = async (item) => {
        if (!item) return;

        try {
            await api.put(`items/${item._id}`, { is_favorite: !item.is_favorite }, {
                headers: {
                    "Content-Type": "application/json", // Set content type to JSON if sending JSON data
                },
            });
            getData(parentId); // Refresh list after marking as favorite
        } catch (error) {
            console.error("Error updating favorite:", error);
        }
    };

    const renameItem = async (e, _id) => {
        e.preventDefault();
        if (!_id) return;

        try {
            await api.put(`items/${_id}`, { name: newName }, {
                headers: {
                    "Content-Type": "application/json", // Set content type to JSON if sending JSON data
                },
            });
            setShowRI(false);
            setNewName('');
            getData(parentId); // Refresh list after renaming
        } catch (error) {
            console.error("Error updating name:", error);
        }
    };

    const copyItem = async (_id, parent_id) => {
        if (!_id || !parent_id) return;

        try {
            await api.post(`items/copy`, { _id, parent_id }, {
                headers: {
                    "Content-Type": "application/json", // Set content type to JSON if sending JSON data
                },
            });
            setShowCopy(false);
            getData(parentId); // Refresh list after renaming
        } catch (error) {
            console.error("Error updating parent | Copy:", error);
        }
    };

    const moveItem = async (_id, parent_id) => {
        if (!_id || !parent_id) return;

        try {
            await api.put(`items/${_id}`, { parent_id }, {
                headers: {
                    "Content-Type": "application/json", // Set content type to JSON if sending JSON data
                },
            });
            setShowCopy(false);
            getData(parentId); // Refresh list after renaming
        } catch (error) {
            console.error("Error updating parent | Copy:", error);
        }
    };
    const handleFileClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("name", file.name);
        formData.append("type", file.type);
        formData.append("size", file.size);
        formData.append("parent_id", parentId || '');

        try {
            const token = localStorage.getItem('token'); // Retrieve token
            const response = await axios.post(urlGenerate('api/items'), formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}` // Attach token for authentication
                }
            });

            console.log("Upload successful:", response.data);
            if (response.data) {
                const { item, message } = response.data;
                setItems(prevItems => [...prevItems, item]); // Update state with new item
                alert(message);
                getData(parentId); // Refresh list after upload
            }
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Failed to upload file.");
        }
    };

    const createFolder = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token'); // Retrieve token
            await axios.post(urlGenerate('api/items/folders'), 
            {
                name: folderName || '',
                parent_id: parentId || '',
            }, {
                headers: {
                    Authorization: `Bearer ${token}` // Attach token for authentication
                }
            });

            alert("Folder created");
            setShowCF(false); // Close folder creation form
            getData(parentId); // Refresh list after creating folder
        } catch (error) {
            alert("Failed to create folder.");
        }
    };

    const openFile = (item) => {
        // Check if the file is an image type (like jpg, png, gif, etc.)
        // const fileExtension = item.name.split('.').pop().toLowerCase();
        const imageExtensions = ['image', 'folder'];

        if (imageExtensions.includes(item.type)) {
            return;
            // // Open image in a new tab
            // window.open(urlGenerate(item.path), "_blank");
        } else {
            // For other file types, handle download or other action
            const token = localStorage.getItem('token');
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            axios.get(urlGenerate(item.path), { headers, responseType: 'blob' })
                .then((response) => {
                    const fileBlob = response.data;
                    const url = window.URL.createObjectURL(fileBlob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.
                    a.download = item.name; // Name the file for download
                    a.click();
                    window.URL.revokeObjectURL(url);
                })
                .catch((error) => {
                    console.error("Error downloading file:", error);
                });
        }
    };

    return (
        <>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-1">
                {items && items.map((item, index) => (
                    <div key={index} className="col">
                        <div className="card p-3 shadow-sm d-flex flex-row align-items-center justify-content-between">
                            <Link
                                to={item.type === 'folder' ? `/file_list?parent_id=${item._id}&parent_name=${item.name}` : urlGenerate(item.path)}
                                className="d-flex align-items-center text-decoration-none text-black"
                                onClick={() => openFile(item)} // Open the file on click
                            >
                                <ItemIcon type={item.type} />
                                <div className="ms-2">
                                    <h6 className="mb-0">{item.name.length > 20 ? `${item.name.slice(0, 20)}...` : item.name}</h6>
                                    <small className="text-muted">
                                        <Clock size={16} className="me-1" />
                                        {timeAgo(item.createdAt)}
                                    </small>
                                    {item.type === 'folder' &&
                                        <small className="text-muted">
                                            <Dot size={20} />
                                            {item.childCount} Items
                                        </small>
                                    }
                                </div>
                            </Link>
                            <details className="dropdown">
                                <summary className="btn p-1 border-0 bg-transparent text-black">
                                    <ThreeDotsVertical size={20} />
                                </summary>
                                <div className="dropdown-menu show position-absolute end-0 mt-1 p-2 shadow-sm rounded">
                                    {/* Favorite */}
                                    <button onClick={() => { doFavorite(item) }} className="dropdown-item">
                                        {item.is_favorite ? 'Unfavorite' : 'Favorite'}
                                    </button>

                                    {/* Rename */}
                                    {showRI &&
                                        <form className="d-flex" onSubmit={(e) => renameItem(e, item._id)}>
                                            <input
                                                className="form-control"
                                                placeholder="Rename Item"
                                                style={{ width: 200 }}
                                                value={newName}
                                                onChange={(e) => setNewName(e.target.value)}
                                            />
                                            <button className="btn btn-primary" type="submit">
                                                Ok
                                            </button>
                                        </form>
                                    }
                                    {!showRI &&
                                        <button className="dropdown-item" onClick={() => { setShowRI(true); setNewName(item.name) }}>
                                            Rename
                                        </button>
                                    }

                                    {/* Copy */}
                                    {showCopy &&
                                        <>
                                        <div className="dropdown-item">
                                            <Copy size={20}/>
                                            Copy Here
                                        </div>
                                        <ul style={{width: 200, maxHeight: 300, backgroundColor: '#fff5f5', overflow: 'auto', listStyleType: 'none'}}>
                                            {allFolders.map((folder, index) => (
                                            <li 
                                                className="cursor-pointer" key={index} style={{ cursor: 'copy' }}
                                                onClick={() => copyItem(item._id, folder._id)}
                                                onMouseEnter={(e) => e.target.style.backgroundColor = '#f1f1f1'} 
                                                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                                title="Copy here"
                                            >
                                                <Folder className="me-1"/>
                                                {folder.name}
                                            </li>
                                            ))}
                                        </ul>
                                      </>
                                    }
                                    {!showCopy &&
                                        <button className="dropdown-item" onClick={() => setShowCopy(true)}>Copy</button>
                                    }

                                    {/* Move */}
                                    {showMove &&
                                        <>
                                        <div className="dropdown-item">
                                            <Copy size={20}/>
                                            Move Here
                                        </div>
                                        <ul style={{width: 200, maxHeight: 300, backgroundColor: '#fff5f5', overflow: 'auto', listStyleType: 'none'}}>
                                            {allFolders.map((folder, index) => (
                                            <li 
                                                className="cursor-pointer" key={index} style={{ cursor: 'move' }}
                                                onClick={() => moveItem(item._id, folder._id)}
                                                onMouseEnter={(e) => e.target.style.backgroundColor = '#f1f1f1'} 
                                                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                                title="Move here"
                                            >
                                                <Folder className="me-1"/>
                                                {folder.name}
                                            </li>
                                            ))}
                                        </ul>
                                      </>
                                    }
                                    {!showMove &&
                                        <button className="dropdown-item" onClick={() => setShowMove(true)}>Move</button>
                                    }

                                    {/* Delete */}
                                    <button onClick={() => { deleteItem(item._id) }} className="dropdown-item text-danger">Delete</button>
                                </div>
                            </details>
                        </div>
                    </div>
                ))}
                {(!items || items.length === 0) && 
                    <div className="alert alert-warning w-100 text-center">
                        No items found
                    </div>
                }
            </div>

            {/* Floating Action Button */}
            <div className="position-fixed" style={{ bottom: 20, right: 20 }}>
                <details className="dropdown" style={{ position: "relative" }}>
                    <summary
                        className="btn btn-secondary rounded-circle p-2"
                        style={{ cursor: "pointer" }}
                    >
                        <Plus size={30} className="text-white" title="Add File" />
                    </summary>

                    {/* Dropdown menu */}
                    <div className="dropdown-menu show" style={{
                        position: 'absolute',
                        right: 0,
                        bottom: 40,
                        padding: '10px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        backgroundColor: '#fff',
                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                    }}>
                        {showCF &&
                            <form className="d-flex" onSubmit={createFolder}>
                                <input
                                    className="form-control"
                                    placeholder="Create Folder"
                                    style={{ width: 200 }}
                                    value={folderName}
                                    onChange={(e) => setFolderName(e.target.value)}
                                />
                                <button className="btn btn-primary" type="submit">
                                    Ok
                                </button>
                            </form>
                        }
                        {!showCF &&
                            <button className="dropdown-item" onClick={() => setShowCF(true)}>
                                Create Folder
                            </button>
                        }
                        <button className="dropdown-item" onClick={handleFileClick}>
                            Upload File
                        </button>
                    </div>
                </details>

                {/* Hidden File Input */}
                <input
                    type="file"
                    ref={fileInputRef}
                    className="d-none"
                    onChange={handleFileChange}
                />
            </div>
        </>
    );
};
