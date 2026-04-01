export const getReadingTime = (content?: string | null): string => {
  const safeContent = content || '';
  const words = safeContent
    .replace(/[#_*>\-\[\]()`.]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} мин чтения`;
};
