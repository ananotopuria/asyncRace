import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchWinners, setPage, setSort } from '../../store/winnersSlice';
import Pagination from '../commonComponents/Pagination';
import { WinnerRecord } from '../../api/winners';

export default function WinnersPage() {
  const dispatch = useAppDispatch();
  const { winners, page, totalCount, status, sortField, sortOrder } = useAppSelector((state) => state.winners);

  useEffect(() => {
    dispatch(fetchWinners({ page, sortField, sortOrder }));
  }, [dispatch, page, sortField, sortOrder]);

  const toggleSort = (field: 'wins' | 'time') => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    dispatch(setSort({ field, order }));
  };

  return (
    <main className="p-4">
      <h1 className="text-4xl mb-4">Winners</h1>
      {status === 'loading' ? (
        <p>Loading winners…</p>
      ) : (
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border p-2">#</th>
              <th className="border p-2">Car</th>
              <th className="border p-2">Name</th>
              <th
                className="border p-2 cursor-pointer"
                onClick={() => toggleSort('wins')}
              >
                Wins {sortField === 'wins' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th
                className="border p-2 cursor-pointer"
                onClick={() => toggleSort('time')}
              >
                Best Time {sortField === 'time' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
              </th>
            </tr>
          </thead>
          <tbody>
            {winners.map((w: WinnerRecord, idx: number) => (
              <tr key={w.id} className="text-center">
                <td className="border p-2">{(page - 1) * 10 + idx + 1}</td>
                <td className="border p-2">
                  <div
                    className="w-6 h-6 rounded-full mx-auto"
                    style={{ backgroundColor: w.color }}
                  />
                </td>
                <td className="border p-2">{w.name}</td>
                <td className="border p-2">{w.wins}</td>
                <td className="border p-2">{w.time.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="mt-4 flex justify-center">
        <Pagination
          currentPage={page}
          totalItems={totalCount}
          pageSize={10}
          onPageChange={(p) => dispatch(setPage(p))}
        />
      </div>
    </main>
  );
}
