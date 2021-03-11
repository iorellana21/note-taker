const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


app.get("/", function (req, res) {
    console.log("main page");
    // res.json(path.join(__dirname, "public/index.html"));
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function (req, res) {
    console.log("notes page");
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", function (req, res) {
    console.log("read db.json");
    // Should read the `db.json` file and return all saved notes as JSON
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data))
    });
});

app.post("/api/notes", function (req, res) {
    // Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        console.log(data);

        let notes = JSON.parse(data);

        let noteId;
        if (!notes.length) {
            noteId = 1;
        }
        else {
            noteId = notes[notes.length - 1].id + 1;
        }

        console.log(noteId);

        let newNote = req.body;
        newNote.id = noteId;

        notes.push(newNote);

        fs.writeFile('db/db.json', JSON.stringify(notes), (err, data) => {
            if (err) throw err;
            console.log(data);
        });

        res.send("new note added");
    });
});

app.delete("/api/notes/:id", function (req, res) {
    // Should receive a query parameter containing the id of a note to delete
    // need to find a way to give each note a unique `id` when it's saved
    // need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        console.log(data);

        let notes = JSON.parse(data); // replace req.params.id with data bc data being received is an array
        
        notes = notes.filter( note => note.id !== parseInt(req.params.id));

        fs.writeFile('db/db.json', JSON.stringify(notes), (err, data) => {
            if (err) throw err;
            console.log(data);
        });

        res.send("note deleted");
    });
});

app.listen(PORT, function () {
    console.log(`listening on http://localhost:${PORT}`);
});