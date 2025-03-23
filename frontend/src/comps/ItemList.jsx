import React, { useState, useEffect } from "react";
import { Clock, Dot, ThreeDotsVertical } from "react-bootstrap-icons";
import ItemIcon from "./ItemIcon";
import ActionButton from "../comps/ActionButton";
import { useGlobal } from "../context/GlobalProvider";
import { Link } from "react-router-dom";
import api from "../api/api";

export default ({ query }) => {
    const [items, setItems] = useState([]);
    const { timeAgo, urlGenerate } = useGlobal();
    const [parentId, setParentId] = useState(null);
    const [showRI, setShowRI] = useState(false);
    const [newName, setNewName] = useState();

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
            setItems(response.data);
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
        const response = await api.delete(`items/${_id}`);
    }

    const doFavorite = async (item) => {
        if (!item) return;

        try {
            const response = await api.put(`items/${item._id}`, { is_favorite: !item.is_favorite }, {
                headers: {
                    "Content-Type": "application/json", // Set content type to JSON if sending JSON data
                },
            });
        } catch (error) {
            console.error("Error updating favorite:", error);
        }
    }

    const renameItem = async (e, _id) => {
        e.preventDefault();
        if (!_id) return;

        try {
            const response = await api.put(`items/${_id}`, { name: newName }, {
                headers: {
                    "Content-Type": "application/json", // Set content type to JSON if sending JSON data
                },
            });
        } catch (error) {
            console.error("Error updating name:", error);
        }
    }

    return (
        <>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-1">
                {items && items.map((item, index) => (
                    <div key={index} className="col">
                        <div className="card p-3 shadow-sm d-flex flex-row align-items-center justify-content-between">
                            <Link
                                to={item.type === 'folder' ? `/file_list?parent_id=${item._id}&parent_name=${item.name}` : urlGenerate(item.path)}
                                className="d-flex align-items-center  text-decoration-none text-black">
                                <ItemIcon type={item.type} />
                                <div className="ms-2">
                                    <h6 className="mb-0">{item.name}</h6>
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
                                    <button onClick={() => { doFavorite(item) }} className="dropdown-item">
                                        {item.is_favorite ? 'Unfavorite' : 'Favorite'}
                                    </button>
                                    {showRI &&
                                        <form className="d-flex" onSubmit={(e) => renameItem(e, item._id)}>
                                            <input
                                                className="form-control"
                                                placeholder="Create Folder"
                                                style={{ width: 200 }}
                                                value={newName}
                                                onChange={(e) => setNewName(e.target.value)}
                                            />
                                            <button className="btn btn-primary" type="submit" >
                                                Ok
                                            </button>
                                        </form>
                                    }
                                    {!showRI &&
                                        <button className="dropdown-item" onClick={() => {setShowRI(true); setNewName(item.name)}}>
                                            Rename
                                        </button>
                                    }
                                    <button className="dropdown-item">Copy</button>
                                    <button onClick={() => { deleteItem(item._id) }} className="dropdown-item text-danger">Delete</button>
                                </div>
                            </details>
                        </div>
                    </div>
                ))}
            </div>

            {/* Action Button */}
            <ActionButton parentId={parentId} items={items} setItems={setItems} />
        </>
    );
};
