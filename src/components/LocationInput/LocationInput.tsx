import {
  Button,
  CloseOutline,
  clsx,
  Input,
  PinOutline,
  Typography,
} from '@candy.thieves/ui-kit-lumos'
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'
import { Location, PostFile } from '@/features/createPost'
import s from './LocationInput.module.scss'

type LocationInputProps = {
  files: PostFile[]
  maxLocations: number
  initialLocations: Location[]
  onLocationChange: (value: Location[]) => void
  isPublishing?: boolean
}

const LOCATION_INPUT_DEBOUNCE_DELAY = 1000

export const LocationInput = ({
  files,
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
            location.fileId === editingId ? { ...location, address: newAddress } : location
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
          location.fileId === editingId ? { ...location, address: newAddress } : location
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
    if (locations.length >= Math.min(maxLocations, files.length)) {
      return
    }

    // Set a new timer for 1 second
    timerRef.current = setTimeout(() => {
      const trimmedValue = value.trim()

      const isDuplicate = locations.some(
        location => location.address.toLowerCase() === value.trim().toLowerCase()
      )

      if (!isDuplicate) {
        const usedFileIds = new Set(locations.map(location => location.fileId))
        const file = files.find(file => !usedFileIds.has(file.id))

        if (!file) {
          return
        }

        const nextLocations = [
          ...locations,
          {
            fileId: file.id,
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
    if (editingId === location.fileId) {
      setEditingId(null)
      setInputValue('')
      return
    }
    setEditingId(location.fileId)
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
  const removeLocation = (fileId: string) => {
    const nextLocations = locations.filter(location => location.fileId !== fileId)
    updateLocations(nextLocations)

    if (editingId === fileId) {
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
        disabled={isPublishing || (locations.length >= maxLocations && !editingId)}
        endAdornment={<PinOutline size={24} />}
      />

      <ul className={s.locations}>
        {locations.map(location => (
          <li
            key={location.fileId}
            onClick={() => handleLocationClick(location)}
            className={clsx(s.locationItem, editingId === location.fileId ? s.editing : '')}
          >
            <Typography variant={'subtitle1'} className={s.locationName}>
              {location.address}
              {editingId === location.fileId && ' ✏️'}
            </Typography>
            <Button
              type={'button'}
              onClick={e => {
                e.stopPropagation()
                removeLocation(location.fileId)
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
