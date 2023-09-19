export function sortBySearch(arr: string[], searchValue: string): string[] {
  return arr.filter((item) => item.indexOf(searchValue) === 0).sort();
}

export function paginate<T>(
  currentPage: number,
  perPage: number,
  array: T[]
): T[] {
  const lastIndex = currentPage * perPage;
  const firstIndex = lastIndex - perPage;
  return array.slice(firstIndex, lastIndex);
}
