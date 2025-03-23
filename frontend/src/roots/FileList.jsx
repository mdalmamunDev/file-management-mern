import React from "react";
import Header from "../comps/Header";
import BreadcrumbNavigation from "../comps/BreadcrumbNavigation";
import ItemList from "../comps/ItemList";
import { useLocation } from "react-router-dom";


export default () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const group = searchParams.get('group');
  const parent_id = searchParams.get('parent_id');
  const parent_name = searchParams.get('parent_name');

  return (
    <div>
      {/* Header */}
      <Header />
      
      <div className="container-fluid p-4">
        {/* Breadcrumb Navigation */}
       <BreadcrumbNavigation item={parent_name || 'Unknown'}/>
        
        {/* Recent Items */}
        <ItemList query={`?group=${group || ''}&parent_id=${parent_id || ''}`}/>
      </div>
    </div>
  );
};