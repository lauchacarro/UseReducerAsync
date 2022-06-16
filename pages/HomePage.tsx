import * as React from 'react';
import { Dispatch } from 'react';
import { AppContext } from '../data/AppContext';
import { loadCats, setLoading } from '../data/cats/cat.action';
import { wrapAsync } from '../data/wrapAsync';
import { DispatchObject } from '../utils/types';

export const HomePage: React.FC = () => {
  const { state, dispatch } = React.useContext(AppContext);

  React.useEffect(() => {
    dispatch(loadCats);
  }, []);

  const handleOnClick = () => {
    dispatch(setLoading, !state.cat.isLoading);
  };

  return (
    <div>
      {state.cat.isLoading && <h2>Cargando...</h2>}
      <button onClick={handleOnClick}>Load </button>

      {state.cat.cats.map((c) => {
        return (
          <div key={c.id}>
            <img src={'https://cataas.com/cat/' + c.id} width={40} />
          </div>
        );
      })}

      {!state.cat.cats.length && <h2>No se cargaron los gatos</h2>}
    </div>
  );
};
