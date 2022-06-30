const express = require("express");
const userModel = require("../Models/users_model");
const router = express.Router();

router.get("/:id", getUser, (req, res) => {
  res.send(req.user.name);
});

router.get("/", async (req, res) => {
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (error) {
    res.status(200).json({ message: error });
  }
});

router.post("/", (req, res) => {
  const users = new userModel({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  users
    .save()
    .then(() => {
      res.status(201).json("User added successfully");
    })
    .catch((error) => {
      res.status(403).json({ message: error });
    });
});

router.patch("/:id",getUser, async(req, res) => {
  if(req.body.name != null){
    req.user.name = req.body.name;
  }
  if(req.body.email != null){
    req.user.email = req.body.email;
  }
  if(req.body.password != null){
    req.user.password = req.body.password;
  }
  try{
    const updateUser = await req.user.save();
    res.json(updateUser);

  }catch(error){
    res.status(400).json({'message': error});
  }
});

router.patch("/:id", getUser, async (req, res) => {
  const {name, email, password} = req.body;
});

router.delete("/:id", getUser, async (req, res) => {
  try {
    await req.user.remove();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

async function getUser(req, res, next) {
  let user;
  try {
    user = await userModel.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
  req.user = user;
  next();
}

module.exports = router;
