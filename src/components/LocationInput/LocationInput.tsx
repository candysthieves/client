import {
  Button,
  CloseOutline,
  clsx,
  Input,
  PinOutline,
  Typography,
} from '@candy.thieves/ui-kit-lumos'
import { ChangeEvent, KeyboardEvent, useRef, useState, useEffect } from 'react'
import s from './LocationInput.module.scss'

type Location = {
  id: string
  name: string
  address?: string
}

type LocationInputProps = {
  maxLocations: number
}

const LOCATION_INPUT_DEBOUNCE_DELAY = 1000

export const LocationInput = ({ maxLocations }: LocationInputProps) => {
  const [locations, setLocations] = useState<Location[]>([])
  const [inputValue, setInputValue] = useState('')
  const [editingId, setEditingId] = useState<null | string>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Confirm editing by clicking outside the input
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (editingId && wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        const newName = inputValue.trim()
        if (newName) {
          setLocations(prev =>
            prev.map(loc => (loc.id === editingId ? { ...loc, name: newName } : loc))
          )
        }
        setEditingId(null)
        setInputValue('')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [editingId, inputValue])

  // Enter key to confirm input after editing
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!editingId) return

    if (e.key === 'Enter') {
      e.preventDefault()
      const newName = inputValue.trim()
      if (newName) {
        setLocations(prev =>
          prev.map(loc => (loc.id === editingId ? { ...loc, name: newName } : loc))
        )
      }
      setEditingId(null)
      setInputValue('')
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)

    // Do not apply the debounce when location is editing
    if (editingId) {
      return
    }

    // Clear the previous timer
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }

    // If the input is empty, return
    if (!value.trim()) {
      return
    }

    // If the limit is reached, do not add new location
    if (locations.length >= maxLocations) {
      return
    }

    // Set a new timer for 1 second
    timerRef.current = setTimeout(() => {
      const isDuplicate = locations.some(
        location => location.name.toLowerCase() === value.trim().toLowerCase()
      )

      if (!isDuplicate) {
        setLocations(prev => [
          ...prev,
          {
            id: `location-${Date.now()}`,
            name: value.trim(),
          },
        ])
        setInputValue('')
      }
      timerRef.current = null
    }, LOCATION_INPUT_DEBOUNCE_DELAY)
  }

  // Click a location to edit it
  const handleLocationClick = (location: Location) => {
    if (editingId === location.id) {
      setEditingId(null)
      setInputValue('')
      return
    }
    setEditingId(location.id)
    setInputValue(location.name)
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }

    // Move the focus to the input field for entering a new location
    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  }

  // Deleting locations
  const removeLocation = (id: string) => {
    setLocations(prev => prev.filter(loc => loc.id !== id))
    if (editingId === id) {
      setEditingId(null)
      setInputValue('')
    }
  }

  return (
    <div className={s.locationWrapper} ref={wrapperRef}>
      <Input
        ref={inputRef}
        label={`Add location (${locations.length}/${maxLocations})`}
        placeholder={
          locations.length >= maxLocations ? 'Maximum locations reached' : 'Enter location...'
        }
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        disabled={locations.length >= maxLocations && !editingId}
        endAdornment={<PinOutline size={24} />}
      />

      <ul className={s.locations}>
        {locations.map(location => (
          <li
            key={location.id}
            onClick={() => handleLocationClick(location)}
            className={clsx(s.locationItem, editingId === location.id ? s.editing : '')}
          >
            <Typography variant={'subtitle1'} className={s.locationName}>
              {location.name}
              {editingId === location.id && ' ✏️'}
            </Typography>
            <Button
              type={'button'}
              onClick={e => {
                e.stopPropagation()
                removeLocation(location.id)
              }}
              className={s.removeLocationButton}
              aria-label={'Remove location'}
            >
              <CloseOutline />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}
