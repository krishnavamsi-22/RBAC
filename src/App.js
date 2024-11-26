import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container, AppBar, Toolbar, Typography, Button } from "@mui/material";
import UserList from "./components/UserManagement/UserList";
import RoleList from "./components/RoleManagement/RoleList";

const App = () => {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            RBAC Dashboard
          </Typography>
          <Button color="inherit" href="/">
            Users
          </Button>
          <Button color="inherit" href="/roles">
            Roles
          </Button>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: "20px" }}>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/roles" element={<RoleList />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
