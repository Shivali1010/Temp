const express = require("express");
const router = express.Router();

const myBooks = { 
    status: 200, 
    description: "User's books", 
    shelves: {
        "want_to_read": ["The Wuthering Heights", "India that is Bharat"],
        "currently_reading": ["To Kill A Mockingbird", "India that is Bharat"],
        "already_read": ["Murder on the Orient", "Pride and Prejudice"]
    }
};

router.get("/home", (req, res) => {
    res.json({ status: 200, description: "User home page"});
});

router.get("/mybooks", (req, res) => {
    res.json(myBooks);
});

//Post request to add a new shelf
router.post("/mybooks", (req, res) => {
    const newShelves = req.body;
    for(newShelf of newShelves) {
        myBooks.shelves[newShelf] = [];
    }
    res.json(myBooks);
});

//Get request for a particular shelf
router.get("/mybooks/shelves", (req, res) => {
    const { shelf } = req.query;
    res.json(myBooks.shelves[shelf]);
});

//Post request to add a book to a particular shelf
router.post("/mybooks/shelves", (req, res) => {
    const { shelf } = req.query;
    const newBooks = req.body;
    myBooks.shelves[shelf] = myBooks.shelves[shelf].concat(newBooks);
    res.json(myBooks.shelves[shelf]);
});


module.exports = router;