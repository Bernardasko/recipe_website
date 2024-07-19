import React, { useState, useEffect } from 'react';
import { styled, alpha, MenuItem, Select, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  maxWidth: 400,
  display: 'flex',
  alignItems: 'center',
  height: 40,
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(0.5em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    marginLeft: 'px',
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  color: 'inherit',
  '& .MuiSelect-icon': {
    color: 'inherit',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
}));

function SearchBar({
  setLimit,
  setSearch,
  search,
  setOrder,
  setSortCategory,
  setSortCusine
}) {
  const [searchCriteria, setSearchCriteria] = useState('title');

  const handleChange = (event) => {

  };

  return (
    <Search sx={{ margin: 'auto' }}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder='Search…'
        inputProps={{ 'aria-label': 'search' }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <StyledSelect
          value={`search:${searchCriteria}` || `sort:${sortCriteria}`}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'criteria' }}
          IconComponent={ArrowDropDownIcon}
        >
          <MenuItem disabled>
            <em>Order By</em>
          </MenuItem>
          <MenuItem onClick={() => setSort('recipes.title')}>Title</MenuItem>
          {/* <MenuItem onClick={() => setSort('ingredients')}>Ingredients</MenuItem> */}
          {setSortCusine && (
            <MenuItem onClick={() => setSortCusine('categories.name')}>
              Category
            </MenuItem>
          )}
          {setSortCategory &&
            <MenuItem onClick={() => setSortCategory('categories.name')}>
              Cuisine
            </MenuItem>
          }
          <MenuItem disabled>
            <em>Order</em>
          </MenuItem>
          <MenuItem
            onClick={() => {
              setOrder('ASC');
            }}
          >
            Asending
          </MenuItem>
          <MenuItem
            onClick={() => {
              setOrder('DESC');
            }}
          >
            Descending
          </MenuItem>
          {/* <MenuItem disabled>
            <em>Sort By</em>
          </MenuItem>
          <MenuItem value="sort:cuisine">Cuisine (Country)</MenuItem>
          <MenuItem value="sort:category">Category</MenuItem> */}
          <MenuItem disabled>Show:</MenuItem>
          <MenuItem onClick={() => setLimit(10)}>10</MenuItem>
          <MenuItem onClick={() => setLimit(20)}>20</MenuItem>
          <MenuItem onClick={() => setLimit(30)}>30</MenuItem>
        </StyledSelect>
      </Box>
    </Search>
  );
}

export default SearchBar;
