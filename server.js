const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8080;
const { v4: uuidv4 } = require("uuid");
const notes = [];
const fs = require("fs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//VIEW ROUTES
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

//API ROUTES
app.get("/api/notes", (req, res) => {
  return res.json(
    JSON.parse(fs.readFileSync(path.join(__dirname, "./db/db.json")))
  );
});

app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  newNote.id = uuidv4();
  const notes = JSON.parse(
    fs.readFileSync(path.join(__dirname, "./db/db.json"))
  );

  fs.writeFileSync(path.join(__dirname, "./db/db.json"), JSON.stringify(notes));
  notes.push(newNote);
  return res.json(notes);
});
app.delete("/api/notes/:id", (req, res) => {
  let id = parseInt(req.params.id);
  const notesToDelete = JSON.parse(
    fs.readFileSync(path.join(__dirname, "./db/db.json"))
  );

  let deleteNote = notesToDelete.filter((notes) => note.id != id);
  deleteNote.forEach((element) => (element.id = deleteNote.indexOf(element)));

  fs.writeFileSync("./db/db.json", JSON.stringify(deleteNote));

  return res.json(notesToDelete);
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
