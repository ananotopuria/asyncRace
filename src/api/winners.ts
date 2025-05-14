const BASE_URL = import.meta.env.DEV ? '' : 'http://localhost:3000';

export interface WinnerRecord {
  id: number;
  name: string;
  color: string;
  wins: number;
  time: number;
}

export async function getWinners(
  page: number,
  limit: number,
  sortField: "wins" | "time",
  sortOrder: "asc" | "desc"
): Promise<{ data: WinnerRecord[]; totalCount: number }> {
  const res = await fetch(
    `${BASE_URL}/winners?_page=${page}&_limit=${limit}&_sort=${sortField}&_order=${sortOrder}`
  );
  if (!res.ok) throw new Error(`Error fetching winners: ${res.status}`);
  const data: WinnerRecord[] = await res.json();
  const totalCount = Number(res.headers.get("X-Total-Count") ?? data.length);
  return { data, totalCount };
}

export async function getWinner(id: number): Promise<WinnerRecord | null> {
  const res = await fetch(`${BASE_URL}/winners?id=${id}`);
  if (!res.ok) throw new Error(`Error fetching winner: ${res.status}`);
  const data: WinnerRecord[] = await res.json();
  return data.length > 0 ? data[0] : null;
}

export async function createWinner(
  record: WinnerRecord
): Promise<WinnerRecord> {
  const res = await fetch(`${BASE_URL}/winners`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(record),
  });
  if (!res.ok) throw new Error(`Error creating winner: ${res.status}`);
  return res.json();
}

export async function updateWinner(
  id: number,
  updates: Partial<Omit<WinnerRecord, "id">>
): Promise<WinnerRecord> {
  const res = await fetch(`${BASE_URL}/winners/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error(`Error updating winner: ${res.status}`);
  return res.json();
}
