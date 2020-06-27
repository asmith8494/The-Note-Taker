const fs = require("fs");
const path = require("path");
const util = require("util");
const {v1: uuidv1} = require("uuid");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {

    read() {
        return readFileAsync(path.join(__dirname, "../db/db.json"), "utf8");
    }

    write(notes) {
        return writeFileAsync(path.join(__dirname, "../db/db.json"), notes);
    }

    getNotes() {
        return this.read().then((data) => {
            return data ? JSON.parse(data): [];
        });
    }

    saveNotes(notes) {
        return this.write(JSON.stringify(notes));
    }

    addNote( note ) {
        
        return this.getNotes().then((notes) => {
            
            const newNote = { ...note, id: uuidv1() };

            notes.push(newNote);
            
            console.log("Current items");
            console.log(notes);

            return this.saveNotes(notes).then(() => newNote);
        });
    }

    deleteNote(id) {
        return this.getNotes().then((notes) => {
            for(var i = 0; i < notes.length; i++)
            {
                if(notes[i].id === id)
                    notes.splice(i, 1);
            }

            return this.saveNotes(notes).then(() => id);
        });
    }
}

module.exports = new Store();