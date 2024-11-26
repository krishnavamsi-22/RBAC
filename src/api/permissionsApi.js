const permissions = ["Read", "Write", "Delete", "Execute", "View Logs"];

const permissionsApi = {
  getAllPermissions: async () => {
    return Promise.resolve(permissions);
  },
};

export default permissionsApi;
