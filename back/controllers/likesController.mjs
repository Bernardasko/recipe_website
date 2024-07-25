import { pg_deleteLike, pg_getLikeCount, pg_postLike , pg_checkIfLiked} from "../models/likesModel.mjs";

export const getLikeCount = async (req, res) => {
    try {
      const { recipeid } = req.params;
      const likeCount = await pg_getLikeCount(recipeid);
      res.status(200).json({ likeCount });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  export const checkIfLiked = async (req, res) => {
    try {
      const { recipeid, userid } = req.params;
      console.log(`Received request with recipeid=${recipeid} and userid=${userid}`);
      const liked = await pg_checkIfLiked(recipeid, userid);
      console.log(`Ar patiko receptas? ${liked}`);
      res.status(200).json({ liked });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  // const testPgCheckIfLiked = async () => {
  //   try {
  //     const recipeid = 17; // Naudokite egzistuojantį recipeid
  //     const userid = 6; // Naudokite egzistuojantį userid
  //     const liked = await pg_checkIfLiked(recipeid, userid);
  //     console.log(`Ar patiko receptas? ${liked}`);
  //   } catch (error) {
  //     console.error('Testavimo klaida:', error);
  //   }
  // };
  
  // // Iškviesti testavimo funkciją
  // testPgCheckIfLiked();
  
  export const postLike = async (req, res) => {
    try {
      const { recipeid, userid } = req.params;
     
      const newLike = await pg_postLike(recipeid, userid);
      res.status(201).json(newLike);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
      // if (error.code === '23505') { // unique_violation error code in PostgreSQL
      //   res.status(400).json({ message: 'User has already liked this recipe' });
      // } else {
      //   res.status(500).json({ message: 'Internal server error' });
      // }
    }
  };
  
  
  export const deleteLike = async (req, res) =>{
    try {
      const {recipeid, userid} = req.params;
    const deleteLike = await pg_deleteLike(recipeid, userid);
    if (!deleteLike || deleteLike.length === 0) {
      return res.status(404).json({ message: 'Like not found' });
    }
    res.status(200).json(deleteLike);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error });
    }
  }