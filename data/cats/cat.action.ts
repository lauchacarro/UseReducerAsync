import { Cat } from '../../models/Cat';
import { ActionType, DispatchObject } from '../../utils/types';
import { getCatsData } from './cat.api';

export const loadCats =
  () => async (dispatch: React.Dispatch<DispatchObject>) => {
    dispatch(setLoading(true));

    const cats = await getCatsData();
    dispatch(setCats(cats));

    dispatch(setLoading(false));
  };

export const setLoading = (isLoading: boolean) =>
  ({
    type: 'set-loading',
    isLoading,
  } as DispatchObject);

export const setCats = (cats: Cat[]) =>
  ({
    type: 'set-cats',
    cats,
  } as DispatchObject);

export type CatActions =
  | ActionType<typeof setLoading>
  | ActionType<typeof setCats>;
