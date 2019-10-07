const express = require("express");

const server = express();
server.use(express.json());

const projects = [];

function checkProjectInArray(req, res, next) {
  const project = projects.filter(project => {
    return project.id === index;
  });

  req.project = project;

  return next();
}

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.get("/projects/:index", (req, res) => {
  const { index } = req.params;

  const project = projects.filter(project => {
    return project.id === index;
  });

  return res.json(project);
});

server.post("/projects", (req, res) => {
  const { id, title } = req.body;
  const project = { id, title, tasks: [] };

  projects.push(project);

  return res.json(projects);
});

server.listen(3000);
