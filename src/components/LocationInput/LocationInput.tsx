import {
  Button,
  CloseOutline,
  clsx,
  Input,
  PinOutline,
  Typography,
} from '@candy.thieves/ui-kit-lumos'
import { ChangeEvent, KeyboardEvent, useRef, useState, useEffect } from 'react'
import { Location } from '@/features/createPost'
import s from './LocationInput.module.scss'

type LocationInputProps = {
  maxLocations: number
  initialLocations: Location[]
  onLocationChange: (value: Location[]) => void
  isPublishing?: boolean
}

const LOCATION_INPUT_DEBOUNCE_DELAY = 1000

export const LocationInput = ({
  maxLocations,
  initialLocations,
  onLocationChange,
  isPublishing,
}: LocationInputProps) => {
  const [locations, setLocations] = useState<Location[]>(initialLocations)
  const [inputValue, setInputValue] = useState('')
  const [editingId, setEditingId] = useState<null | string>(null)

  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  // // Отправка изменений в родительский компонент
  // useEffect(() => {
  //   onLocationChange(locations)
  // }, [locations, onLocationChange])

  const updateLocations = (nextLocations: Location[]) => {
    setLocations(nextLocations)
    onLocationChange(nextLocations)
  }

  // Confirm editing by clicking outside the input
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (editingId && wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        const newAddress = inputValue.trim()
        if (newAddress) {
          const nextLocations = locations.map(location =>
            location.id === editingId ? { ...location, address: newAddress } : location
          )

          updateLocations(nextLocations)
        }
        setEditingId(null)
        setInputValue('')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [editingId, inputValue, locations])

  // Enter key to confirm input after editing
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!editingId) return

    if (e.key === 'Enter') {
      e.preventDefault()

      const newAddress = inputValue.trim()

      if (newAddress) {
        const nextLocations = locations.map(location =>
          location.id === editingId ? { ...location, address: newAddress } : location
        )

        updateLocations(nextLocations)
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
      const trimmedValue = value.trim()

      const isDuplicate = locations.some(
        location => location.address.toLowerCase() === value.trim().toLowerCase()
      )

      if (!isDuplicate) {
        const nextLocations = [
          ...locations,
          {
            id: `location-${Date.now()}`,
            address: trimmedValue,
          },
        ]

        updateLocations(nextLocations)
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
    setInputValue(location.address)
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
    const nextLocations = locations.filter(location => location.id !== id)
    updateLocations(nextLocations)

    if (editingId === id) {
      setEditingId(null)
      setInputValue('')
    }
  }

  // // Clear debounce timer on unmount
  // useEffect(() => {
  //   return () => {
  //     if (timerRef.current) {
  //       clearTimeout(timerRef.current)
  //     }
  //   }
  // }, [])

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
        disabled={isPublishing || (locations.length >= maxLocations && !editingId)}
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
              {location.address}
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
