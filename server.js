const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// VIEWS ROUTES
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/develop/public/notes.html"));
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/develop/public/index.html"));
});

// API ROUTES
app.get("/api/notes", (req, res) => {
  res.json();
});

app.post("/api/notes", (req, res) => {
  res.json();
});

app.delete("/api/notes/:id", (req, res) => {
  res.json();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
