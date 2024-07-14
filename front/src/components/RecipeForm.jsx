import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Select from '@mui/material/Select';
import { useForm, Controller } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { MenuItem } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { postRecipe } from '../services/post.mjs';
import { useLoaderData } from 'react-router-dom';
import { patchRecipeById } from '../services/patch.mjs';

// import { getAllCuisines, getAllCategories } from '../services/get.mjs';

function RecipeForm({ recipeInfo }) {
  const [error, setError] = useState('');
  const [steps, setSteps] = useState(['']);
  const [ingredients, setIngredients] = useState([
    { ingredient: '', amount: '' },
  ]);
  const [cuisines, setCuisines] = useState(null);
  const [categories, setCategories] = useState(null);

  const data = useLoaderData();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
    control,
  } = useForm();

  async function onSubmit(data) {
    const newRecipe = {
      ...data,
    };
    console.log(newRecipe);
    if (recipeInfo) {
      const patched = await patchRecipeById(newRecipe);
    } else {
      console.log(123);
      const posted = await postRecipe(newRecipe);
      // console.log(posted);
    }
  }

  const handleAddStep = () => {
    setSteps([...steps, '']);
  };

  const handleStepChange = (index, value) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: '', ingredients: '' }]);
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredient = [...ingredients];
    newIngredient[index][field] = value;
    setIngredients(newIngredient);
  };
  useEffect(() => {
    if (recipeInfo) {
      setValue('title', recipeInfo.name);
      const cuisineObject = data.cuisines.data.find(
        (cuisine) =>
          cuisine.name.toLowerCase() === recipeInfo.cuisine.toLowerCase()
      );
      setValue('cuisine', cuisineObject ? cuisineObject.name : '');
      const categoryObject = data.categories.find(
        (cat) => cat.name.toLowerCase() === recipeInfo.category.toLowerCase()
      );
      setValue('category', categoryObject ? categoryObject.name : '');
      setValue('image', recipeInfo.image);

      recipeInfo.ingredients.map((ingredient, index) => {
        setValue(`ingredients.${index}.amount`, ingredient.amount);
        setValue(`ingredients.${index}.ingredient`, ingredient.ingredient);
      });
      recipeInfo.steps.map((ingredient, index) => {
        setValue(`steps.${index}`, ingredient.description);
      });
    }
  }, []);
  return (
    <>
      <Container component='main' maxWidth='xs'>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component='h1' variant='h5'>
            Add new recipe
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              type='text'
              id='title'
              label='Title'
              name='title'
              {...register('title', {
                required: 'Title field is required',
              })}
              error={!!errors.email}
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
                  margin='normal'
                  required
                  fullWidth
                  name={`ingredients[${index}].amount`}
                  label={`amount${index + 1}`}
                  type='text'
                  id='ingredients'
                  onChange={(e) =>
                    handleIngredientChange(index, 'amount', e.target.value)
                  }
                  {...register(`ingredients.${index}.amount`, {
                    required: `amount ${index + 1} is required`,
                  })}
                  error={!!errors[`inggredients${index}`]}
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  name={`ingredients[${index}].ingredient`}
                  label={`ingredient${index + 1}`}
                  type='text'
                  id='ingredients'
                  onChange={(e) =>
                    handleIngredientChange(index, 'ingredients', e.target.value)
                  }
                  {...register(`ingredients.${index}.ingredient`, {
                    required: `ingredient ${index + 1} is required`,
                  })}
                  error={!!errors[`inggredients${index}`]}
                />
              </Box>
            ))}
            <Button
              type='button'
              fullWidth
              variant='outlined'
              sx={{ mt: 2, mb: 2 }}
              onClick={handleAddIngredient}
            >
              + Add Ingredient
            </Button>

            {recipeInfo ? (
              recipeInfo.steps.map((step, index) => (
                <TextField
                  key={index}
                  margin='normal'
                  required
                  fullWidth
                  name={`steps[${index}]`}
                  label={`Step ${index + 1}`}
                  type='text'
                  id='steps'
                  onChange={(e) => handleStepChange(index, e.target.value)}
                  {...register(`steps.${index}`, {
                    required: `Step ${index + 1} is required`,
                  })}
                  error={!!errors[`steps${index}`]}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        {index + 1}
                      </InputAdornment>
                    ),
                  }}
                  helperText={
                    errors[`steps${index}`]
                      ? errors[`steps${index}`].message
                      : ''
                  }
                />
              ))
            ) : (
              <>
                {steps.map((step, index) => (
                  <TextField
                    key={index}
                    margin='normal'
                    required
                    fullWidth
                    name={`steps[${index}]`}
                    label={`Step ${index + 1}`}
                    type='text'
                    id='steps'
                    onChange={(e) => handleStepChange(index, e.target.value)}
                    {...register(`steps.${index}`, {
                      required: `Step ${index + 1} is required`,
                    })}
                    error={!!errors[`steps${index}`]}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          {index + 1}
                        </InputAdornment>
                      ),
                    }}
                    helperText={
                      errors[`steps${index}`]
                        ? errors[`steps${index}`].message
                        : ''
                    }
                  />
                ))}
              </>
            )}
            {recipeInfo ? (
              <>
                <Button
                  type='button'
                  fullWidth
                  variant='outlined'
                  sx={{ mt: 2, mb: 2 }}
                  onClick={handleAddStep}
                >
                  + Add Step
                </Button>
              </>
            ) : (
              <Button
                type='button'
                fullWidth
                variant='outlined'
                sx={{ mt: 2, mb: 2 }}
                onClick={handleAddStep}
              >
                + Add Step
              </Button>
            )}

            <Box
              sx={{
                mt: 3,
                display: 'flex',
                flexDirection: 'row',
                gap: 2, // Space between items
                alignItems: 'center',
                justifyContent: 'space-between', // Adjusts space between items for alignment
              }}
            >
              <Controller
                name='category'
                control={control}
                defaultValue=''
                rules={{ required: 'Category is required' }}
                render={({ field }) => (
                  <Select
                    {...field}
                    displayEmpty
                    fullWidth
                    error={!!errors.category}
                  >
                    <MenuItem value='' disabled>
                      Category
                    </MenuItem>
                    {data.categories &&
                      data.categories.map((item, index) => (
                        <MenuItem key={index} value={item.name}>
                          {item.name}
                        </MenuItem>
                      ))}
                  </Select>
                )}
              />
              <Controller
                name='cuisine'
                control={control}
                defaultValue=''
                rules={{ required: 'Cuisine is required' }}
                render={({ field }) => (
                  <Select
                    {...field}
                    displayEmpty
                    fullWidth
                    error={!!errors.cuisine}
                  >
                    <MenuItem value='' disabled>
                      Cuisine
                    </MenuItem>
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
              <TextField
                margin='normal'
                required
                fullWidth
                type='img'
                id='image'
                label='image URL'
                name='imaga'
                {...register('image', {
                  required: 'Image URL field is required',
                })}
                error={!!errors.image}
                helperText={errors.image ? errors.image.message : ''}
              />

              {error && <div style={{ color: 'red' }}>{error}</div>}
            </Box>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              onSubmit={onSubmit}
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
