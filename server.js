const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8080;
const { v4: uuidv4 } = require("uuid");
const notes = [];
const fs = require("fs");

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//API ROUTES
app.get("/api/notes", (req, res) => {
  return res.json(
    JSON.parse(fs.readFileSync(path.join(__dirname, "./db/db.json")))
  );
});
// app.get("/api/notes:id", (req, res) => {
//   res.json(data, req.params.id);
// });

app.post("/api/notes", (req, res) => {
  let newNote = req.body;
  newNote.id = uuidv4();
  const notes = JSON.parse(
    fs.readFileSync(path.join(__dirname, "./db/db.json"))
  );
  notes.push(newNote);
  //   fs.readFileSync(path.join(__dirname, "./db/db.json"));

  return res.json(notes);
});

app.delete("/api/notes/:id", (req, res) => {
  let id = req.params.id;
  console.log(`the id for this route is ${id}`);
  const notesToDelete = JSON.parse(
    fs.readFileSync(path.join(__dirname, "./db/db.json"))
  );

  let deleteNote = notesToDelete.filter((notes) => note.id != id);
  deleteNote.forEach((element) => (element.id = deleteNote.indexOf(element)));

  fs.writeFileSync("./db/db.json", JSON.stringify(deleteNote));

  return res.json(notesToDelete);
});

//VIEW ROUTES
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
