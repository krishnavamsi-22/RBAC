import React from "react";
import RoleTableWithPermissions from "./RoleManagement/RoleTableWithPermissions";

const Dashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <RoleTableWithPermissions />
    </div>
  );
};

export default Dashboard;
