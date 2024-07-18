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
    marginLeft: "px",
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

function SearchBar({ onSearch, onSort }) {
  const [searchValue, setSearchValue] = useState('');
  const [searchCriteria, setSearchCriteria] = useState('title');
  const [sortCriteria, setSortCriteria] = useState('');

  // useEffect(() => {
  //   if (searchValue) {
  //     onSearch(searchValue, searchCriteria);
  //   }
  // }, [searchValue, searchCriteria, onSearch]);

  // useEffect(() => {
  //   if (sortCriteria) {
  //     onSort(sortCriteria);
  //   }
  // }, [sortCriteria, onSort]);

  const handleChange = (event) => {
    const value = event.target.value;
    if (value.startsWith('search:')) {
      setSearchCriteria(value.replace('search:', ''));
    } else {
      setSortCriteria(value.replace('sort:', ''));
    }
  };

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <Box sx={{ display: 'flex', alignItems: 'center'}}>
        <StyledSelect
          value={`search:${searchCriteria}` || `sort:${sortCriteria}`}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'criteria' }}
          IconComponent={ArrowDropDownIcon}
        >
          <MenuItem disabled>
            <em>Search By</em>
          </MenuItem>
          <MenuItem value="search:title">Title</MenuItem>
          <MenuItem value="search:ingredients">Ingredients</MenuItem>
          <MenuItem value="search:category">Category</MenuItem>
          <MenuItem disabled>
            <em>Sort By</em>
          </MenuItem>
          <MenuItem value="sort:cuisine">Cuisine (Country)</MenuItem>
          <MenuItem value="sort:category">Category</MenuItem>
        </StyledSelect>
      </Box>
    </Search>
  );
}

export default SearchBar;
