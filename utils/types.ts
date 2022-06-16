export interface DispatchObject {
  [key: string]: any;
  type: string;
}

export type PromiseResolveValue<T> = T extends Promise<infer R> ? R : T;
export type EffectType<T extends (...args: any) => any> = ReturnType<ReturnType<T>>;
export type EffectReturnValue<T extends (...args: any) => any> = PromiseResolveValue<
  EffectType<T>
>;
export type ActionType<T extends (...args: any) => any> =
  ReturnType<T> extends DispatchObject ? ReturnType<T> : EffectReturnValue<T>;
