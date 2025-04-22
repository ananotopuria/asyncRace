import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchCars, setPage } from '../../store/carsSlice'
import CarForm from './CarForm'
import CarCard from './CarCard'
import Pagination from '../commonCompopnents/Pagination'

export default function GaragePage() {
  const dispatch = useAppDispatch()
  const { cars, page, totalCount, status } = useAppSelector(s => s.cars)

  useEffect(() => {
    dispatch(fetchCars({ page, limit: 7 }))
  }, [dispatch, page])

  return (
    <main className="p-4">
      <h1 className="text-2xl mb-4">Garage</h1>

      <CarForm />

      <div className="my-4 space-x-2">
        <button className="btn">Start race</button>
        <button className="btn">Reset race</button>
        <button
          className="btn"
          onClick={() => {
            /* TODO: dispatch generate 100 random cars */
          }}
        >
          Generate 100
        </button>
      </div>

      {status === 'loading' ? (
        <p>Loading cars…</p>
      ) : cars.length === 0 ? (
        <p>No Cars</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {cars.map(car => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
      <Pagination
        currentPage={page}
        totalItems={totalCount}
        pageSize={7}
        onPageChange={p => dispatch(setPage(p))}
      />
    </main>
  )
}
