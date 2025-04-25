import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchWinners, setWinnersPage, setSort } from "../../store/winnersSlice";

import Pagination from "../commonCompopnents/Pagination";

export default function WinnersComponents() {
  const dispatch = useAppDispatch();
  const { winners, totalCount, page, sortField, sortOrder, status } = useAppSelector((s) => s.winners);

  useEffect(() => {
    dispatch(fetchWinners({ page, limit: 10, sortField, sortOrder }));
  }, [dispatch, page, sortField, sortOrder]);

  const handleSort = (field: 'wins' | 'time') => {
    dispatch(setSort({ field, order: sortField === field && sortOrder === 'asc' ? 'desc' : 'asc' }));
  };

  return (
    <main className="p-4">
      <h1 className="text-2xl mb-4">Winners</h1>
      {status === 'loading' ? (
        <p>Loading winners…</p>
      ) : winners.length === 0 ? (
        <p>No winners yet</p>
      ) : (
        <>
          <table className="w-full text-left border">
            <thead>
              <tr>
                <th>#</th>
                <th>Car</th>
                <th>Name</th>
                <th className="cursor-pointer" onClick={() => handleSort('wins')}>
                  Wins {sortField === 'wins' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th className="cursor-pointer" onClick={() => handleSort('time')}>
                  Best Time (s) {sortField === 'time' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                </th>
              </tr>
            </thead>
            <tbody>
              {winners.map((winner, index) => (
                <tr key={winner.id}>
                  <td>{(page - 1) * 10 + index + 1}</td>
                  <td>
                    <div className="w-10 h-6 bg-gray-300" style={{ backgroundColor: winner.color }} />
                  </td>
                  <td>{winner.name}</td>
                  <td>{winner.wins}</td>
                  <td>{winner.time.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
