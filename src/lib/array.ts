export function groupBy<T, K extends string>(
  array: T[],
  getKey: (item: T) => K,
): Record<K, T[]> {
  return array.reduce<Record<K, T[]>>(
    (groups, item) => {
      const key = getKey(item);
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(item);
      return groups;
    },
    {} as Record<K, T[]>,
  );
}
