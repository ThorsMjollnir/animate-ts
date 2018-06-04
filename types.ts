export type AnmAxis = 'Y' | 'X';
export type StyleTokens = '*' | {
  [key: string]: string | number;
} | Array<'*' | {
  [key: string]: string | number;
}>;
