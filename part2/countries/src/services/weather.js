import axios from 'axios'

// const apiKey = process.env.REACT_APP_OPEN_WEATHER_KEY
const apiKey = process.env.REACT_APP_WEATHER_API

// const baseUrl = "https://api.openweathermap.org/data/2.5/weather"
const baseUrl = "http://api.weatherapi.com/v1/current.json"

const getWeather = (lat, lng) =>  {
    // console.log(`${baseUrl}?key=${apiKey}&q=${lat},${lng}`)
    // return dummy
    // debugger
    return axios
        .get(`${baseUrl}?key=${apiKey}&q=${lat},${lng}`)
        .then(resp => {
            console.log(resp)
            return resp.data
        })
  //  return axios 
  //   .get(`${baseUrl}?lat=${lat}&lon=${lng}&appid=${apiKey}`)
  //   .then( (resp) => {
  //       console.log('weather', resp.data)
  //       return resp.data
  //   })
}

const obj = {
    getWeather
}

export default obj

// const dummy = Promise.resolve(
//     {
//         "location": {
//           "name": "Blackmans",
//           "region": "Saint Joseph",
//           "country": "Barbados",
//           "lat": 13.17,
//           "lon": -59.53,
//           "tz_id": "America/Barbados",
//           "localtime_epoch": 1682758011,
//           "localtime": "2023-04-29 4:46"
//         },
//         "current": {
//           "last_updated_epoch": 1682757900,
//           "last_updated": "2023-04-29 04:45",
//           "temp_c": 26,
//           "temp_f": 78.8,
//           "is_day": 0,
//           "condition": {
//             "text": "Partly cloudy",
//             "icon": "//cdn.weatherapi.com/weather/64x64/night/116.png",
//             "code": 1003
//           },
//           "wind_mph": 6.9,
//           "wind_kph": 11.2,
//           "wind_degree": 130,
//           "wind_dir": "SE",
//           "pressure_mb": 1013,
//           "pressure_in": 29.91,
//           "precip_mm": 0,
//           "precip_in": 0,
//           "humidity": 89,
//           "cloud": 50,
//           "feelslike_c": 28.2,
//           "feelslike_f": 82.8,
//           "vis_km": 10,
//           "vis_miles": 6,
//           "uv": 1,
//           "gust_mph": 19.5,
//           "gust_kph": 31.3
//         }
//       }
// )