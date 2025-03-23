import React, { useState } from "react";
import ItemList from "../comps/ItemList";
import Header from "../comps/Header";
import BreadcrumbNavigation from "../comps/BreadcrumbNavigation";
import api from "../api/api";

export default () => {
    const [privacyPass, setPrivacyPass] = useState("");
    const [isAccessGranted, setIsAccessGranted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post(
                "auth/privacy_check",
                { password: privacyPass },
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
        
            if (response.data.success) {
              setIsAccessGranted(true);
            } else {
              alert("Incorrect password. Please try again.");
            }
          } catch (error) {
            console.error("Login failed:", error);
            alert("An error occurred. Please try again.");
          }
    };

    return (<>
        {isAccessGranted ?
            (
                <div>
                    {/* Header */}
                    <Header />

                    <div className="container-fluid p-4">
                        {/* Breadcrumb Navigation */}
                        <BreadcrumbNavigation item={"Privet" || 'Unknown'} />

                        {/* Recent Items */}
                        <ItemList query="?group=private" />
                    </div>
                </div>)
            :
            (
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="card mt-5">
                                <div className="card-body">
                                    <h5 className="card-title">Private Folder</h5>
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="privacyPass">Password</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="privacyPass"
                                                value={privacyPass}
                                                onChange={(e) => setPrivacyPass(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-primary mt-3">
                                            Enter Folder
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

    </>);
};
