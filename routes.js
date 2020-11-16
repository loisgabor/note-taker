module.export = "";

app.get("/", (req, res) => {
  res.sendFile(path.join(_dirname, "/develop/public/index.html"));
});
