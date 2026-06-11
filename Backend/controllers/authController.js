const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async(req,res)=>{

    try{

        const {name,email,password,role}=req.body;

        const exist = await User.findOne({email});

        if(exist){
            return res.status(400).json({
                message:"User Already Exists"
            });
        }

        const hashPassword = await bcrypt.hash(password,10);

        const user = await User.create({
            name,
            email,
            password:hashPassword,
            role
        });

        res.status(201).json(user);

    }
    catch(error){
        res.status(500).json(error);
    }
    
}

exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Role:", role);

    const user = await User.findOne({ email });

    console.log("User Found:", user);

    if (!user) {
      return res.status(404).json({
        message: "User Not Found"
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    console.log("Password Match:", isMatch);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Credentials"
      });
    }

    if (role && user.role !== role) {
      return res.status(400).json({
        message: "Selected role does not match account role"
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user
    });

  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};