import * as React from 'react';
import { Dispatch } from 'react';
import { ActionType, DispatchObject } from '../utils/types';
import { AppContext } from './AppContext';

type FuncType = (dispatch: React.Dispatch<any>) => Promise<DispatchObject>;

type FuncOrObjectType = FuncType | DispatchObject;

function isObjectAction(
  dispatchFunc: FuncOrObjectType
): dispatchFunc is DispatchObject {
  return (<DispatchObject>dispatchFunc)?.type !== undefined;
}

function isFuncType(dispatchFunc: any): dispatchFunc is FuncType {
  return (<FuncType>dispatchFunc).name !== undefined;
}

export function wrapAsync(dispatch: Dispatch<DispatchObject>) {
  return (func: any, ...args: any) => {
    if (isObjectAction(func)) {
      dispatch(func);
      return;
    }

    if (isFuncType(func)) {
      resolveDispatchFunc(func, dispatch);
    }

    const dispatchFunc = func(...args);

    if (isObjectAction(dispatchFunc)) {
      dispatch(dispatchFunc);
      return;
    }

    if (typeof dispatchFunc === 'function') {
      resolveDispatchFunc(dispatchFunc, dispatch);
    }
  };
}

function resolveDispatchFunc(dispatchFunc: FuncType, dispatch: Dispatch<any>) {
  const result = dispatchFunc(dispatch);

  if (typeof result === 'object' && result.then) {
    result.then((dispatchObject?: DispatchObject) => {
      if (dispatchObject && dispatchObject.type) {
        dispatch(dispatchObject);
      }
    });
  }
}
