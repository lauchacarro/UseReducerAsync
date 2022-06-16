import { CatActions } from './cat.action';
import { CatState } from './Cat.state';

export function catReducer(state: CatState, action: CatActions): CatState {
  switch (action.type) {
    case 'set-cats':
      return { ...state, cats: action.cats };
    case 'set-loading':
      return { ...state, isLoading: action.isLoading };
  }
}
