import { useState } from 'react'

export function useLocation() {
  const [location, setLocation] = useState(null)
  const [locLoading, setLocLoading] = useState(false)
  const [locError, setLocError] = useState(null)

  const getLocation = () => {
    if (!navigator.geolocation) {
      setLocError('Geolocation not supported by your browser')
      return
    }
    setLocLoading(true)
    setLocError(null)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          locationLabel: `${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`,
        })
        setLocLoading(false)
      },
      (err) => {
        setLocError('Could not retrieve location: ' + err.message)
        setLocLoading(false)
      }
    )
  }

  return { location, locLoading, locError, getLocation }
}