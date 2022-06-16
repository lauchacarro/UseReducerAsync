import { Cat } from '../../models/Cat';
import { ActionType } from '../../utils/types';
import { getCatsData } from './cat.api';

export const loadCats = () => async (dispatch: React.Dispatch<any>) => {
  dispatch(setLoading(true));

  const cats = await getCatsData();

  dispatch(setLoading(false));

  return {
    type: 'set-cats',
    cats,
  };
};

export const setLoading = (isLoading: boolean) =>
  ({
    type: 'set-loading',
    isLoading,
  } as const);

export const setCats = (cats: Cat[]) =>
  ({
    type: 'set-cats',
    cats,
  } as const);

export type CatActions =
  | ActionType<typeof setLoading>
  | ActionType<typeof setCats>;
