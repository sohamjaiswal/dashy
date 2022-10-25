import { TEXT_LIMIT } from "./global";
export const textLimiter = (text: string, limit: number) => {
  const croppedText =
    limit >= text.length ? text : `${text.slice(0, TEXT_LIMIT - 3)}...`;
  return croppedText;
};
