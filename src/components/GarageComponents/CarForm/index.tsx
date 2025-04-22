import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import {
  createCar,
  updateCar,
  setEditingCar,
} from '../../../store/carsSlice'

export default function CarForm() {
  const dispatch = useAppDispatch()
  const editingCar = useAppSelector(state => state.cars.editingCar)

  const [name, setName] = useState('')
  const [color, setColor] = useState('#000000')

  useEffect(() => {
    if (editingCar !== null) {
      setName(editingCar.name)
      setColor(editingCar.color)
    }
  }, [editingCar])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingCar !== null) {

      dispatch(updateCar({ id: editingCar.id, updates: { name, color } }))
      dispatch(setEditingCar(null))
    } else {
      dispatch(createCar({ name, color }))
    }
    setName('')
    setColor('#000000')
  }

  return (
    <form onSubmit={handleSubmit} className="space-x-2 mb-4">
      <input
        type="text"
        placeholder="Car name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
        maxLength={20}
        className="border p-1"
      />
      <input
        type="color"
        value={color}
        onChange={e => setColor(e.target.value)}
        className="border p-1"
      />
      <button type="submit" className="btn">
        {editingCar !== null ? 'Update' : 'Create'}
      </button>
    </form>
  )
}