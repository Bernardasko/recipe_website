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
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

function RecipeForm({ recipeInfo, setOpen }) {
  const [error, setError] = useState('');
  const [steps, setSteps] = useState(['']);
  const [ingredients, setIngredients] = useState([
    { ingredient: '', amount: '' },
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
  } = useForm();

  async function onSubmit(data) {
    const newRecipe = {
      ...data,
    };
    if (recipeInfo) {
      newRecipe.recipeId = recipeInfo.recipeId;
      const patched = await patchRecipeById(newRecipe);
      setOpen(false);
      navigate('/profile/recipes');

      if (patched.status !== 200) {
        toast.error('Error occured, recipe is not updated');
        setOpen(false);
        navigate('/profile/recipes');
      } else {
        toast.success('Recipe updated');

        setOpen(false);
        navigate('/profile/recipes');
      }
    } else {
      const posted = await postRecipe(newRecipe);
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
    setIngredients([...ingredients, { ingredient: '', amount: '' }]);
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
      setValue('image', recipeInfo.images);

      // Update the ingredients state
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

      setSteps(recipeInfo.steps.map((step) => step.description));
      recipeInfo.steps.forEach((step, index) => {
        setValue(`steps.${index}`, step.description);
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
            maxWidth: 500,
            mx: 'auto',
            mt: 3,
            height: '90vh',
            overflowY: 'auto',
          }}
        >
          <Typography component='h1' variant='h5'>
            {recipeInfo ? 'Edit Recipe' : 'Add New Recipe'}
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
                  margin='normal'
                  required
                  fullWidth
                  name={`ingredients[${index}].amount`}
                  label={`Amount ${index + 1}`}
                  type='text'
                  id={`ingredients-amount-${index}`}
                  onChange={(e) =>
                    handleIngredientChange(index, 'amount', e.target.value)
                  }
                  {...register(`ingredients.${index}.amount`, {
                    required: `Amount ${index + 1} is required`,
                  })}
                  error={!!errors.ingredients?.[index]?.amount}
                  helperText={errors.ingredients?.[index]?.amount?.message}
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  name={`ingredients[${index}].ingredient`}
                  label={`Ingredient ${index + 1}`}
                  type='text'
                  id={`ingredients-name-${index}`}
                  onChange={(e) =>
                    handleIngredientChange(index, 'ingredient', e.target.value)
                  }
                  {...register(`ingredients.${index}.ingredient`, {
                    required: `Ingredient ${index + 1} is required`,
                  })}
                  error={!!errors.ingredients?.[index]?.ingredient}
                  helperText={errors.ingredients?.[index]?.ingredient?.message}
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

            {steps.map((step, index) => (
              <TextField
                key={index}
                margin='normal'
                required
                fullWidth
                name={`steps[${index}]`}
                label={`Step ${index + 1}`}
                type='text'
                id={`step-${index}`}
                onChange={(e) => handleStepChange(index, e.target.value)}
                {...register(`steps.${index}`, {
                  required: `Step ${index + 1} is required`,
                })}
                error={!!errors.steps?.[index]}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      {index + 1}
                    </InputAdornment>
                  ),
                }}
                helperText={errors.steps?.[index]?.message}
              />
            ))}
            <Button
              type='button'
              fullWidth
              variant='outlined'
              sx={{ mt: 2, mb: 2 }}
              onClick={handleAddStep}
            >
              + Add Step
            </Button>

            <Box
              sx={{
                mt: 3,
                display: 'flex',
                flexDirection: 'row',
                gap: 2,
                alignItems: 'center',
                justifyContent: 'space-between',
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
                      data.cuisines.data.map((item, index) => (
                        <MenuItem key={index} value={item.name}>
                          {item.name}
                        </MenuItem>
                      ))}
                  </Select>
                )}
              />
            </Box>
            <TextField
              margin='normal'
              required
              fullWidth
              type='url'
              id='image'
              label='Image URL'
              name='image'
              {...register('image', {
                required: 'Image URL field is required',
              })}
              error={!!errors.image}
              helperText={errors.image ? errors.image.message : ''}
            />

            {error && <div style={{ color: 'red' }}>{error}</div>}
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              {recipeInfo ? 'Update Recipe' : 'Add Recipe'}
            </Button>
          </Box>
        </Box>
      </Container>
      <Toaster />
    </>
  );
}

export default RecipeForm;
