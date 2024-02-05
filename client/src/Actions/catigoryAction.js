import * as catigoryServices from '../services/catigory';
import { handleError } from '../utils/error';
import * as catigoryConstants from '../Constants/catigoryConstants';

export const catigoryList = (initialLoading) => async (dispatch) => {
  try {
    if (initialLoading) {
      dispatch({ type: catigoryConstants.CATIGORYLIST_FETCH_START });
    }

    const { results, count } = await catigoryServices.fetchCatigorys();
    dispatch({
      type: catigoryConstants.CATIGORYLIST_FETCH_SUCCESS,
      payload: { results, count },
    });
  } catch (err) {
    dispatch({
      type: catigoryConstants.CATIGORYLIST_FETCH_ERROR,
      payload: handleError(err),
    });
  }
};
export const catigoryListForAdmin = (initialLoading) => async (dispatch) => {
  try {
    if (initialLoading) {
      dispatch({ type: catigoryConstants.CATIGORYLIST_FETCH_START });
    }

    const { results, count } = await catigoryServices.fetchCatigorys({});
    console.log(results, count + ' Category Action');

    dispatch({
      type: catigoryConstants.CATIGORYLIST_FETCH_SUCCESS,
      payload: { results, count },
    });
  } catch (err) {
    dispatch({
      type: catigoryConstants.CATIGORYLIST_FETCH_ERROR,
      payload: handleError(err),
    });
  }
};

export const catigory = (id) => async (dispatch) => {
  try {
    dispatch({ type: catigoryConstants.CATIGORY_FETCH_START });

    const data = await catigoryServices.fetchCatigory(id);

    dispatch({
      type: catigoryConstants.CATIGORY_FETCH_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: catigoryConstants.CATIGORY_FETCH_FAIL,
      payload: handleError(err),
    });
  }
};

export const deleteCatigory = (id) => async (dispatch) => {
  try {
    dispatch({ type: catigoryConstants.DELETE_CATIGORY_START });

    await catigoryServices.deleteCatigory(id);

    dispatch({
      type: catigoryConstants.DELETE_CATIGORY_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: catigoryConstants.DELETE_CATIGORY_FAIL,
      payload: handleError(err),
    });
  }
};

export const createCatigory = (formData) => async (dispatch) => {
  console.log(formData);
  try {
    dispatch({ type: catigoryConstants.CREATE_CATIGORY_START });

    await catigoryServices.createCatigory(formData);

    dispatch({
      type: catigoryConstants.CREATE_CATIGORY_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: catigoryConstants.CREATE_CATIGORY_FAIL,
      payload: handleError(err),
    });
  }
};

export const EditCatigory = (id, UpdatedData) => async (dispatch) => {
  try {
    dispatch({ type: catigoryConstants.EDIT_CATIGORY_START });

    await catigoryServices.updateCatigory(id, UpdatedData);
    dispatch({
      type: catigoryConstants.EDIT_CATIGORY_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: catigoryConstants.EDIT_CATIGORY_FAIL,
      payload: handleError(err),
    });
  }
};
