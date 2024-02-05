import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCatigorys } from 'services/catigory';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    top: -24,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function Filtetr({ sort, handleSort, setPriceRange, setLtORgt, ltORgt, handlePriceRange, handleFilters, filters }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);

  const catigoryList = useSelector((state) => state.catigoryList);

  const { catigorys, success } = catigoryList;
  console.log(catigorys);
  const dispatch = useDispatch();

  useEffect(() => {
    if (success && initialLoading) {
      setInitialLoading(false);
    } else {
      fetchCatigorys();
    }
    // eslint-disable-next-line
  }, [dispatch, filters, success]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
        Filter
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography className={classes.typography}>
          <h6>Sort By</h6>
          <FormControlLabel
            control={
              <Checkbox
                checked={sort.includes('name')}
                color="primary"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
                value="name"
                onChange={(e) => handleSort(e.target.value)}
              />
            }
            label="Name"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={sort.includes('price')}
                color="primary"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
                value="price"
                onChange={(e) => handleSort(e.target.value)}
              />
            }
            label="Price"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={sort.includes('averageRating')}
                color="primary"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
                value="averageRating"
                onChange={(e) => handleSort(e.target.value)}
              />
            }
            label="Rating"
          />

          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              onChange={(e) => handleFilters('category', e.target.value)}
              label="Category"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {catigorys &&
                catigorys.map((catigory) => (
                  <MenuItem key={catigory._id} value={catigory.categoryName}>
                    {catigory.categoryName}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <div className="mt-4 mb-4">
            <TextField
              autoComplete="priceRange"
              name="priceRange"
              variant="outlined"
              type="number"
              required
              id="priceRange"
              placeholder="Price Range"
              label="Price Range"
              onChange={(e) => setPriceRange(e.target.value)}
            />{' '}
            <FormControlLabel
              control={
                <Checkbox
                  checked={ltORgt === 'lt'}
                  color="primary"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                  value="lt"
                  onChange={(e) => setLtORgt(e.target.value)}
                />
              }
              label="Less than"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={ltORgt === 'gte'}
                  color="primary"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                  value="gte"
                  onChange={(e) => setLtORgt(e.target.value)}
                />
              }
              label="Greater Or equal to"
            />
          </div>
          <div>
            <Button variant="contained" color="primary" onClick={handlePriceRange}>
              Done
            </Button>
          </div>
        </Typography>
      </Popover>
    </div>
  );
}
export default Filtetr;
