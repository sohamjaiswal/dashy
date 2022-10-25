export type fontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export interface ITypographyProps {
  label: string;
  italic?: boolean;
  weight?: fontWeight;
  color?: string;
  size?: number;
  extraClassname?: string[];
  extraStyles?: any;
  onClick?: () => void;
}
