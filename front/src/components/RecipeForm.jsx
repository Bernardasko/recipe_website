// import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { MenuItem } from "@mui/material";
import axios from "axios";
import InputAdornment from "@mui/material/InputAdornment";
import toast from "react-hot-toast";

function RecipeForm() {
  const [error, setError] = useState("");
  const [steps, setSteps] = useState([""]);
  const [ingredients, setIngredients] = useState([
    { ingredient: "", amount: "" },
  ]);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  async function onSubmit(data) {
    const newRecipe = {
      ...data,
    };
    console.log(newRecipe);
    try {
      const response = await axios.post(
        "http://localhost:3001/v1/recipes/postRecipe",
        newRecipe
      );
      if (response.status === 200) {
        toast.success("Recipe created successfully!");
      }

      console.log(response);
      reset();
    } catch (err) {
      console.log(err);
      setError("An error occurred while submitting the form.");
    }
  }

  const handleAddStep = () => {
    setSteps([...steps, ""]);
  };

  const handleStepChange = (index, value) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: "", ingredients: "" }]);
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredient = [...ingredients];
    newIngredient[index][field] = value;
    setIngredients(newIngredient);
  };

  return (
    <>
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
            Add new recipe
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              type="text"
              id="title"
              label="Title"
              name="title"
              {...register("title", {
                required: "Title field is required",
              })}
              error={!!errors.title}
              helperText={errors.title ? errors.title.message : ""}
            />
            {ingredients.map((ingredient, index) => (
              <Box
                key={ingredient.id}
                sx={{
                  display: "flex",
                  gap: 1,
                  alignItems: "center",
                  marginBottom: 2,
                }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name={`ingredients[${index}].amount`}
                  label={`amount${index + 1}`}
                  type="text"
                  id="ingredients"
                  onChange={(e) =>
                    handleIngredientChange(index, "amount", e.target.value)
                  }
                  {...register(`ingredients.${index}.amount`, {
                    required: `amount ${index + 1} is required`,
                  })}
                  error={!!errors[`inggredients${index}`]}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name={`ingredients[${index}].ingredient`}
                  label={`ingredient${index + 1}`}
                  type="text"
                  id="ingredients"
                  onChange={(e) =>
                    handleIngredientChange(index, "ingredients", e.target.value)
                  }
                  {...register(`ingredients.${index}.ingredient`, {
                    required: `ingredient ${index + 1} is required`,
                  })}
                  error={!!errors[`inggredients${index}`]}
                />
              </Box>
            ))}
            <Button
              type="button"
              fullWidth
              variant="outlined"
              sx={{ mt: 2, mb: 2 }}
              onClick={handleAddIngredient}
            >
              + Add Ingredient
            </Button>

            {steps.map((step, index) => (
              <TextField
                key={step.id}
                margin="normal"
                required
                fullWidth
                name={`steps[${index}]`}
                label={`Step ${index + 1}`}
                type="text"
                id="steps"
                onChange={(e) => handleStepChange(index, e.target.value)}
                {...register(`steps.${index}`, {
                  required: `Step ${index + 1} is required`,
                })}
                error={!!errors[`steps${index}`]}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {index + 1}
                    </InputAdornment>
                  ),
                }}
                helperText={
                  errors[`steps${index}`] ? errors[`steps${index}`].message : ""
                }
              />
            ))}

            <Button
              type="button"
              fullWidth
              variant="outlined"
              sx={{ mt: 2, mb: 2 }}
              onClick={handleAddStep}
            >
              + Add Step
            </Button>

            <TextField
              margin="normal"
              required
              fullWidth
              name="category"
              select
              label="Choose category"
              type="text"
              id="category"
              {...register("category", {
                required: "Category field is required",
              })}
              error={!!errors.category}
              helperText={errors.category ? errors.category.message : ""}
            >
              <MenuItem value="option1"> Appetizers</MenuItem>
              <MenuItem value="option2"> Main Course</MenuItem>
              <MenuItem value="option3"> Desserts</MenuItem>
            </TextField>

            <TextField
              margin="normal"
              fullWidth
              name="cuisine"
              label="Cuisine"
              type="text"
              id="cuisine"
              {...register("cuisine")}
              error={!!errors.cuisine}
              helperText={errors.cuisine ? errors.cuisine.message : ""}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              type="img"
              id="image"
              label="image URL"
              name="imaga"
              {...register("image", {
                required: "Image URL field is required",
              })}
              error={!!errors.image}
              helperText={errors.image ? errors.image.message : ""}
            />

            {error && <div style={{ color: "red" }}>{error}</div>}
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
    </>
  );
}

export default RecipeForm;
