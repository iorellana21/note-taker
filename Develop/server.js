const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 8080;

app.get("/", function (req, res) {
    console.log("main page");
    // res.json(path.join(__dirname, "public/index.html"));
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function (req, res) {
    console.log("notes page");
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", function (req, res) {
    // Should read the `db.json` file and return all saved notes as JSON
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data))
    });
});

app.post("/api/notes", function (req, res) {
    // Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client
});

app.delete("/api/notes/:id", function (req, res) {
    // Should receive a query parameter containing the id of a note to delete
    // need to find a way to give each note a unique `id` when it's saved
    // need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file
});


app.listen(PORT, function () {
    console.log(`listening on http://localhost:${PORT}`);
});