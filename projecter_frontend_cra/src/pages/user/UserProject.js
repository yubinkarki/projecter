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
import axios from "axios";
import clearLocalPersistAction from "../../redux/actions/ClearLocalPersistAction";

const drawerWidth = 240;

const userSidebarItems = [
  {
    id: 1,
    text: "Dashboard",
    icon: <DashboardCustomizeOutlinedIcon />,
    route: "/user/dashboard",
  },
  {
    id: 2,
    text: "Project",
    icon: <FileCopyOutlinedIcon />,
    route: "/user/project",
  },
  {
    id: 3,
    text: "Task",
    icon: <AssignmentTurnedInOutlinedIcon />,
    route: "/user/task",
  },
  {
    id: 4,
    text: "Team",
    icon: <PeopleAltOutlinedIcon />,
    route: "/user/team",
  },
  {
    id: 5,
    text: "Profile",
    icon: <PersonOutlineOutlinedIcon />,
    route: "/user/profile",
  },
  {
    id: 6,
    text: "Logout",
    icon: <LogoutOutlinedIcon />,
    route: "/login",
  },
];

const UserProject = (props) => {
  const currentRoute = "/user/project";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [projectStatus, setProjectStatus] = useState("all");
  const [userProject, setUserProject] = useState([]);
  const { userData } = useSelector((state) => state.login);

  useEffect(() => {
    document.title = "Project";

    async function getUserProject() {
      const userData = await axios.get("http://localhost:3000/user/getone", {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });

      const userProjectData = [];

      userProjectData.push(userData.data.user.currentProject);

      userData.data.user.previousProject.map((item) =>
        userProjectData.push(item)
      );

      const projectData = await axios.get(
        "http://localhost:3000/project/getmany",
        { params: { projectId: userProjectData } }
      );

      var manyProjectData = projectData.data.manyProjects;

      var projectManagerId = [];

      projectData.data.manyProjects.map((item) =>
        projectManagerId.push(item.projectManager)
      );

      const projectManagerDetails = await axios.get(
        "http://localhost:3000/user/getmany",
        { params: { userId: projectManagerId } }
      );

      var projectManagerNames = [];

      projectManagerId.map((item) =>
        projectManagerDetails.data.manyUsers.filter(
          (val) =>
            val._id === item &&
            projectManagerNames.push(`${val.firstName} ${val.lastName}`)
        )
      );

      manyProjectData.map(
        (item, index) => (item.projectManagerName = projectManagerNames[index])
      );

      setUserProject(manyProjectData);
    }

    getUserProject();
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
            overallCount={userProject.length}
            inProgressCount={
              userProject.filter(
                (value) => value.projectStatus === "inprogress"
              ).length
            }
            completedCount={
              userProject.filter((value) => value.projectStatus === "completed")
                .length
            }
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
            ? userProject
                .filter(
                  (value) =>
                    value.projectStatus === "inprogress" ||
                    value.projectStatus === "assigned"
                )
                .map(
                  (item) =>
                    (item.projectStatus === "inprogress" ||
                      item.projectStatus === "assigned") && (
                      <UserProjectCard
                        key={item._id}
                        title={item.projectName}
                        pm={item.projectManagerName}
                        status={item.projectStatus}
                        memberCount={item.projectMembers.length}
                      />
                    )
                )
            : projectStatus === "completed"
            ? userProject
                .filter((value) => value.projectStatus === "completed")
                .map(
                  (item) =>
                    item.projectStatus === "completed" && (
                      <UserProjectCard
                        key={item._id}
                        title={item.projectName}
                        pm={item.projectManagerName}
                        status={item.projectStatus}
                        memberCount={item.projectMembers.length}
                      />
                    )
                )
            : userProject.map((item) => (
                <UserProjectCard
                  key={item._id}
                  title={item.projectName}
                  pm={item.projectManagerName}
                  status={item.projectStatus}
                  memberCount={item.projectMembers.length}
                />
              ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default UserProject;
