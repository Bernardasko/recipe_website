import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Select from "@mui/material/Select";
import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import { MenuItem } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { postRecipe } from "../services/post.mjs";
import { useLoaderData } from "react-router-dom";
import { patchRecipeById } from "../services/patch.mjs";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { FormControl, FormHelperText } from "@mui/material";

function RecipeForm({ recipeInfo, setOpen }) {
  const [error, setError] = useState("");
  const [steps, setSteps] = useState([""]);
  const [ingredients, setIngredients] = useState([
    { ingredient: "", amount: "" },
  ]);
  const [cuisines, setCuisines] = useState(null);
  const [categories, setCategories] = useState(null);
  const navigate = useNavigate();

  const data = useLoaderData();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
    control,
    unregister,
  } = useForm();

  const handleDeleteIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);

    // Unregister the removed fields
    unregister(`ingredients.${index}.amount`);
    unregister(`ingredients.${index}.ingredient`);

    // Update the remaining fields
    newIngredients.forEach((ingredient, i) => {
      setValue(`ingredients.${i}.amount`, ingredient.amount);
      setValue(`ingredients.${i}.ingredient`, ingredient.ingredient);
    });
  };

  const handleDeleteStep = (index) => {
    const newSteps = steps.filter((_, i) => i !== index);
    setSteps(newSteps);

    // Unregister the removed field
    unregister(`steps.${index}`);

    // Update the remaining fields
    newSteps.forEach((step, i) => {
      setValue(`steps.${i}`, step);
    });
  };

  async function onSubmit(data) {
    const newRecipe = {
      ...data,
    };
    try {
      if (recipeInfo) {
        newRecipe.recipeId = recipeInfo.recipeId;
        const patched = await patchRecipeById(newRecipe);
        if (patched.status === 200) {
          toast.success("Recipe updated successfully");
          setOpen(false);
          navigate("/profile/recipes");
        } else {
          error && toast.error("Failed to update recipe");
        }
      } else {
        const posted = await postRecipe(newRecipe);
        if (posted.status === 200 || posted.status === 201) {
          toast.success("Recipe created successfully");
          navigate("/profile/recipes");
        } else {
          error && toast.error("Failed to create recipe");
        }
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
      console.error("Error:", error);
    }
  }

  const handleAddStep = () => {
    setSteps([...steps, ""]);
  };
 
  const handleStepChange = (index, value) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
    setValue(`steps.${index}`, value);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { ingredient: "", amount: "" }]);
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredient = [...ingredients];
    newIngredient[index][field] = value;
    setIngredients(newIngredient);
  };

  useEffect(() => {
    if (recipeInfo) {
      console.log(recipeInfo);
      setValue("title", recipeInfo.name);
      const cuisineObject = data.cuisines.data.find(
        (cuisine) =>
          cuisine.name.toLowerCase() === recipeInfo.cuisine.toLowerCase()
      );
      setValue("cuisine", cuisineObject ? cuisineObject.name : "");
      const categoryObject = data.categories.find(
        (cat) => cat.name.toLowerCase() === recipeInfo.category.toLowerCase()
      );
      setValue("category", categoryObject ? categoryObject.name : "");
      setValue("image", recipeInfo.images);

      setIngredients(
        recipeInfo.ingredients.map((ing) => ({
          amount: ing.amount,
          ingredient: ing.ingredient,
        }))
      );

      recipeInfo.ingredients.forEach((ingredient, index) => {
        setValue(`ingredients.${index}.amount`, ingredient.amount);
        setValue(`ingredients.${index}.ingredient`, ingredient.ingredient);
      });

      // Set steps
      setSteps(recipeInfo.steps);
      recipeInfo.steps.forEach((step, index) => {
        setValue(`steps.${index}`, step);
      });
    }
  }, []);

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: 500,
            mx: "auto",
            mt: 3,
            overflowY: "auto",
          }}
        >
          <Typography component="h1" variant="h5">
            {recipeInfo ? "Edit Recipe" : "Add New Recipe"}
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
                maxLength: {
                  value: 35,
                  message: "Title cannot exceed 35 characters",
                },
                validate: {
                  notEmpty: (value) => value.trim() !== "" || "Title cannot be empty or just whitespace",
                }
              })}
              error={!!errors.title}
              helperText={errors.title ? errors.title.message : ""}
            />
            {ingredients.map((ingredient, index) => (
              <Box
                key={index}
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
                  label={`Amount ${index + 1}`}
                  type="text"
                  id={`ingredients-amount-${index}`}
                  onChange={(e) =>
                    handleIngredientChange(index, "amount", e.target.value)
                  }
                  {...register(`ingredients.${index}.amount`, {
                    required: `Amount ${index + 1} is required`,
                    maxLength: {
                      value: 100,
                      message: "Amount cannot exceed 100 characters",
                    },
                  })}
                  error={!!errors.ingredients?.[index]?.amount}
                  helperText={errors.ingredients?.[index]?.amount?.message}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name={`ingredients[${index}].ingredient`}
                  label={`Ingredient ${index + 1}`}
                  type="text"
                  id={`ingredients-name-${index}`}
                  onChange={(e) =>
                    handleIngredientChange(index, "ingredient", e.target.value)
                  }
                  {...register(`ingredients.${index}.ingredient`, {
                    required: `Ingredient ${index + 1} is required`,
                    maxLength: {
                      value: 100,
                      message: "Ingredient cannot exceed 100 characters",
                    },
                  })}
                  error={!!errors.ingredients?.[index]?.ingredient}
                  helperText={errors.ingredients?.[index]?.ingredient?.message}
                />
                <IconButton onClick={() => handleDeleteIngredient(index)}>
                  <DeleteIcon />
                </IconButton>
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
              <Box
                key={index}
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
                  name={`steps[${index}]`}
                  label={`Step ${index + 1}`}
                  type="text"
                  id={`step-${index}`}
                  onChange={(e) => handleStepChange(index, e.target.value)}
                  {...register(`steps.${index}`, {
                    required: `Step ${index + 1} is required`,
                  })}
                  error={!!errors.steps?.[index]}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {index + 1}
                      </InputAdornment>
                    ),
                  }}
                  helperText={errors.steps?.[index]?.message}
                />
                <IconButton onClick={() => handleDeleteStep(index)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
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

            <Box
              sx={{
                mt: 3,
                display: "flex",
                flexDirection: "row",
                gap: 2,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Controller
                name="category"
                control={control}
                defaultValue=""
                rules={{ required: "Category is required" }}
                render={({ field, fieldState: { error } }) => (
                  <FormControl fullWidth error={!!error}>
                    <Select {...field} displayEmpty fullWidth>
                      <MenuItem value="" disabled>
                        Category
                      </MenuItem>
                      {data.categories &&
                        data.categories.map((item, index) => (
                          <MenuItem key={index} value={item.name}>
                            {item.name}
                          </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>{error?.message || " "}</FormHelperText>
                  </FormControl>
                )}
              />
              <Controller
                name="cuisine"
                control={control}
                defaultValue=""
                rules={{ required: "Cuisine is required" }}
                render={({ field, fieldState: { error } }) => (
                  <FormControl fullWidth error={!!error}>
                    <Select {...field} displayEmpty error={!!errors.cuisine}>
                      <MenuItem value="" disabled>
                        Cuisine
                      </MenuItem>
                      {data.cuisines.data &&
                        data.cuisines.data.map((item, index) => (
                          <MenuItem key={index} value={item.name}>
                            {item.name}
                          </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>{error?.message || " "}</FormHelperText>
                  </FormControl>
                )}
              />
            </Box>
            <TextField
              margin="normal"
              required
              fullWidth
              type="url"
              id="image"
              label="Image URL"
              name="image"
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
              {recipeInfo ? "Update Recipe" : "Add Recipe"}
            </Button>
          </Box>
        </Box>
      </Container>
      <Toaster />
    </>
  );
}

export default RecipeForm;