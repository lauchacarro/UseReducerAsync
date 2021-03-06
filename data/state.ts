import { catReducer } from './cats/cat.reducer';
import { combineReducers } from './combineReducers';

export const initialState: AppState = {
  cat: {
    cats: [],
    favoriteCats: [],
    isLoading: false,
  },
};

export const reducers = combineReducers({
  cat: catReducer,
});

export type AppState = ReturnType<typeof reducers>;
