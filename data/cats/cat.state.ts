import { Cat } from '../../models/Cat';

export interface CatState {
  cats: Cat[];
  favoriteCats: string[];
  isLoading: boolean;
}
