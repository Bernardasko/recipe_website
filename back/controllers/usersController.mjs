import { pg_getAllUsers } from '../models/usersModel.mjs';

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await pg_getAllUsers();
    console.log(allUsers);
    console.log(12);
    // res.status(200).json(allUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};
