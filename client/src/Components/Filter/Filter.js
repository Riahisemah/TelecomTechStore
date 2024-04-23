import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { useDispatch } from 'react-redux';

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
  const dispatch = useDispatch();

  useEffect(() => {
    if (initialLoading) {
      setInitialLoading(false);
    } else {
    }
    // eslint-disable-next-line
  }, [dispatch, filters]);

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
      <Button
        aria-describedby={id}
        variant="contained"
        style={{
          background: 'rgb(32,113,31)',
          // eslint-disable-next-line no-dupe-keys
          background:
            'linear-gradient(90deg, rgba(32,113,31,1) 0%, rgba(214,255,0,1) 34%, rgba(255,35,235,1) 69%, rgba(12,15,145,1) 100%)',
        }}
        onClick={handleClick}
      >
        Filtre
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
          <h6>Trier Par</h6>
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
            label="Nom"
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
            label="Prix"
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
            label="Evaluation"
          />
          <div className="mt-4 mb-4">
            <TextField
              autoComplete="priceRange"
              name="priceRange"
              variant="outlined"
              type="number"
              required
              id="priceRange"
              placeholder="Échelle des prix"
              label="Échelle des prix"
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
              label="Moins que"
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
              label="Supérieur ou égal à"
            />
          </div>
          <div>
            <Button
              variant="contained"
              style={{
                background: 'rgb(32,113,31)',
                // eslint-disable-next-line no-dupe-keys
                background:
                  'linear-gradient(90deg, rgba(32,113,31,1) 0%, rgba(214,255,0,1) 34%, rgba(255,35,235,1) 69%, rgba(12,15,145,1) 100%)',
              }}
              onClick={handlePriceRange}
            >
              Filtre
            </Button>
          </div>
        </Typography>
      </Popover>
    </div>
  );
}
export default Filtetr;
