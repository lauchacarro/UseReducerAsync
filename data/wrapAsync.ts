import * as React from 'react';
import { Dispatch } from 'react';
import { DispatchObject } from '../utils/types';

type FuncType = (dispatch: React.Dispatch<any>) => Promise<DispatchObject>;

type FuncOrObjectType = FuncType | DispatchObject;

function isObjectAction(
  dispatchFunc: FuncOrObjectType
): dispatchFunc is DispatchObject {
  return (<DispatchObject>dispatchFunc)?.type !== undefined;
}

function isPromise(obj: any) {
  return typeof obj === 'object' && obj.then;
}

function isAsyncFunction(obj: any) {
  return obj.constructor?.name === 'AsyncFunction';
}

function isFunction(obj: any) {
  return typeof obj === 'function';
}

export function wrapAsync(dispatch: Dispatch<DispatchObject>) {
  const dispatchAsync = (func: any, ...args: any) => {
    if (isObjectAction(func)) {
      dispatch(func);
      return;
    }

    if (isFunction(func)) {
      if (isPromise(func)) {
        resolvePromise(func, dispatch);
      } else if (isAsyncFunction(func)) {
        const result = func(dispatch);
        if (isPromise(result)) {
          resolvePromise(result, dispatch);
        }
      } else {
        const result = args?.length ? func(...args) : func(dispatch);

        if (result) {
          dispatchAsync(result, dispatch);
        }
      }
    }
  };
  return dispatchAsync;
}

function resolvePromise(promise: Promise<any>, dispatch: Dispatch<any>) {
  promise.then((dispatchObject?: DispatchObject) => {
    if (dispatchObject && dispatchObject.type) {
      dispatch(dispatchObject);
    }
  });
}
