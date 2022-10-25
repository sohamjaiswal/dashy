export interface IImageInputProps {
  image: string;
  onChange: (data: string) => void;
  radius?: string;
  previewHeight?: string;
  previewWidth?: string;
  border?: number;
  shadow?: boolean;
  extraClassnames?: string[];
}
