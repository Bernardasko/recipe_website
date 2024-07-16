import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pg_getAllUsers, pg_signupUser, pg_getUserByEmail } from '../models/usersModel.mjs';

// --------generate token----------------
const getToken = (id, name, lastname, email, role) => {
  const token = jwt.sign({id, name, lastname, email, role}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES
  })
  return token
}
// --------------------------------------

export const test = async (req, res) => {
  try {
    res.status(200).json({message: 'success'})
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
}


export const signupUser = async (req, res) => {
  try {
    const { name, email, lastname, password, repeatPassword, role = 'user'} = req.body;
    if (password !== repeatPassword) {
      return res.status(400).json({ message: 'Passwords does not match ☹️' });
    }
    // if (role !== 'user' && role !== 'admin') {
    //   return res.status(400).json({ message: 'Role must be admin or user' });
    // }
    const existingUser = await pg_getUserByEmail(email);
    if (existingUser) {
      console.log('Occupied');
      return res.status(409).json({ message: 'Email is occupied' });
    }

    // hashing password
    const salt = await bcrypt.genSalt(10);
    console.log(salt);
    const hashedPassword = await bcrypt.hash(password, salt);

    const signupuser = await pg_signupUser({name, email, lastname, role, password: hashedPassword})
    console.log(signupuser);

    // create token for new user (automatically log him in)
    const token = getToken(signupuser.id, signupuser.name, signupuser.lastname ,signupuser.email, signupuser.role )
    res.status(201).json(token);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};


export const loginUser = async (req,res) => {
  try {
  const {email, password} = req.body
  
  if(!email || !password){
    return res.status(400).json({message: 'Email or password is missing 😤'})
  }

  const existingUser = await pg_getUserByEmail(email)
  
  //  check if user exsist
  if(!existingUser){
    return res.status(400).json({message: 'User with this email does not exists'})
  }
  // compare existing user passsword with entered password
  const isPasswordValid = await bcrypt.compare(password, existingUser.password)
  console.log(isPasswordValid);
  console.log(password, existingUser.password);
  // if password doesnt match return
  if(!isPasswordValid){
    return res.status(400).json({message: 'email or password does not match 😭'})
  }

  // if password and email matches create user new token
  const token = getToken(existingUser.id, existingUser.lastname, existingUser.name, existingUser.email, existingUser.role)

  res.status(200).json(token)
} catch (error) {
  console.error(error);
  res.status(500).json({ message: error });
}
}
