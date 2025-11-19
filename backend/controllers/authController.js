const pool =require("../config/db");
const bcrypt =require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signupUser= async (req,res)=>{
    try {
        const {name,email,address,password}=req.body;

        if(!name||!email|| !password){
            return res.status(400).json({message:"All fields are required"});

        }

        const userExists= await pool.query(
            "SELECT * FROM USERS WHERE EMAIL= $1",[email]
        );

        if(userExists.rows.length>0){
            return res.status(400).json({message:"Email already register"});
        }

        const hashedPassword = await bcrypt.hash(password,10);

        await pool.query(
            "INSERT INTO users (name,email,address,password,role) values($1,$2,$3,$4,$5)",
            [name,email,address,hashedPassword,'user']
        );

        res.json({message:"User registered successfully"})


    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Server Error"});
    }
}

exports.signinUser= async (req,res)=>{
    try{

        const {email,password}=req.body;

        if(!email || !password){
            return res.status(400).json({message:" required email or password "});
        }

        const userResult= await pool.query(
            "select * from  users where email =$1",[email]
        );
        if(userResult.rows.length===0){
            return res.status(400).json({message:"Invalid email or password"})

        }
        const user = userResult.rows[0];
        

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return  res.status(400).json({message:"wrong credential"});
        }

        const token = jwt.sign(
            {
                id:user.id,
                role: user.role,
                email: user.email

            },
            process.env.JWT_SECRET,{
                expiresIn:"7d"
            }
        );

        res.json({
            message:"login successful",
            token,
            user:{
                id:user.id,
                name:user.name,
                email:user.email,
                role:user.role
            }
        });



    }catch(error){
        console.log("LOGIN ERROR:", error);
        res.status(500).json({message:"error in  login "})
    }
}

// UPDATE PASSWORD
exports.updatePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "Both passwords required" });
    }

    // Validate new password (8–16 chars, uppercase + special)
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/;
    if (!regex.test(newPassword)) {
      return res.status(400).json({
        message: "New password must be 8–16 chars, include uppercase + special symbol"
      });
    }

    // Get existing password
    const userRes = await pool.query(
      "SELECT password FROM users WHERE id = $1",
      [userId]
    );

    const hashed = userRes.rows[0].password;

    // Compare old password
    const match = await bcrypt.compare(oldPassword, hashed);
    if (!match) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    // Hash new password
    const newHash = await bcrypt.hash(newPassword, 10);

    // Update
    await pool.query(
      "UPDATE users SET password = $1 WHERE id = $2",
      [newHash, userId]
    );

    res.json({ message: "Password updated successfully" });

  } catch (err) {
    console.error("Password update error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
