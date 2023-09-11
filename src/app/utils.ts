export function sortBySearch(arr: string[], searchValue: string): string[] {
  return arr.filter((item) => item.indexOf(searchValue) === 0).sort();
}
