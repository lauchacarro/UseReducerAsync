import { Cat } from '../../models/Cat';
import { ActionType, DispatchObject } from '../../utils/types';
import { getCatsData } from './cat.api';

export const loadCats =
  () => async (dispatch: React.Dispatch<DispatchObject>) => {
    console.log('Antes del dispatch', dispatch);
    dispatch(setLoading(true));

    const cats = await getCatsData();
    dispatch(setCats(cats));

    dispatch(setLoading(false));
  };

  export const loadCatsVacio =
  () => (dispatch: React.Dispatch<DispatchObject>) => {
    console.log('Antes del dispatch', dispatch);
    dispatch(setLoading(true));

    const cats = [{ "id": "595f280c557291a9750ebf80",
          "created_at": "2015-11-06T18:36:37.342Z",
          "tags": [
            "cute",
            "eyes"
    ]}];
    // dispatch(setCats(cats));

    dispatch(setLoading(false));

    return ({
      type: 'set-cats',
      cats,
    } as DispatchObject)
  };

export const setLoading = (isLoading: boolean) => {
  console.log('Antes del dispatch', isLoading);
  return ({
    type: 'set-loading',
    isLoading,
  } as DispatchObject);
}

export const setCats = (cats: Cat[]) =>
  ({
    type: 'set-cats',
    cats,
  } as DispatchObject);

export type CatActions =
  | ActionType<typeof setLoading>
  | ActionType<typeof setCats>;
