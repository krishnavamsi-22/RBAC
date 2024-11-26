const users = [
  {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Bob",
    email: "bob@example.com",
    role: "Viewer",
    status: "Inactive",
  },
];

const userApi = {
  getAllUsers: async () => {
    return Promise.resolve(users);
  },
  addUser: async (user) => {
    user.id = users.length + 1;
    users.push(user);
    return Promise.resolve(user);
  },
  updateUser: async (id, updatedUser) => {
    const index = users.findIndex((u) => u.id === id);
    if (index !== -1) users[index] = { ...users[index], ...updatedUser };
    return Promise.resolve(users[index]);
  },
  deleteUser: async (id) => {
    const index = users.findIndex((u) => u.id === id);
    if (index !== -1) users.splice(index, 1);
    return Promise.resolve(true);
  },
};

export default userApi;
