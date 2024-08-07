import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  pg_getAllUsers,
  pg_signupUser,
  pg_getUserByEmail,
  pg_addFollower,
  pg_removeFollower,
  pg_getFollowers,
  pg_isFollowing,
} from '../models/usersModel.mjs';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,20}$/;
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

// --------generate token----------------
const getToken = (id, name, lastname, email, role) => {
  const token = jwt.sign(
    { id, name, lastname, email, role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES,
    }
  );
  return token;
};
// --------------------------------------

export const test = async (req, res) => {
  try {
    res.status(200).json({ message: 'success' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const signupUser = async (req, res) => {
  try {
    const {
      name,
      email,
      lastname,
      password,
      repeatPassword,
      role = 'user',
    } = req.body;

// Check if fields are empty
// if (!name || !lastname || !email || !password || !repeatPassword) {
//   return res.status(400).json({ message: 'All fields are required' });
// }

// Check if firstname and lastname are empty
if (!name.trim() || !lastname.trim()) {
  return res.status(400).json({ message: 'Firstname and lastname cannot be empty' });
}

// Validate email format
if (!emailRegex.test(email)) {
  return res.status(400).json({ message: 'Invalid email address format' });
}

    if (password !== repeatPassword) {
      return res.status(400).json({ message: 'Passwords does not match ☹️' });
    }

    if (!passwordRegex.test(password)) {
      return res.status(400).json({ message: 'Password must include at least one uppercase letter, one lowercase letter, and one symbol. It must be between 8 and 20 characters long.' });
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

    const signupuser = await pg_signupUser({
      name,
      email,
      lastname,
      role,
      password: hashedPassword,
    });
    console.log(signupuser);

    // create token for new user (automatically log him in)
    const token = getToken(
      signupuser.id,
      signupuser.name,
      signupuser.lastname,
      signupuser.email,
      signupuser.role
    );
    res.status(201).json(token);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email or password is missing 😤' });
    }

    const existingUser = await pg_getUserByEmail(email);

    //  check if user exsist
    if (!existingUser) {
      return res
        .status(400)
        .json({ message: 'User with this email does not exists' });
    }
    // compare existing user passsword with entered password
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    console.log(isPasswordValid);
    console.log(password, existingUser.password);
    // if password doesnt match return
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: 'email or password does not match 😭' });
    }

    // if password and email matches create user new token
    const token = getToken(
      existingUser.id,
      existingUser.name,
      existingUser.lastname,
      existingUser.email,
      existingUser.role
    );

    res.status(200).json(token);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const addFollower = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { followerId } = req.body;
    console.log(followerId);
    const addFollower = await pg_addFollower(userId, followerId);
    console.log(addFollower);
    if (addFollower.includes('already exists')) {
      return res.status(409).json({ message: 'Already following' });
    }
    res.status(200).json(addFollower);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const removeFollower = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { followerId } = req.body;
    const removeFollower = await pg_removeFollower(userId, followerId);
    if (!removeFollower) {
      return res.status(400).json({ message: 'Problem while unfollowing' });
    }
    res.status(204).json({ message: 'Unfollowed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const getFollowers = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const followers = await pg_getFollowers(userId);
    console.log(followers);
    res.status(200).json(followers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

// sita funkcija reikia iskelti i main prie element: <RecipeUsersAllCards />. kad zinociau kai uzkrauna user profile ar jis jau yra followinamas
export const isFollowing = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { profileId } = req.params;
    if (userId == profileId) {
      // Return 200 OK with a message if user is checking their own profile
      return res.status(200).json({ isFollowing: 'This_is_your_own_profile' });
    }
    const isFollowing = await pg_isFollowing(userId, profileId);
    
    if (isFollowing) {
      // Return 200 OK with a message indicating the user is following the profile
      return res.status(200).json({ isFollowing: true });
    } 
    
    // Return 200 OK with a message indicating the user is not following the profile
    return res.status(200).json({ isFollowing: false });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
  // if password and email matches create user new token
  // const token = getToken(existingUser.id, existingUser.name, existingUser.lastname,  existingUser.email, existingUser.role)

