import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useParams } from "react-router-dom";


const AddCommentRating = () => {
  const { id } = useParams();


  const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
  };

//   const filteredUserTours = users.map(user => ({
//     ...user,
//     tours: user.tours.filter(tour => tour.tourId._id === id)
//   }));

  return (
    <Box>
      {/* {filteredUserTours.map((user) => (
        user.tours.map((tour, index) => ( */}
          <Box 
            // key={index} 
            style={{
              width: '500px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              padding: '20px',
              margin: 'auto',
            //   backgroundColor: '#f5f5f5',
              borderRadius: '8px',
            }}
          >
            <Typography variant="body1" gutterBottom>
              Comment: {}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Your Rating
            </Typography>
            <Rating
              // value={}
              precision={0.5}
              readOnly
            />
            {/* <Typography variant="body1">{labels[recipe.rating]}</Typography> */}
          </Box>
        {/* ))
      ))} */}
    </Box>
  );
};

export default AddCommentRating;
