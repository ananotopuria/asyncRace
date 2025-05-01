import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchWinners, setPage, setSort } from "../../store/winnersSlice";
import Pagination from "../commonComponents/Pagination";
import { WinnerRecord } from "../../api/winners";
import { motion } from "framer-motion";
// import carImg from "./../../assets/matthew-dockery-s99-JP8P3Hg-unsplash.jpg"

export default function WinnersPage() {
  const dispatch = useAppDispatch();
  const { winners, page, totalCount, status, sortField, sortOrder } =
    useAppSelector((state) => state.winners);

  useEffect(() => {
    dispatch(fetchWinners({ page, sortField, sortOrder }));
  }, [dispatch, page, sortField, sortOrder]);

  const toggleSort = (field: "wins" | "time") => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    dispatch(setSort({ field, order }));
  };

  return (
    <main className="min-h-screen bg-white p-4 flex flex-col">
      <div className="px-6 py-4 border-b">
        <motion.h1
          className="text-6xl mb-4 text-center font-racing p-[2rem] text-red"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Winners
        </motion.h1>
      </div>
      <div className=" bg-white shadow-lg overflow-hidden">
        {status === "loading" ? (
          <p className="p-4 text-center text-gray-600">Loading winners…</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <motion.th
                    className="px-4 py-2 text-left text-sm font-medium text-gray-700"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    #
                  </motion.th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                    Car
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                    Name
                  </th>
                  <th
                    className="px-4 py-2 text-left text-sm font-medium text-gray-700 cursor-pointer"
                    onClick={() => toggleSort("wins")}
                  >
                    Wins{" "}
                    {sortField === "wins"
                      ? sortOrder === "asc"
                        ? "↑"
                        : "↓"
                      : ""}
                  </th>
                  <th
                    className="px-4 py-2 text-left text-sm font-medium text-gray-700 cursor-pointer"
                    onClick={() => toggleSort("time")}
                  >
                    Best Time{" "}
                    {sortField === "time"
                      ? sortOrder === "asc"
                        ? "↑"
                        : "↓"
                      : ""}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {winners.map((w: WinnerRecord, idx: number) => (
                  <motion.tr
                    key={w.id}
                    className="hover:bg-gray-50"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                  >
                    <td className="px-4 py-2 text-sm text-gray-900">
                      {(page - 1) * 10 + idx + 1}
                    </td>
                    <td className="px-4 py-2">
                      <div
                        className="w-6 h-6 rounded-full mx-auto"
                        style={{ backgroundColor: w.color }}
                      />
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900">
                      {w.name}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900">
                      {w.wins}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900">
                      {w.time.toFixed(2)}s
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="px-6 py-4 border-t flex justify-center">
          <Pagination
            currentPage={page}
            totalItems={totalCount}
            pageSize={10}
            onPageChange={(p) => dispatch(setPage(p))}
          />
        </div>
      </div>
      {/* <div className="flex justify-center">

      <img src={carImg} className="w-auto h-[40rem]"/>
      </div> */}
    </main>
  );
}
