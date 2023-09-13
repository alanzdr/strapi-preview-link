import produce from 'immer';

export const REDUCER_ID = 'preview';
export const REDUCER_SET_CONFIG = 'preview/set-config';
export const REDUCER_SET_LOADING = 'preview/set-loading';

const initialState = {
  isLoading: false,
  isLoaded: false,
  config: {
    contentTypes: [],
  },
};

export default {
  [REDUCER_ID]: produce((previousState, action) => {
    let state = previousState ?? initialState

    if (action.type === REDUCER_SET_LOADING) {
      state = {
        ...state,
        isLoading: true,
      }
    }

    if (action.type === REDUCER_SET_CONFIG) {
      state = {
        ...state,
        isLoaded: true,
        isLoading: false,
        config: action.data,
      }
    }

    return state;
  })
}