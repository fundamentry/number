import { type Brand } from './brand.js';

export type Negative = Brand.Branded<number, 'Negative'>;

export type NonNegative = Brand.Branded<number, 'NonNegative'>;

export type NonPositive = Brand.Branded<number, 'NonPositive'>;

export type NonZero = Brand.Branded<number, 'NonZero'>;

export type Positive = Brand.Branded<number, 'Positive'>;

export type Zero = Brand.Branded<number, 'Zero'>;
