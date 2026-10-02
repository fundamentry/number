import { type Brand } from '@fundamentry/brand';

export type Integer = Brand.Branded<number, 'Integer'>;

export type Negative = Brand.Branded<number, 'Negative'>;

export type NonNegative = Brand.Branded<number, 'NonNegative'>;

export type NonNegativeInteger = Integer & NonNegative;

export type NonPositive = Brand.Branded<number, 'NonPositive'>;

export type NonZero = Brand.Branded<number, 'NonZero'>;

export type Positive = Brand.Branded<number, 'Positive'>;

export type Zero = Brand.Branded<number, 'Zero'>;
