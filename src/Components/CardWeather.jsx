import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Loading from './Loading'

const CardWeather = ({lon, lat}) => {

    const [weather, setWeather] = useState()
    const [temperature, setTemperature] = useState()
    const [isCelsius, setIsCelsius] = useState(true)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
      if (lat) {
        const APIKey = `2b9f7b34d9ef2a9281057726f78a1059`
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`

        axios.get(url)
        .then(res => {
            setWeather(res.data)
            const temp = {
                celsius: `${Math.round(res.data.main.temp - 273.15)} °C`,
                farenheit: `${Math.round((res.data.main.temp - 273.15) * 9 / 5 + 32)} °F`
            }  
            setTemperature(temp)
            setIsLoading(false)
        })
        .catch(err=>console.log(err))
      }
    }, [lat, lon])

    console.log(weather)

    const handleClick = () => setIsCelsius(!isCelsius)

    if (isLoading) {
        return <Loading />
    }else {
        return(
            <article className='card'>
                <h1>Weather App</h1>
                <h2>{`${weather?.name}, ${weather?.sys.country}`} </h2>
                <div>
                    <img src={weather && `http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt="" />
                    <div>
                        <h3>&#34;{weather?.weather[0].description}&#34;</h3>
                        <ul className='card__list'>
                            <li className='card__list__item' ><span>Wind Speed: </span>{weather?.wind.speed}</li>
                            <li className='card__list__item'><span>Clouds: </span>{weather?.clouds.all}</li>
                            <li className='card__list__item'><span>Pressure: </span>{weather?.main.pressure}</li>
                        </ul>
                    </div>
                    <h2 className='card__grades' >{isCelsius ? temperature?.celsius : temperature?.farenheit}</h2>
                    <button className='card__buttom' onClick={handleClick}>{isCelsius ? `Change to °F` : `Change to °C`} </button>
                </div>
            </article>
        )
    }
}

export default CardWeather