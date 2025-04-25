import { Winner } from '../types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export async function getWinners(
  page: number,
  limit: number,
  sortField: 'wins' | 'time',
  sortOrder: 'asc' | 'desc'
): Promise<{ data: Winner[]; totalCount: number }> {
  const res = await fetch(
    `${BASE_URL}/winners?_page=${page}&_limit=${limit}&_sort=${sortField}&_order=${sortOrder}`
  );
  if (!res.ok) throw new Error(`Error fetching winners: ${res.status}`);
  const data: Winner[] = await res.json();
  const totalCount = Number(res.headers.get('X-Total-Count') ?? data.length);
  return { data, totalCount };
}
