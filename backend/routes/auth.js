const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const JWT_SECRET = "HellothisisAnurag";

//Route 1: Create a user using: POST "/api/auth/createuser". no login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 5 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;
    // If there are errors, return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    // Check whether the user with this email already exists
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, error: "Sorry a user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      // Create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.error("Error"+error.message);
      res.status(500).json({success, error:"Internal Some error occured"});
    }
  }
);

//Route 2: Authenticate a user using: POST "/api/auth/login". no login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "passwords cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    // If there are errors, return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ success, error: "Please try to login with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ success, error: "Please try to login with correct credentials" });
      
        }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.error("Error: " +error.message);
      res.status(500).send("Internal Some error occured");
    }
  }
);

//Route 3: Get logged in user details: POST "/api/auth/getuser". Login required
router.get("/getuser", fetchuser, async (req, res) => {

  try {
    res.json(req.user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Some error occured");
  }

});

//Route 4: Update user details: POST "/api/auth/updateuser". Login required
router.put("/updateuser", fetchuser, async(req, res) => {
  const {name, email} = req.body
  try {
   let user = await User.findByIdAndUpdate({_id: req.user.id}, {
      $set: 
      {name: name,
      email: email}
    });
    res.json({ Success: "Updated", user });
  } 
  catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Some error occured");
  }
    
  })


//Route 5: Delete user: POST "/api/auth/getuser". Login required
router.delete("/deleteuser", fetchuser, async(req, res) => {
  try{
   let user = await User.findByIdAndDelete(req.user.id)
   res.json({ Success: "Deleted", user });
  } 
  catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Some error occured");
  }
    
  })


module.exports = router;
