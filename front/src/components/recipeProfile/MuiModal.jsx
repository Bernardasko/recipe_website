import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import RecipeForm from '../RecipeForm';
import { useLoaderData } from 'react-router-dom';

export default function ResponsiveModal({recipeInfo}) {
  const data =  useLoaderData()
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <Button variant="outlined" color="neutral" onClick={() => setOpen(true)}>
        Edit
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          aria-labelledby="nested-modal-title"
          aria-describedby="nested-modal-description"
          sx={(theme) => ({
            width: '80%', // Set the width to 80% of the parent container
            maxWidth: '600px', // Set a max-width for larger screens
            overflow: 'scroll',
            [theme.breakpoints.only('xs')]: {
              width: '100%', // Set the width to 80% of the parent container
              // maxWidth: '600px',
              top: 'unset',
              bottom: 0,
              left: 0,
              right: 0,
              borderRadius: 0,
              transform: 'none',
              maxWidth: 'unset',
            },
          })}
        >
          <RecipeForm recipeInfo={recipeInfo} setOpen={setOpen}/>
          <Box
            sx={{
              mt: 1,
              display: 'flex',
              gap: 1,
              flexDirection: { xs: 'column', sm: 'row-reverse' },
            }}
          >
            <Button variant="solid" color="success" onClick={() => setOpen(false)}>
              Save
            </Button>
            <Button
              variant="outlined"
              color="danger"
              onClick={() => setOpen(false)}
            >
              Discard
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
