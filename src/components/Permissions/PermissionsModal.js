import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

const PermissionsModal = ({ open, onClose, role, permissions, onUpdate }) => {
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  useEffect(() => {
    if (role) {
      setSelectedPermissions(role.permissions || []);
    }
  }, [role]);

  const togglePermission = (permission) => {
    setSelectedPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission]
    );
  };

  const handleSave = () => {
    onUpdate(role.id, selectedPermissions);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Manage Permissions for {role?.name}</DialogTitle>
      <DialogContent>
        {permissions.map((permission) => (
          <FormControlLabel
            key={permission}
            control={
              <Checkbox
                checked={selectedPermissions.includes(permission)}
                onChange={() => togglePermission(permission)}
              />
            }
            label={permission}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PermissionsModal;
