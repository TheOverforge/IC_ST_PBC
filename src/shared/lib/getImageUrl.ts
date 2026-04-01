import { SERVER_URL } from '../config/api';

export const getImageUrl = (value?: string | null): string => {
  if (!value) return '';

  if (value.startsWith('http://') || value.startsWith('https://')) {
    return value;
  }

  return `${SERVER_URL}${value}`;
};
