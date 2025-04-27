import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchWinners, setWinnersPage, setSort } from "../../store/winnersSlice";
import Pagination from "../commonComponents/Pagination";

export default function WinnersPage() {
  const dispatch = useAppDispatch();
  const { winners, totalCount, page, sortField, sortOrder, status } = useAppSelector(s => s.winners);

  useEffect(() => {
    dispatch(fetchWinners({ page, limit: 10, sortField, sortOrder }));
  }, [dispatch, page, sortField, sortOrder]);

  const handleSort = (field: 'wins' | 'time') => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    dispatch(setSort({ field, order }));
  };

  return (
    <main className="p-4">
      <h1 className="text-4xl mb-4 text-center font-racing">Winners</h1>

      {status === 'loading' ? (
        <p>Loading winners…</p>
      ) : winners.length === 0 ? (
        <p>No winners yet</p>
      ) : (
        <>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-2 py-1 border">#</th>
                  <th className="px-2 py-1 border">Car</th>
                  <th className="px-2 py-1 border">Name</th>
                  <th
                    className="px-2 py-1 border cursor-pointer"
                    onClick={() => handleSort('wins')}
                  >
                    Wins {sortField === 'wins' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                  </th>
                  <th
                    className="px-2 py-1 border cursor-pointer"
                    onClick={() => handleSort('time')}
                  >
                    Best Time (s){' '}
                    {sortField === 'time' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                  </th>
                </tr>
              </thead>
              <tbody>
                {winners.map((winner, idx) => (
                  <tr
                    key={winner.id}
                    className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  >
                    <td className="px-2 py-1 border">
                      {(page - 1) * 10 + idx + 1}
                    </td>
                    <td className="px-2 py-1 border">
                      <div
                        className="w-6 h-4 rounded"
                        style={{ backgroundColor: winner.color }}
                      />
                    </td>
                    <td className="px-2 py-1 border">{winner.name}</td>
                    <td className="px-2 py-1 border">{winner.wins}</td>
                    <td className="px-2 py-1 border">
                      {winner.time.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination
            currentPage={page}
            totalItems={totalCount}
            pageSize={10}
            onPageChange={(p) => dispatch(setWinnersPage(p))}
          />
        </>
      )}
    </main>
);
}
