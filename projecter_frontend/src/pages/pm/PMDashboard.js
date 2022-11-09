import { React, useEffect, useState } from "react";
import profileImg from "../../assets/images/profile4.svg";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import styles from "../../assets/styles/component_styles/Sidebar.module.scss";
import TaskCard from "../../components/dashboard/TaskCard";
import ProjectCard from "../../components/dashboard/ProjectCard";
import TeamMemberCard from "../../components/dashboard/TeamMemberCard";
import EventCard from "../../components/dashboard/EventCard";
import NoticeCard from "../../components/dashboard/NoticeCard";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LOG_IN, USER_DATA } from "../../redux/containers/Constant";
import { ToastContainer } from "react-toastify";
import clearLocalPersistAction from "../../redux/actions/ClearLocalPersistAction";

const drawerWidth = 240;

const userSidebarItems = [
  {
    id: 1,
    text: "Dashboard",
    icon: <DashboardCustomizeOutlinedIcon />,
    route: "/pm/dashboard",
  },
  {
    id: 2,
    text: "Project",
    icon: <FileCopyOutlinedIcon />,
    route: "/pm/project",
  },
  {
    id: 3,
    text: "Task",
    icon: <AssignmentTurnedInOutlinedIcon />,
    route: "/pm/task",
  },
  {
    id: 4,
    text: "Team",
    icon: <PeopleAltOutlinedIcon />,
    route: "/pm/team",
  },
  {
    id: 5,
    text: "Profile",
    icon: <PersonOutlineOutlinedIcon />,
    route: "/pm/profile",
  },
  {
    id: 6,
    text: "Logout",
    icon: <LogoutOutlinedIcon />,
    route: "/login",
  },
];

const PMDashboard = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentRoute = "/pm/dashboard";
  const { userData } = useSelector((state) => state.login);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  const drawer = (
    <div className={styles.navBar}>
      <Toolbar className={styles.badge}>
        <div>
          <h1 className={styles.h1}>Projecter</h1>
        </div>
      </Toolbar>
      <Divider />
      <Grid container className={styles.userInfo}>
        <Grid item>
          <img src={profileImg} alt="profile" className={styles.profileImage} />
        </Grid>
        <Grid item>
          <div>
            <h2 className={styles.h2} style={{ color: "white" }}>
              {userData.firstName} {userData.lastName}
            </h2>
          </div>
          <div>
            <h3 className={styles.h3}>{userData.designation}</h3>
          </div>
        </Grid>
      </Grid>
      <List>
        {userSidebarItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            {item.text === "Logout" ? (
              <ListItemButton
                onClick={() => {
                  navigate(item.route);
                  sessionStorage.removeItem("token");
                  sessionStorage.removeItem("user");
                  dispatch(clearLocalPersistAction());
                  dispatch({ type: LOG_IN, payload: {} });
                  dispatch({ type: USER_DATA, payload: {} });
                }}
                disableRipple
                disableTouchRipple
                style={{
                  backgroundColor: currentRoute === item.route ? "#093E4A" : "",
                }}
              >
                <ListItemIcon style={{ paddingLeft: "10%", color: "white" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  style={{ paddingLeft: "5%" }}
                />
              </ListItemButton>
            ) : (
              <ListItemButton
                onClick={() => {
                  navigate(item.route);
                }}
                disableRipple
                disableTouchRipple
                style={{
                  backgroundColor: currentRoute === item.route ? "#093E4A" : "",
                }}
              >
                <ListItemIcon style={{ paddingLeft: "10%", color: "white" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  style={{ paddingLeft: "5%" }}
                />
              </ListItemButton>
            )}
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }} className={styles.wholePageBox}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
        className={styles.appBar}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuOutlinedIcon />
          </IconButton>
          <div style={{ margin: "0px" }}>
            <p className={styles.h2} style={{ margin: "0" }}>
              Welcome Yubin
            </p>
          </div>
        </Toolbar>
        <Divider />
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "rgb(9, 65, 77)",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "rgb(9, 65, 77)",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
        className={styles.contentBox}
      >
        <Toolbar />
        <Grid
          container
          columnSpacing={{ xs: 4, sm: 4, md: 4, lg: 4, xlg: 4 }}
          rowSpacing={{ xs: 4, sm: 4, md: 4, lg: 4, xlg: 4 }}
          style={{ marginBottom: "20px" }}
        >
          <TaskCard />
          <ProjectCard />
          <TeamMemberCard />
        </Grid>
        <Grid
          container
          columnSpacing={{ xs: 4, sm: 4, md: 4, lg: 4, xlg: 4 }}
          rowSpacing={{ xs: 4, sm: 4, md: 4, lg: 4, xlg: 4 }}
          style={{ marginBottom: "4%" }}
        >
          <EventCard />
          <NoticeCard />
          <ToastContainer position="top-right" autoClose={4000} />
        </Grid>
      </Box>
    </Box>
  );
};

export default PMDashboard;
