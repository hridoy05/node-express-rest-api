//check username, password in post(login) request
const jwt = require('jsonwebtoken');
const BadRequest = require('../errors/bad-request');
const CustomAPIError = require("../errors/custom-error");

//if exists create new jwt
//send back to front-end

//set up authentication so only the request with jwt can access the request

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new BadRequest("please provide email and password");
  }
  const id = new Date().getDate()

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '1800s',
  })
  
  res.status(200).json({ msg: 'user created', token });
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res
    .status(200)
    .json({
      msg: `hello Hriody`,
      secret: `hridoy  your luckyNumber ${luckyNumber}`,
    });
};

module.exports = {
  login,
  dashboard,
};
