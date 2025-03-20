import React from "react";
import Header from "../comps/Header";
import BreadcrumbNavigation from "../comps/BreadcrumbNavigation";
import ItemList from "../comps/ItemList";
import ActionButton from "../comps/ActionButton";


export default () => {
  return (
    <div>
      {/* Header */}
      <Header />
      
      <div className="container-fluid p-4">
        {/* Breadcrumb Navigation */}
       <BreadcrumbNavigation item="Item List"/>
        
        {/* Recent Items */}
        <ItemList/>
        
        {/* Action Button */}
        <ActionButton />
      </div>
    </div>
  );
};