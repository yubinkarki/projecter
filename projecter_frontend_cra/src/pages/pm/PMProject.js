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
import ProjectMenu from "../../components/project/ProjectMenu";
import UserProjectCard from "../../components/project/UserProjectCard";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LOG_IN, USER_DATA } from "../../redux/containers/Constant";
import clearLocalPersistAction from "../../redux/actions/ClearLocalPersistAction";

const drawerWidth = 240;

const projectData = [
  {
    id: 1,
    title: "Project Management System",
    projectManager: "Yamamoto Taicho",
    status: "inprogress",
  },
  {
    id: 2,
    title: "Task Recording System",
    projectManager: "Brad Pitt",
    status: "completed",
  },
  {
    id: 3,
    title: "Health Checker",
    projectManager: "Wonder Woman",
    status: "completed",
  },
  {
    id: 4,
    title: "Personal Digital Wallet",
    projectManager: "Tom Cruise",
    status: "completed",
  },
  {
    id: 5,
    title: "Traffic Data Analysis",
    projectManager: "Topgun Maverick",
    status: "completed",
  },
];

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

const PMProject = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [projectStatus, setProjectStatus] = useState("all");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentRoute = "/pm/project";
  const { userData } = useSelector((state) => state.login);

  useEffect(() => {
    document.title = "Project";
  }, []);

  const setAll = () => {
    setProjectStatus("all");
  };

  const setInProgress = () => {
    setProjectStatus("inprogress");
  };

  const setCompleted = () => {
    setProjectStatus("completed");
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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
              Projects
            </p>
          </div>
        </Toolbar>
        <Grid container>
          <ProjectMenu
            setAll={setAll}
            setInProgress={setInProgress}
            setCompleted={setCompleted}
            searchPlaceHolder="Projects"
          />
        </Grid>
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
          style={{ marginBottom: "20px", marginTop: "3%" }}
        >
          {projectStatus === "inprogress"
            ? projectData
                .filter(
                  (value) =>
                    value.status === "inprogress" || value.status === "assigned"
                )
                .map(
                  (item) =>
                    (item.status === "inprogress" ||
                      item.status === "assigned") && (
                      <UserProjectCard
                        key={item.id}
                        title={item.title}
                        pm={item.projectManager}
                        status={item.status}
                      />
                    )
                )
            : projectStatus === "completed"
            ? projectData
                .filter((value) => value.status === "completed")
                .map(
                  (item) =>
                    item.status === "completed" && (
                      <UserProjectCard
                        key={item.id}
                        title={item.title}
                        pm={item.projectManager}
                        status={item.status}
                      />
                    )
                )
            : projectData.map((item) => (
                <UserProjectCard
                  key={item.id}
                  title={item.title}
                  pm={item.projectManager}
                  status={item.status}
                />
              ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default PMProject;
