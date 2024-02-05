import * as catigoryConstants from '../Constants/catigoryConstants';

export const listCatigorys = (state = { catigorys: [] }, action) => {
  switch (action.type) {
    case catigoryConstants.CATIGORYLIST_FETCH_START:
      return {
        loading: true,
        catigorys: [],
      };
    case catigoryConstants.CATIGORYLIST_FETCH_SUCCESS:
      console.log(action.payload.result + '   catigory Reducers');
      return {
        catigorys: action.payload.results,
        count: action.payload.count,
        success: true,
      };
    case catigoryConstants.CATIGORYLIST_FETCH_ERROR:
      return {
        error: action.payload,
      };

    default:
      return state;
  }
};

export const Catigory = (state = { catigory: {} }, action) => {
  switch (action.type) {
    case catigoryConstants.CATIGORY_FETCH_START:
      return {
        loading: true,
        catigory: {},
      };
    case catigoryConstants.CATIGORY_FETCH_SUCCESS:
      return {
        catigory: action.payload,
        success: true,
      };
    case catigoryConstants.CATIGORY_FETCH_FAIL:
      return {
        error: action.payload,
      };

    default:
      return state;
  }
};

export const deleteCatigory = (state = {}, action) => {
  switch (action.type) {
    case catigoryConstants.DELETE_CATIGORY_START:
      return {
        loading: true,
      };
    case catigoryConstants.DELETE_CATIGORY_SUCCESS:
      return {
        success: true,
      };
    case catigoryConstants.DELETE_CATIGORY_FAIL:
      return {
        error: action.payload,
      };

    case catigoryConstants.DELETE_CATIGORY_RESET:
      return {};

    default:
      return state;
  }
};

export const createCatigory = (state = {}, action) => {
  switch (action.type) {
    case catigoryConstants.CREATE_CATIGORY_START:
      return {
        loading: true,
      };
    case catigoryConstants.CREATE_CATIGORY_SUCCESS:
      return {
        success: true,
      };
    case catigoryConstants.CREATE_CATIGORY_FAIL:
      return {
        error: action.payload,
      };

    case catigoryConstants.CREATE_CATIGORY_RESET:
      return {};

    default:
      return state;
  }
};

export const EditCatigory = (state = {}, action) => {
  switch (action.type) {
    case catigoryConstants.EDIT_CATIGORY_START:
      return {
        loading: true,
      };
    case catigoryConstants.EDIT_CATIGORY_SUCCESS:
      return {
        success: true,
      };
    case catigoryConstants.EDIT_CATIGORY_FAIL:
      return {
        error: action.payload,
      };
    case catigoryConstants.EDIT_CATIGORY_RESET:
      return {};
    default:
      return state;
  }
};
