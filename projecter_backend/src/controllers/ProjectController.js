const projectModel = require("../src/models/ProjectModel");
const _ = require("lodash");

// Create new project - by admin.
module.exports.addProject = async (req, res) => {
  try {
    let projectData = _.pick(req.body, [
      "projectName",
      "projectDescription",
      "projectStatus",
      "projectDeadline",
      "projectManager",
    ]);

    req.body.projectManager = req.body.id;
    await projectModel.create(projectData);

    return res.status(202).json({
      status: true,
      msg: "Project created successfully",
    });
  } catch (err) {
    return res.status(500).json({
      createError: true,
      msg: "Project creation failed",
    });
  }
};

// Update project details - by admin and pm.
module.exports.updateProject = async (req, res) => {
  try {
    const project = await projectModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!project) {
      return res
        .status(400)
        .json({ noProject: true, msg: "Project not found" });
    }

    return res
      .status(200)
      .json({ status: true, msg: "Project updated successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ status: false, msg: "Updating project failed" });
  }
};

// Delete project - by admin.
module.exports.deleteProject = async (req, res) => {
  try {
    const project = await projectModel.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ notFound: true, msg: "Project not found" });
    }

    return res
      .status(200)
      .json({ status: true, msg: "Project deleted successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ status: false, msg: "Project deletion failed" });
  }
};

// Get one project by it's id - by admin and pm.
module.exports.getOneProject = async (req, res) => {
  try {
    const project = await projectModel.findById(req.params.id);

    if (!project) {
      return res
        .status(404)
        .json({ noProject: true, msg: "Project not found" });
    }

    return res
      .status(200)
      .json({ status: true, msg: "Project found", project });
  } catch (err) {
    res.status(504).json({ status: false, msg: "Error getting the project" });
  }
};

// Get multiple projects with their ObjectId for user/project page.
module.exports.getManyProjects = async (req, res) => {
  const projectId = req.query.projectId;

  try {
    const manyProjects = await projectModel.find({
      _id: {
        $in: projectId,
      },
    });

    return res
      .status(200)
      .json({ status: true, msg: "Projects found successfully", manyProjects });
  } catch (err) {
    res.status(504).json({ status: false, msg: "Error getting the projects" });
  }
};

// Get all projects in the database - by admin.
module.exports.getAllProjects = async (req, res) => {
  try {
    const projects = await projectModel.find();

    if (projects.length > 0) return res.json({ status: true, projects });

    return res
      .status(404)
      .json({ emptyProject: true, msg: "Projects not found" });
  } catch (err) {
    return res
      .status(400)
      .json({ status: false, msg: "Error getting projects" });
  }
};

// Add users to a project.
module.exports.addProjectMember = async (req, res) => {
  try {
    const { userId, projectId } = req.body;
    const checkExistingMember = await projectModel.findOne({ projectId });
    let checkUser;

    checkExistingMember.projectMembers.map((item) => {
      if (item.valueOf() == userId) {
        checkUser = false;
        return checkUser;
      }
    });

    if (checkUser === false) {
      return res.json({ status: false, msg: "User is already in a project" });
    } else {
      await projectModel.updateOne({ $push: { projectMembers: userId } });
      return res
        .status(200)
        .json({ status: true, msg: "User added to project" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ status: false, msg: "Error adding user to project" });
  }
};
