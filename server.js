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

app.post("/api/notes", (req, res) => {
  let newNote = req.body;
  newNote.id = uuidv4();
  const notes = JSON.parse(
    fs.readFileSync(path.join(__dirname, "./db/db.json"))
  );
  notes.push(newNote);
  console.log(notes);
  let stringedNotes = JSON.stringify(notes);
  return res.json(fs.writeFileSync("./db/db.json", stringedNotes));

  //   return res.json(notes);
});

app.delete("/api/notes/:id", (req, res) => {
  let id = req.params.id;
  console.log(`the id for this route is ${id}`);
  const notes = JSON.parse(
    fs.readFileSync(path.join(__dirname, "./db/db.json"))
  );
  let saveNote = notes.filter((note) => note.id != id);
  fs.writeFileSync("./db/db.json", JSON.stringify(saveNote));
  return res.json(saveNote);
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
