import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import roleApi from "../../api/roleApi";
import permissionsApi from "../../api/permissionsApi";
import PermissionsModal from "../PermissionManagement/PermissionsModal";

const RoleTableWithPermissions = () => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchRolesAndPermissions = async () => {
      const fetchedRoles = await roleApi.getAllRoles();
      const fetchedPermissions = await permissionsApi.getAllPermissions();
      setRoles(fetchedRoles);
      setPermissions(fetchedPermissions);
    };
    fetchRolesAndPermissions();
  }, []);

  const handleOpenModal = (role) => {
    setSelectedRole(role);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedRole(null);
    setOpen(false);
  };

  const handleUpdatePermissions = async (roleId, updatedPermissions) => {
    await roleApi.updateRole(roleId, { permissions: updatedPermissions });
    const updatedRoles = await roleApi.getAllRoles();
    setRoles(updatedRoles);
  };

  return (
    <div>
      <h2>Roles and Permissions</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Role</TableCell>
            <TableCell>Permissions</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roles.map((role) => (
            <TableRow key={role.id}>
              <TableCell>{role.name}</TableCell>
              <TableCell>{role.permissions.join(", ")}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  onClick={() => handleOpenModal(role)}
                >
                  Manage Permissions
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedRole && (
        <PermissionsModal
          open={open}
          onClose={handleCloseModal}
          role={selectedRole}
          permissions={permissions}
          onUpdate={handleUpdatePermissions}
        />
      )}
    </div>
  );
};

export default RoleTableWithPermissions;
