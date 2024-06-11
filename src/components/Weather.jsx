import React, {useState, useEffect, useMemo} from "react";
import WeatherServices from "../Environment/services/weather";
import "./Weather.css"

const Weather = () => {

    const [weather, setWeather] = useState({});
    const [location, setLocation] = useState("Noida");

    useEffect(() => {

weatherHandler()

    }, []);
  
    const weatherHandler = async () => {
        try {
          const weatherData = await WeatherServices.getWeather(location);
          setWeather(weatherData);
          console.log(weatherData);
        } catch (error) {
          if (error.response && error.response.status === 404) {
            alert(`Oops, Wrong location ${location}`);
          } else {
            alert(error.message);
          }
        }
      };
    const icon = useMemo(() => {
        if(weather){
            return weather?.weather
        }

    }, [weather]);

    const shouldRotate = () => {
        if (!icon) return
        return icon.length > 0 && icon[0]?.main == 'Clear';
    };

    console.log("icon",icon)
  return (
    <div className="wrapper">
    <div className="search">
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter location"
        className="location_input"
      />
      <button className="location_searcher" onClick={weatherHandler}>
        Search
      </button>
    </div>
    <div className="app__data">  
         <h1 className="temp">{weather?.name}</h1>  

    <div style={{display:"flex", justifyContent: 'space-between', marginTop:"4px"}}>
        <div>
            <h3 className="">Current Temperature: {weather?.main?.temp}°C</h3>
            <p className="temp">Feel Like: {weather?.main?.feels_like}°C</p>
            <p className="temp">Humidity: {weather?.main?.humidity}</p>
            <p className="temp">Wind: {weather?.wind?.speed} km/h</p> 
        
        </div>
        <div>
            <p className="temp">max: {weather?.main?.temp_max}°C</p>
            <p className="temp">min: {weather?.main?.temp_min}°C</p>

            {icon && <>
                <img alt="img" style={{hight: '80px', width: "80px", marginTop:"10px"}}
                     className={`img-fluid ${shouldRotate() ? 'rotate' : ''}`}
                     src={`http://openweathermap.org/img/w/${icon[0].icon}.png`}/>

                <span>
                <p className="temp">{icon[0].main}</p>
                </span>
            </>
            }

        </div>
    </div>


    </div>
    </div>
  )
}

export default Weather