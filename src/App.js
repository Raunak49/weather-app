import { useEffect, useState } from 'react';
import './App.css'
import axios from "axios";
import Input from './components/Input';

function App()  {
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  const time = current.getHours()+':'+current.getMinutes()+ ":" + current.getSeconds();

  

  const [degrees, setDegrees] = useState(27) 
  const [location, setLocation] = useState("Delhi")
  const [userLocation, setUserLocation] = useState("")
  const [description, setDescription] = useState("cloudy")
  const [icon, setIcon] = useState("04d")
  const [humidity, setHumidity] = useState(94)
  const [wind, setWind] = useState(2.67)
  const [country, setCountry] = useState("IN")
  const [dataFetched, setDataFetched] = useState(false)
  const [bgImage, setBgImage] = useState('https://source.unsplash.com/1600x900/?cloudy')

  const fetchData = async (e) => {
    e.preventDefault()
    try{
      console.log(icon)
    const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${userLocation}&appid=${process.env.REACT_APP_API_KEY}`)
    const data = await res.data
    console.log(data.weather[0].description)
    data["backgroundImage"] = `https://source.unsplash.com/1600x900/?${data.weather[0].description}` 
    setDegrees(parseInt(data.main.temp-273))
    setLocation(data.name)
    setDescription(data.weather[0].description)
    setBgImage(data.backgroundImage)
    setIcon(data.weather[0].icon)
    setHumidity(data.main.humidity)
    setWind(data.wind.speed)
    setCountry(data.sys.country)
    setDataFetched(true)
    }catch(err){
      alert("please enter a valid location")
    }
  }

  const defaultFetchedData = async () => {
    if(!dataFetched){
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${userLocation}&appid=${process.env.REACT_APP_API_KEY}`)
      const data = await res.data
      data["backgroundImage"] = `https://source.unsplash.com/1600x900/?${data.weather[0].description}` 
      setDegrees(parseInt(data.main.temp-273))
      setLocation(data.name)
      setDescription(data.weather[0].description)
      setBgImage(data.backgroundImage)
      setIcon(data.weather[0].icon)
      setHumidity(data.main.humidity)
      setWind(data.wind.speed)
      setCountry(data.sys.country)
    }

  }

  useEffect(() => {
    defaultFetchedData();
  }, [])

  let bImage = {
    backgroundImage:`url(https://source.unsplash.com/1600x900/?${description})`,
    backgroundSize:"cover"
  }

  return (
      <div className='App' style={bImage}>
      <div className="weather">
        <Input 
          text={(e) => setUserLocation(e.target.value)}
          submit={fetchData}
          func={fetchData}
        />
        <div className='weather-display'>
                  <h3 className='weather-location'>Weather in {location}</h3>
        
                  <div>
                    <h1 className='weather-degrees'>{degrees} °C</h1>
                  </div>
        
                  <div className='weather-description'>
                    <div>
                      <div className = 'weather-description-head'>
                        <img src={`http://openweathermap.org/img/w/${icon}.png`} alt="weather-icon"/>
                        <h3>{description}</h3>
                      </div>
        
                      <h3>Humidity: {humidity}%</h3>
                      <h3>Wind speed: {wind} m/s</h3>
                    </div>
        
                    <div className='weather-country'>
                      <h3>{country}</h3>
                      <h2 className='weather-date'>{date} {time}</h2>
                    </div>
                  </div>
                </div>
      </div>
      
    </div>
)}

export default App;
