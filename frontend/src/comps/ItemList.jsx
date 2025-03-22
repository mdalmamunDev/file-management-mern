import React, { useState, useEffect } from "react";
import { Clock, ThreeDotsVertical } from "react-bootstrap-icons";
import ItemIcon from "./ItemIcon";
import ActionButton from "../comps/ActionButton";
import { useGlobal } from "../context/GlobalProvider";
import { Link } from "react-router-dom";
import api from "../api/api";

export default ({ query }) => {
    const [items, setItems] = useState([]);
    const { timeAgo, urlGenerate } = useGlobal();
    const [parentId, setParentId] = useState(null);

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
        if (query && query.includes("parent_id")) {
            // If the query includes parent_id, fetch items for that parent
            const parentId = new URLSearchParams(query).get("parent_id");
            getData(parentId);
        } else {
            // Default fetch for root-level items
            getData();
        }
    }, [query]);

    const deleteItem = async (_id) => {
        // console.log(_id);
        const response = await api.delete(`items/${_id}`);
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
                                </div>
                            </Link>
                            <details className="dropdown">
                                <summary className="btn p-1 border-0 bg-transparent text-black">
                                    <ThreeDotsVertical size={20} />
                                </summary>
                                <div className="dropdown-menu show position-absolute end-0 mt-1 p-2 shadow-sm rounded">
                                    <button className="dropdown-item">Favorite</button>
                                    <button className="dropdown-item">Rename</button>
                                    <button className="dropdown-item">Copy</button>
                                    <button onClick={() => {deleteItem(item._id)}} className="dropdown-item text-danger">Delete</button>
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
