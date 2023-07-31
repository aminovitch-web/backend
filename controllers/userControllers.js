const User = require("../models/userModels");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const bcrypt = require("bcrypt");
const roles = ["admin", "user"];
const { faker } = require("@faker-js/faker");
const { generateRefreshToken } = require("../config/refreshToken");
const jwt = require("jsonwebtoken");
const validateMongoDbId = require("../utils/validateMongoDbId")
const sendEmail = require("./emailControllers");
const crypto = require("crypto");
function generateRole() {
  const randomIndex = Math.floor(Math.random() * roles.length);
  return roles[randomIndex];
}

function generateMobile() {
  let phoneNumber = "07";

  for (let i = 0; i < 8; i++) {
    phoneNumber += Math.floor(Math.random() * 10);
  }
  return phoneNumber;
}

const createMultipleUsers = asyncHandler(async (req, res) => {
  const { number } = req.params;
  const users = [];

  for (let i = 0; i < number; i++) {
    const newUser = new User({
      firstname: faker.internet.userName(),
      lastname: faker.internet.userName(),
      email: faker.internet.email(),
      mobile: generateMobile(),
      password: faker.internet.password(),
    });

    users.push(newUser);
  }

  const createdUsers = await User.create(users);

  res.json(createdUsers);
});

const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    const role = generateRole();
    const newUser = await User.create({ ...req.body, role });

    res.json(newUser);
  } else {
    throw new Error("user already exist");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken= await generateRefreshToken(findUser?._id);
     const updateUser= await User.findByIdAndUpdate(findUser.id, 
      {
       refreshToken: refreshToken,
     }, 
     {
     new:true
  }
  );
  res.cookie("refreshToken", refreshToken, {
  httpOnly: true,
  maxAge: 72 * 60 * 60 * 1000,
  
});
    res.json({
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("incorrect credentials");
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find();
    if (getUsers.length === 0) {
      return res.status(404).json({ message: "users not found" });
    }
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

const getSingleUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  try {
    const getSingleUser = await User.findById(id);
    if (!getSingleUser) {
      res.status(404).json({ message: "user not found" });
    }
    res.json({
      getSingleUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const deleteAllUsers = asyncHandler(async (req, res, next) => {
  try {
    const deleteResult = await User.deleteMany({});
    const deletedCount = deleteResult.deletedCount;
    if (deletedCount === 0) {
      return res.status(404).json({ message: "No users found to delete" });
    }
    res.json({ message: `Deleted ${deletedCount} users` });
  } catch (error) {
    next(error);
  }
});
const deleteUser = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      message: "User deleted",
      deletedUser,
    });
  } catch (error) {
    next(error);
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error.message);
  }
});

const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const block = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );

    res.json({
      message: "User blocked",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const unblock = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );

    res.json({
      message: "User Unblocked",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const assignRole = asyncHandler(async (req, res) => {
  const { id, role } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found");
    }

    if (user.role === role) {
      throw new Error(`The user already has the role "${role}"`);
    }

    user.role = role;

    await user.save();

    res.json({
      message: "Role assigned to " + role + "!",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getUsers = asyncHandler(async (req, res) => {
  const { id, role } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found");
    }

    if (user.role === role) {
      throw new Error(`The user already has the role "${role}"`);
    }

    user.role = role;

    await user.save();

    res.json({
      message: "Role assigned to " + role + "!",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const handleRefreshToken = asyncHandler(async (req, res, next) => {
  const cookie = req.cookies;
  console.log(cookie);
  if(!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
   const refreshToken = cookie.refreshToken;
   console.log(refreshToken);
   const user= await User.findOne({ refreshToken});
   if(!user) throw new Error('No refreshToken present in db or not matched');
    jwt.verify(refreshToken,process.env.JWT_SECRET,(err, decoded) => {
     if(err || user.id !== decoded.id){
      throw new Error('error with refreshtoken');
     }
     const accesToken = generateToken(user._id);
     res.json(accesToken);
      
    });

});

const logout = asyncHandler(async (req,res) => {
const cookie = req.cookies;
if (!cookie?.refreshToken) throw new Error("No refresh Token in Coookies");
const refreshToken = cookie.refreshToken;
const user = await User.findOne( {refreshToken});
if(!user) {
    res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    });
    res.sendStatus(204);
}
await User.findByIdAndUpdate(user._id, { refreshToken: "" });


res.clearCookie("refreshToken", {
  httpOnly: true,
  secure: true,
  });
   res.sendStatus(204);

});


const updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  validateMongoDbId(_id);
  const user = await User.findById(_id);
  if (password) {
    user.password = password;
    const updatedPassword = await user.save();
    res.json(updatedPassword);
  } else {
    res.json(user);
  }
});


const forgotPasswordToken = asyncHandler(async(req,res) => {

  const {email} = req.body;
  const user = await User.findOne({ email });
  if(!user) throw new Error("user not found");
   try{
  const token = await user.createPasswordResetToken();
    await user.save();
    const resetURL = `hi please follow this link to reset your password. this Link is valid till 10 minutes from now <a href='http://localhost:5000/api/user/reset-password/${token}'> click here</a>`;
    const data = {
      to: email,
      subject: "forgot password Link",
      html: resetURL,

    };
    sendEmail(data);
    res.json(data);
   }catch(error){
     throw new Error(error);
   }


});

const resetPassword=asyncHandler(async(req,res) => {
const {password} = req.body;
const {token}= req.params;
const hashedToken = crypto.createHash('sha256').update(token).digest("hex");
const user= await User.findOne({
  passwordResetToken: hashedToken,
  passwordResetExpires: { $gt: Date.now()},
});
if(!user) throw new Error("Token Expired, please try again later");
user.password = password;
user.passwordResetToken=undefined;
user.passwordResetExpires=undefined;
await user.save();
res.json(user);
});





module.exports = {
  createMultipleUsers,
  createUser,
  loginUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
  deleteAllUsers,
  updateUser,
  blockUser,
  unblockUser,
  assignRole,
  getUsers,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword
};
