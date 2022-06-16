import * as React from 'react';
import { Dispatch } from 'react';
import { ActionType, DispatchObject } from '../utils/types';
import { AppContext } from './AppContext';

type FuncType = () => (dispatch: React.Dispatch<any>) => Promise<void>;

type ObjectAction = { type: string };

type FuncOrObjectType = FuncType | ObjectAction;

function isObjectAction(
  dispatchFunc: FuncOrObjectType
): dispatchFunc is ObjectAction {
  return (<ObjectAction>dispatchFunc)?.type !== undefined;
}

export function wrapAsync(dispatch: Dispatch<DispatchObject>) {
  return (func: any, ...args: any) => {
    if (typeof func === 'object' && func.type) {
      dispatch(func);
      return;
    }

    const dispatchFunc = func(...args);

    if (typeof dispatchFunc === 'object' && dispatchFunc.type) {
      dispatch(dispatchFunc);
      return;
    }

    if (typeof dispatchFunc === 'function') {
      const result = dispatchFunc(dispatch);

      if (typeof result === 'object' && result.then) {
        result.then((dispatchObject?: DispatchObject) => {
          if (dispatchObject && dispatchObject.type) {
            dispatch(dispatchObject);
          }
        });
      }
    }
  };
}
