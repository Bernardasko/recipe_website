import {pg_addComment} from '../models/socialModel.mjs'

export const addComment = async (req, res) => {
  try {
    req.body
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
}

