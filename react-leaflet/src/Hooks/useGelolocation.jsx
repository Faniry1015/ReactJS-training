import React, { useEffect, useState } from 'react'

const useGelolocation = () => {
    const [location, setLocation] = useState({
        loading: false,
        coordinates: { lat: '', lng: '' }
    })

    const onSuccess = location => {
        setLocation({
            loaded: true,
            coordinates: {
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            }
        })
    }

    const onError = error => {
        setLocation({
            loaded: true,
            error,
        })
    }

    useEffect(() => {
        if (!('geolocation' in navigator)) {
            onError({
                code: 0,
                message: 'Géolocalisation non supportée'
            })
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError)
    })

    return location
}

export default useGelolocation