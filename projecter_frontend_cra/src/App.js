import { Routes, Route } from "react-router-dom";
import { persistor, store } from "./redux/Store";
import { Provider } from "react-redux/es/exports";
import { PersistGate } from "redux-persist/integration/react";
import RequireAuth from "./components/RequireAuth";

import Layout from "./components/Layout";
import Home from "./pages/home/Home";
import Login from "./pages/home/Login";
import Signup from "./pages/home/Signup";
import PageNotFound from "./pages/home/PageNotFound";
import UnauthorizedPage from "./pages/home/UnauthorizedPage";

import UserDashboard from "./pages/user/UserDashboard";
import UserProject from "./pages/user/UserProject";
import UserTask from "./pages/user/UserTask";
import UserProfile from "./pages/user/UserProfile";
import UserChangePassword from "./pages/user/UserChangePassword";
import UserTeam from "./pages/user/UserTeam";

import PMDashboard from "./pages/pm/PMDashboard";
import PMProject from "./pages/pm/PMProject";
import PMTask from "./pages/pm/PMTask";
import PMProfile from "./pages/pm/PMProfile";
import PMChangePassword from "./pages/pm/PMChangePassword";
import PMTeam from "./pages/pm/PMTeam";

import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Public routes. */}
            <Route path="/" element={<Home />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="unauthorized" element={<UnauthorizedPage />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />

            {/* User role routes. */}
            <Route element={<RequireAuth allowedRoles={"user"} />}>
              <Route path="user/dashboard" element={<UserDashboard />} />
              <Route path="user/project" element={<UserProject />} />
              <Route path="user/task" element={<UserTask />} />
              <Route path="user/profile" element={<UserProfile />} />
              <Route
                path="user/profile/changepassword"
                element={<UserChangePassword />}
              />
              <Route path="user/team" element={<UserTeam />} />
            </Route>

            {/* Project Manager routes. */}
            <Route element={<RequireAuth allowedRoles={"pm"} />}>
              <Route path="pm/dashboard" element={<PMDashboard />} />
              <Route path="pm/project" element={<PMProject />} />
              <Route path="pm/task" element={<PMTask />} />
              <Route path="pm/profile" element={<PMProfile />} />
              <Route
                path="pm/profile/changepassword"
                element={<PMChangePassword />}
              />
              <Route path="pm/team" element={<PMTeam />} />
            </Route>
          </Route>
        </Routes>
      </PersistGate>
    </Provider>
  );
}

export default App;
