const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router()

// importing user context
const Admin = require("../model/admin");

// Add Student
router.post('/addStudent',async (req, res) => {
// Our Add Student logic starts here
try {
    // Get user input
    const { first_name, stud_id, password, english, maths, science } = req.body;

    // Validate user input
    if (!(stud_id && password && first_name)) {
      return res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await Admin.findOne({ stud_id });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const admin = await Admin.create({
      first_name,
      stud_id,
      password: encryptedPassword,
      english, 
      maths, 
      science
    });

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

    // return new user
    return res.status(201).json(admin);
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});

// Login
router.post('/login',async (req, res) => {
// Our login logic starts here
try {
    // Get user input
    const { stud_id, password } = req.body;

    // Validate user input
    if (!(stud_id && password)) {
      return res.status(400).send("All input is required");
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

      // user
      return res.status(200).json(admin);
    }
    return res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
  // Our login logic ends here
});

//Admin Update
router.put('/students/:id',async (req, res) => {
// Our Update logic starts here
try {
    // Get user input
    const { stud_id, password } = req.body;

    // Validate user input
    if (!(stud_id && password)) {
      return res.status(400).send("All input is required");
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
      const user = await Admin.findByIdAndUpdate(req.params.id,req.body)
      // user
      return res.status(200).json(admin);
    }
    return res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
  // Our login logic ends here
  });

//Admin Delete
router.delete('/students/:id',async (req, res) => {
    // Our Delete logic starts here
    try {
        // Get user input
        const { stud_id, password } = req.body;
    
        // Validate user input
        if (!(stud_id && password)) {
          return res.status(400).send("All input is required");
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
          //const deleted = await Admin.findAndDelete({id : req.params.id}, function (err, results) { })
          Admin.findByIdAndRemove(req.params.id, function (err, deletedStudent) {
            if (err) {
              return res.send('Error Deleting Data');
            } else {
              return res.json(deletedStudent);
            }
          });
          // user
          return res.status(200).json(admin);
        }
        return res.status(400).send("Invalid Credentials");
      } catch (err) {
        console.log(err);
      }
      // Our login logic ends here
      });
module.exports = router;