import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useForm, Controller } from 'react-hook-form';
import { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import { postRecipe } from '../services/post.mjs';
import { useLoaderData } from 'react-router-dom';
import { patchRecipeById } from '../services/patch.mjs';

function RecipeForm({ recipeInfo }) {
  const [error, setError] = useState('');
  const [steps, setSteps] = useState(['']);
  const [ingredients, setIngredients] = useState([{ ingredient: '', amount: '' }]);

  const data = useLoaderData();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
    control,
  } = useForm();

  useEffect(() => {
    if (recipeInfo) {
      setValue('title', recipeInfo.name);
      const cuisineObject = data.cuisines.data.find(cuisine => cuisine.name.toLowerCase() === recipeInfo.cuisine.toLowerCase());
      setValue('cuisine', cuisineObject ? cuisineObject.name : '');
      const categoryObject = data.categories.find(cat => cat.name.toLowerCase() === recipeInfo.category.toLowerCase());
      setValue('category', categoryObject ? categoryObject.name : '');
      setValue('image', recipeInfo.image);

      setIngredients(recipeInfo.ingredients.map((ingredient) => ({
        ingredient: ingredient.ingredient,
        amount: ingredient.amount,
      })));
      setSteps(recipeInfo.steps.map((step) => step.description));
    }
  }, [recipeInfo, setValue]);

  const handleAddStep = () => {
    setSteps([...steps, '']);
  };

  const handleStepChange = (index, value) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { ingredient: '', amount: '' }]);
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  async function onSubmit(formData) {
    const newRecipe = {
      ...formData,
      ingredients: ingredients,
      steps: steps.map((step, index) => ({ description: step })),
    };

    if (recipeInfo) {
      const patched = await patchRecipeById(recipeInfo.id, newRecipe);
      if (patched.error) {
        setError(patched.error);
      }
    } else {
      const posted = await postRecipe(newRecipe);
      if (posted.error) {
        setError(posted.error);
      }
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          {recipeInfo ? 'Edit Recipe' : 'Add New Recipe'}
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
            {...register('title', {
              required: 'Title field is required',
            })}
            error={!!errors.title}
            helperText={errors.title ? errors.title.message : ''}
          />

          {ingredients.map((ingredient, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                gap: 1,
                alignItems: 'center',
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
                id={`ingredients[${index}].amount`}
                value={ingredient.amount}
                onChange={(e) =>
                  handleIngredientChange(index, 'amount', e.target.value)
                }
                error={!!errors[`ingredients${index}`]}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name={`ingredients[${index}].ingredient`}
                label={`Ingredient ${index + 1}`}
                type="text"
                id={`ingredients[${index}].ingredient`}
                value={ingredient.ingredient}
                onChange={(e) =>
                  handleIngredientChange(index, 'ingredient', e.target.value)
                }
                error={!!errors[`ingredients${index}`]}
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
              key={index}
              margin="normal"
              required
              fullWidth
              name={`steps[${index}]`}
              label={`Step ${index + 1}`}
              type="text"
              id={`steps[${index}]`}
              value={step}
              onChange={(e) => handleStepChange(index, e.target.value)}
              {...register(`steps.${index}`, {
                required: `Step ${index + 1} is required`,
              })}
              error={!!errors[`steps${index}`]}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">{index + 1}</InputAdornment>
                ),
              }}
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

          <FormControl fullWidth margin="normal" required>
            <Controller
            name="category"
            control={control}
            defaultValue=""
            rules={{ required: 'Category is required' }}
            render={({ field }) => (
              <Select
                {...field}
                displayEmpty
                fullWidth
                error={!!errors.category}
              >
                <MenuItem value="" disabled>Category</MenuItem>
                {data.categories &&
                  data.categories.map((item) => (
                    <MenuItem key={item.categoryId} value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
              </Select>
            )}
          />
            {errors.category && (
              <Typography color="error">{errors.category.message}</Typography>
            )}
          </FormControl>

          <FormControl fullWidth margin="normal" required>
          < Controller
          name="cuisine"
          control={control}
          defaultValue=""
          rules={{ required: 'Cuisine is required' }}
          render={({ field }) => (
            <Select
              {...field}
              displayEmpty
              fullWidth
              error={!!errors.cuisine}
            >
          <MenuItem value="" disabled>Cuisine</MenuItem>
          {data.cuisines.data &&
                  data.cuisines.data.map((item, index) => {
                    return (
                      <MenuItem key={index} value={`${item.name}`}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
            </Select>
          )}
          />
            {errors.cuisine && (
              <Typography color="error">{errors.cuisine.message}</Typography>
            )}
          </FormControl>

          <TextField
            margin="normal"
            required
            fullWidth
            type="text"
            id="image"
            label="Image URL"
            name="image"
            {...register('image', {
              required: 'Image URL field is required',
            })}
            error={!!errors.image}
            helperText={errors.image ? errors.image.message : ''}
            defaultValue={recipeInfo ? recipeInfo.image : ''}
          />

          {error && <div style={{ color: 'red' }}>{error}</div>}
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

export default RecipeForm;
