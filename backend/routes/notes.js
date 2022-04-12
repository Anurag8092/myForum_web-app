const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//Route 1: Get all the user specific notes: GET "/api/notes/fetchallnotes". Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Some error occured");
  }
});

//Route 2: Get all the user notes: GET "/api/notes/displayallnotes". Login not required

router.get("/displayallnotes", (req, res) => {
  try {
    Note.find({}, (err, foundNotes) => {
        res.json(foundNotes);
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Some error occured");
  }
})


//Route 3: Add a new note using: POST "/api/notes/addnote". Login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Desciption must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      // If there are errors, return bad request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        userId: req.user.id,
        userEmail: req.user.email,
        userName: req.user.name,
        timestamp: new Date().toLocaleString()
      });
      const savedNote = await note.save();
      console.log(savedNote.id);
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Some error occured");
    }
  }
);

//Route 4: Update a existing note using: PUT "/api/notes/updatenote". Login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    //Create a new note object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //Find the note to be updated
    let note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404).send("Not Found");
    }
    if (note.userId.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Some error occured");
  }
});

//Add Comments to discussions. Login required
router.put("/reply/:id", fetchuser, async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);
    // console.log(note);

  if (!note) {
    res.status(404).send("Not Found");
  }
  note = await Note.findByIdAndUpdate(
    req.params.id,
    {$push: {
      "replies":{
        name: req.user.name,
        reply: req.body.reply,
        timestamp: new Date().toLocaleString()
      } 
    }},
    { new: true }
  );
  res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Some error occured");

  }
  
})



//Route 5: Delete a existing note using: DELETE "/api/notes/deletenote". Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    //Find the note to be deleted
    let note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404).send("Not Found");
    }

    // Allow Deletion only if user owns the founded note
    if (note.userId.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note Succesfully Deleted", note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Some error occured");
  }
});

//View Specific Notes using: GET "/api/notes/viewnote/:id" No login required
router.get("/viewnote/:id",async (req, res) => {
  try {
    //Find the note to be viewed
    const note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404).send("Not Found");
    }
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Some error occured");
  }
});

//View only tags' related notes using: GET "/api/notes/tag/:tag" No login required
router.get("/tag/:tag", async (req, res) => {
  try {
    //Find the note to be viewed
    const note = await Note.find({tag: req.params.tag});
    if (!note) {
      res.status(404).send("Not Found");
    }
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Some error occured");
  }
});





module.exports = router;
