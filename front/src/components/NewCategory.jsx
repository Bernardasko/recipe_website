import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function NewCategory() {
const [error, setError] =useState("");
const {handleSubmit, register, formState:{errors}, reset} =useForm();

const checkCategoryExists = async (category) => {
    try {
      const response = await axios.get(`http://localhost:3001/v1/categorys?name=${category}`);
      return response.data.exists; 
    } catch (err) {
      console.log(err);
      setError("An error occurred while checking the category name.");
      return false;
    }
  };


async function onSubmit(data) {
    const newCategory = {
      ...data,
    };
    console.log(newCategory);

    const categoryExist = await checkCategoryExists(newCategory.category);
    if (categoryExist){
        setError("Category is already exist");
        return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/v1/categorys",
        newCategory
      );
      if (response.status === 200) {
        toast.success("Category created successfully!");
      }
      console.log(response);
      reset();
    } catch (err) {
      console.log(err);
      setError("An error occurred while submitting the form.");
    }
  }


  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Add new category
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            fullWidth
            type="text"
            id="category"
            label="category"
            name="category"
            {...register("category")}
            error={!!errors.category}
            helperText={errors.category ? errors.category.message : ""}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default NewCategory;
