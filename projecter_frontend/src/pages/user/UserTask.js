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
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import styles from "../../assets/styles/component_styles/Sidebar.module.scss";
import ProjectMenu from "../../components/project/ProjectMenu";
import UserTaskCard from "../../components/task/UserTaskCard";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LOG_IN, USER_DATA } from "../../redux/containers/Constant";
import clearLocalPersistAction from "../../redux/actions/ClearLocalPersistAction";
import axios from "axios";

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

const UserTask = (props) => {
  const currentRoute = "/user/task";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { window } = props;
  const { userData } = useSelector((state) => state.login);
  const loggedInUser = `${userData.firstName} ${userData.lastName}`;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [projectStatus, setProjectStatus] = useState("all");
  const [projectTasks, setProjectTasks] = useState([]);
  const [projectManager, setProjectManager] = useState();

  useEffect(() => {
    document.title = "Task";

    async function getTasksData() {
      // This api call gives the logged in user info. We need projectId from this one.
      const userData = await axios.get("http://localhost:3000/user/getone", {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });

      // This api call gives project data based on the id.
      const currentProjectData = await axios.get(
        `http://localhost:3000/project/get/${userData.data.user.currentProject}`
      );

      // This api call gives user data.
      const projectManagerData = await axios.get(
        `http://localhost:3000/user/getoneuser/${currentProjectData.data.project.projectManager}`
      );

      setProjectManager(
        `${projectManagerData.data.userData.firstName} ${projectManagerData.data.userData.lastName}`
      );

      // This api call gives an array of task id of the current project via it's id.
      const tasksId = await axios.get(
        "http://localhost:3000/task/getusertasks",
        { params: { projectId: userData.data.user.currentProject } }
      );

      // This api call gives full details of tasks via their respective ids.
      const tasksData = await axios.get(
        "http://localhost:3000/task/getmanytasks",
        { params: { taskId: tasksId.data.currentTaskId } }
      );

      var projectTasksData = tasksData.data.manyTasks;

      var taskOwnerId = [];

      tasksData.data.manyTasks.map((item) => taskOwnerId.push(item.taskOwner));

      // This api call gives full details of many users via their respective ids.
      const taskOwnerDetails = await axios.get(
        "http://localhost:3000/user/getmany",
        { params: { userId: taskOwnerId } }
      );

      var taskOwnerNames = [];

      taskOwnerId.map((item) =>
        taskOwnerDetails.data.manyUsers.filter(
          (val) =>
            val._id === item &&
            taskOwnerNames.push(`${val.firstName} ${val.lastName}`)
        )
      );

      projectTasksData.map(
        (item, index) => (item.taskOwnerName = taskOwnerNames[index])
      );

      setProjectTasks(projectTasksData);
    }

    getTasksData();
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
              Tasks
            </p>
          </div>
        </Toolbar>
        <Grid container>
          <ProjectMenu
            setAll={setAll}
            setInProgress={setInProgress}
            setCompleted={setCompleted}
            searchPlaceHolder="Tasks"
            overallCount={projectTasks.length}
            inProgressCount={
              projectTasks.filter(
                (value) =>
                  value.taskStatus === "inprogress" &&
                  value.taskOwnerName === loggedInUser
              ).length
            }
            completedCount={
              projectTasks.filter((value) => value.taskStatus === "completed")
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
            ? projectTasks
                .filter(
                  (value) =>
                    value.taskStatus === "inprogress" &&
                    value.taskOwnerName === loggedInUser
                )
                .map(
                  (item) =>
                    (item.taskStatus === "inprogress" ||
                      item.taskStatus === "assigned") && (
                      <UserTaskCard
                        key={item._id}
                        title={item.taskName}
                        pm={projectManager}
                        status={item.taskStatus}
                        assignee={item.taskOwnerName}
                      />
                    )
                )
            : projectStatus === "completed"
            ? projectTasks
                .filter(
                  (value) =>
                    value.taskStatus === "completed" &&
                    value.taskOwnerName === loggedInUser
                )
                .map(
                  (item) =>
                    item.taskStatus === "completed" && (
                      <UserTaskCard
                        key={item._id}
                        title={item.taskName}
                        pm={projectManager}
                        status={item.taskStatus}
                        assignee={item.taskOwnerName}
                      />
                    )
                )
            : projectTasks.map((item) => (
                <UserTaskCard
                  key={item._id}
                  title={item.taskName}
                  pm={projectManager}
                  status={item.taskStatus}
                  assignee={item.taskOwnerName}
                />
              ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default UserTask;
