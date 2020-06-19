const router = require("express").Router();

var path = require("path");

router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/notes.html"));
});

router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/index.html"));
});

module.exports = router;