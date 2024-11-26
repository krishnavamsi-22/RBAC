import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
} from "@mui/material";
import AddEditRoleModal from "./AddEditRoleModal";
import roleApi from "../../api/roleApi";

const RoleList = () => {
  const [roles, setRoles] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    const data = await roleApi.getAllRoles();
    setRoles(data);
  };

  const handleDelete = async (id) => {
    await roleApi.deleteRole(id);
    fetchRoles();
  };

  return (
    <div>
      <Button onClick={() => setOpenModal(true)} variant="contained">
        Add Role
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Role Name</TableCell>
              <TableCell>Permissions</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>{role.id}</TableCell>
                <TableCell>{role.name}</TableCell>
                <TableCell>{role.permissions.join(", ")}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      setSelectedRole(role);
                      setOpenModal(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button color="error" onClick={() => handleDelete(role.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddEditRoleModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedRole(null);
        }}
        role={selectedRole}
        onRefresh={fetchRoles}
      />
    </div>
  );
};

export default RoleList;
