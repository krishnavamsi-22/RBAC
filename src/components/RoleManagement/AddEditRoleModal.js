import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import roleApi from "../../api/roleApi";

const AddEditRoleModal = ({ open, onClose, role, onRefresh }) => {
  const [formData, setFormData] = useState({
    name: "",
    permissions: [],
  });

  useEffect(() => {
    if (role) {
      setFormData(role);
    }
  }, [role]);

  const togglePermission = (permission) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter((p) => p !== permission)
        : [...prev.permissions, permission],
    }));
  };

  const handleSubmit = async () => {
    if (role) {
      await roleApi.updateRole(role.id, formData);
    } else {
      await roleApi.addRole(formData);
    }
    onRefresh();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{role ? "Edit Role" : "Add Role"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Role Name"
          fullWidth
          margin="normal"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <div>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.permissions.includes("Read")}
                onChange={() => togglePermission("Read")}
              />
            }
            label="Read"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.permissions.includes("Write")}
                onChange={() => togglePermission("Write")}
              />
            }
            label="Write"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.permissions.includes("Delete")}
                onChange={() => togglePermission("Delete")}
              />
            }
            label="Delete"
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditRoleModal;
