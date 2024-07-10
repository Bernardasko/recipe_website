import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MenuItem } from "@mui/material";

function RecipeForm() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [steps, setSteps] = useState([""]);
  const [ingredients, setIngredients] = useState([""]);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  async function onSubmit(data) {
    console.log(data);
    try {
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
    setIngredients([...ingredients, ""]);
  };

  const handleIngredientChange = (index, value) => {
    const newIngredient = [...ingredients];
    newIngredient[index] = value;
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
            <Avatar />
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
              error={!!errors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="Ingredients"
              label="Ingredients"
              type="text"
              id="ingredients"
              {...register("ingredients", {
                required: "Ingredients field is required",
              })}
              error={!!errors.password}
            />

            {steps.map((step, index) => (
              <TextField
                key={index}
                margin="normal"
                required
                fullWidth
                name={`steps[${index}]`}
                label={`Step ${index + 1}`}
                type="text"
                value={step}
                onChange={(e) => handleStepChange(index, e.target.value)}
                error={!!errors[`steps${index}`]}
                // helperText={errors[`steps${index}`] ? errors[`steps${index}`].message : ''}
                {...register(`steps.${index}`, {
                  required: `Step ${index + 1} is required`,
                })}
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
              select
              label="Choose category"
              type="text"
              id="category"
              {...register("category", {
                required: "Category field is required",
              })}
              error={!!errors.password}
            >
              <MenuItem value="option1"> Appetizers</MenuItem>
              <MenuItem value="option1"> Main Course</MenuItem>
              <MenuItem value="option1"> Desserts</MenuItem>
            </TextField>

            <TextField
              margin="normal"
              fullWidth
              name="country"
              label="Recipe Country"
              type="text"
              id="country"
              {...register("country")}
              error={!!errors.password}
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
