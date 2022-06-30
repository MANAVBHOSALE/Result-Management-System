const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router()

// importing user context
const Admin = require("../model/admin");

// Login
router.post('/login',async (req, res) => {
// Our login logic starts here
try {
    // Get user input
    const { stud_id, password } = req.body;

    // Validate user input
    if (!(stud_id && password)) {
      res.status(400).send("All input is required");
      return;
    }
    // Validate if user exist in our database
    const admin = await Admin.findOne({ stud_id });

    if (admin && (await bcrypt.compare(password, admin.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: Admin._id, stud_id },
        process.env.JWT_KEY,
        {
          expiresIn: "3h",
        }
      );

      // save user token
      admin.token = token;

      // user
      res.status(200).json(admin);
    }
    return res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
    return;
  }
  // Our login logic ends here
});

//Student Update
router.put('/update/:id',async (req, res) => {
// Our Update logic starts here
try {
    // Get user input
    const { first_name, stud_id, password } = req.body;

    // Validate user input
    if (!(stud_id && password)) {
      res.status(400).send("All input is required");
      return;
    }
    // Validate if user exist in our database
    const admin = await Admin.findOne({ stud_id });

    if (admin && (await bcrypt.compare(password, admin.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: admin._id, stud_id },
        process.env.JWT_KEY,
        {
          expiresIn: "2h",
        }
      );
      // save user token
      admin.token = token;
      const user = await Admin.findByIdAndUpdate({_id:req.params.id}, {$set:{password : await bcrypt.hash(password, 10)},  first_name})
      // user
      return res.status(200).json(admin);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
    return;
  }
  // Our update logic ends here
  });

//Get Result
router.get('/results',async (req, res) => {
    // Our results logic starts here
    try {
        // Get user input
        const { stud_id, password } = req.body;
    
        // Validate user input
        if (!(stud_id && password)) {
          res.status(400).send("All input is required");
          return;
        }
        // Validate if user exist in our database
        const admin = await Admin.findOne({ stud_id });
    
        if (admin && (await bcrypt.compare(password, admin.password))) {
          // Create token
          const token = jwt.sign(
            { user_id: admin._id, stud_id },
            process.env.JWT_KEY,
            {
              expiresIn: "3h",
            }
          );
    
          // save user token
          admin.token = token;
          const user = await Admin.findById(req.params.id)
          // user
          res.status(200).json(admin);
        }
        return res.status(400).send("Invalid Credentials");
      } catch (err) {
        console.log(err);
        return;
      }
      // Our result logic ends here
});


module.exports = router;
