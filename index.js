const express = require("express");

const server = express();
server.use(express.json());

let numberOfRequests = 0;
const projects = [];

function logRequests(req, res, next) {
  numberOfRequests++;
  console.log(`Number of requests: ${numberOfRequests}`);
  return next();
}

function checkProjectExists(req, res, next) {
  const project = projects.find(p => p.id === req.params.id);
  if (!project) {
    return res.status(400).json({ error: "Project not found" });
  }

  return next();
}

server.use(logRequests);

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.get("/projects/:id", checkProjectExists, (req, res) => {
  const project = projects.find(p => p.id === req.params.id);

  return res.json(project);
});

server.post("/projects", (req, res) => {
  const { id, title } = req.body;
  const project = { id, title, tasks: [] };

  projects.push(project);

  return res.json(projects);
});

server.put("/projects/:id", checkProjectExists, (req, res) => {
  const { title } = req.body;
  const project = projects.find(p => p.id === req.params.id);

  project.title = title;

  return res.json(project);
});

server.delete("/projects/:id", checkProjectExists, (req, res) => {
  const projectIndex = projects.findIndex(
    project => project.id === req.params.id
  );

  projects.slice(projectIndex, 1);

  return res.send();
});

server.post("/projects/:id/tasks", checkProjectExists, (req, res) => {
  const project = projects.find(p => p.id === req.params.id);
  const { title } = req.body;

  project.tasks.push(title);

  return res.json(project);
});

server.listen(3000);
