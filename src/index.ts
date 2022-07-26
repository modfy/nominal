class NominalWrapper<Name extends string, Type> {
  nominal = () => {
    const NewSymbol = Symbol('');

    type NominalType<N extends string | never, T> = T & {
      readonly /**
       * @deprecated Do not use this it may not exist in runtime, this is only for typechecking purpose
       */
      [key in N]: typeof NewSymbol;
    };

    return {} as NominalType<Name, Type>;
  };
}

export type Nominal<Name extends string, Type> = ReturnType<
  NominalWrapper<Name, Type>['nominal']
>;

type InternalInferPrimitive<T> = T extends {}
  ? {
      [K in keyof T]: isSymbol<T[K]> extends true ? never : T[K];
    }
  : undefined;

type InferPrimitive<T> = T extends {}
  ? OmitNever<InternalInferPrimitive<T>>
  : T;
// type InferPrimitive2<T> = T extends Nominal<string, any> ? Name : undefined;

type isSymbol<T> = T extends symbol ? true : false;

type Values<T> = T[keyof T];

type OmitNever<T> = Pick<
  T,
  Values<{
    [Prop in keyof T]: [T[Prop]] extends [never] ? never : Prop;
  }>
>;

const make = <T>(value: InferPrimitive<T>) => value as T;

export const nominal = {
  make,
};

export * from './standardLib';
export * from './proportionalityConstant';
