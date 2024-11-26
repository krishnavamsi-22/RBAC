const roles = [
  { id: 1, name: "Admin", permissions: ["Read", "Write", "Delete"] },
  { id: 2, name: "Viewer", permissions: ["Read"] },
];

const roleApi = {
  getAllRoles: async () => {
    return Promise.resolve(roles);
  },
  addRole: async (role) => {
    role.id = roles.length + 1;
    roles.push(role);
    return Promise.resolve(role);
  },
  updateRole: async (id, updatedRole) => {
    const index = roles.findIndex((r) => r.id === id);
    if (index !== -1) roles[index] = { ...roles[index], ...updatedRole };
    return Promise.resolve(roles[index]);
  },
  deleteRole: async (id) => {
    const index = roles.findIndex((r) => r.id === id);
    if (index !== -1) roles.splice(index, 1);
    return Promise.resolve(true);
  },
};

export default roleApi;
