export const removeMask = (value: string) =>
  value
    .replaceAll('.', '')
    .replaceAll(',', '')
    .replaceAll('-', '')
    .replaceAll('_', '');
