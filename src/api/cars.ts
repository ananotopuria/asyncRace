// import { Car } from '../types'

// const BASE_URL = process.env.REACT_APP_API_BASE_URL ?? 'http://localhost:3000'

// export async function getCars(
//   page: number,
//   limit: number
// ): Promise<{ data: Car[]; totalCount: number }> {
//   const res = await fetch(`${BASE_URL}/garage?_page=${page}&_limit=${limit}`)
//   if (!res.ok) throw new Error(`Error fetching cars: ${res.status}`)
//   const data: Car[] = await res.json()
//   const totalCount = Number(res.headers.get('X-Total-Count') ?? data.length)
//   return { data, totalCount }
// }

// export async function createCar(car: Omit<Car, 'id'>): Promise<Car> {
//   const res = await fetch(`${BASE_URL}/garage`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(car),
//   })
//   if (!res.ok) throw new Error(`Error creating car: ${res.status}`)
//   return res.json()
// }

// export async function updateCar(
//   id: number,
//   updates: Partial<Omit<Car, 'id'>>
// ): Promise<Car> {
//   const res = await fetch(`${BASE_URL}/garage/${id}`, {
//     method: 'PATCH',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(updates),
//   })
//   if (!res.ok) throw new Error(`Error updating car: ${res.status}`)
//   return res.json()
// }


// export async function deleteCar(id: number): Promise<void> {
//   const res = await fetch(`${BASE_URL}/garage/${id}`, { method: 'DELETE' })
//   if (!res.ok) throw new Error(`Error deleting car: ${res.status}`)
// }

// src/api/cars.ts
import { Car } from '../types'

// Use Vite environment or fallback to localhost
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

/**
 * Fetches cars with pagination from the garage endpoint.
 */
export async function getCars(
  page: number,
  limit: number
): Promise<{ data: Car[]; totalCount: number }> {
  const res = await fetch(`${BASE_URL}/garage?_page=${page}&_limit=${limit}`)
  if (!res.ok) throw new Error(`Error fetching cars: ${res.status}`)
  const data: Car[] = await res.json()
  const totalCount = Number(res.headers.get('X-Total-Count') ?? data.length)
  return { data, totalCount }
}

/**
 * Creates a new car in the garage.
 */
export async function createCar(
  car: Omit<Car, 'id'>
): Promise<Car> {
  const res = await fetch(`${BASE_URL}/garage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(car),
  })
  if (!res.ok) throw new Error(`Error creating car: ${res.status}`)
  return res.json()
}

/**
 * Updates a car by ID.
 */
export async function updateCar(
  id: number,
  updates: Partial<Omit<Car, 'id'>>
): Promise<Car> {
  const res = await fetch(`${BASE_URL}/garage/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  })
  if (!res.ok) throw new Error(`Error updating car: ${res.status}`)
  return res.json()
}

/**
 * Deletes a car by ID.
 */
export async function deleteCar(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/garage/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error(`Error deleting car: ${res.status}`)
}

/**
 * Starts a car's engine.
 */
export async function startEngine(
  id: number
): Promise<{ velocity: number; distance: number }> {
  const res = await fetch(
    `${BASE_URL}/engine?id=${id}&status=started`
  )
  if (!res.ok) throw new Error(`Engine start failed: ${res.status}`)
  return res.json()
}

/**
 * Stops a car's engine.
 */
export async function stopEngine(
  id: number
): Promise<{ velocity: number; distance: number }> {
  const res = await fetch(
    `${BASE_URL}/engine?id=${id}&status=stopped`
  )
  if (!res.ok) throw new Error(`Engine stop failed: ${res.status}`)
  return res.json()
}
