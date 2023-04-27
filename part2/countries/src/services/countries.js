import axios from 'axios'

const baseUrl = 'https://restcountries.com/v3.1'

const getAll = () =>  {
//    return dummy
   return axios 
    .get(`${baseUrl}/all`)
    .then( (resp) => {
        return resp.data
    })
}

export default {
    getAll
}

// const dummy = Promise.resolve([{
//     "name": {
//       "common": "Barbados",
//       "official": "Barbados",
//       "nativeName": {
//         "eng": {
//           "official": "Barbados",
//           "common": "Barbados"
//         }
//       }
//     },
//     "tld": [
//       ".bb"
//     ],
//     "cca2": "BB",
//     "ccn3": "052",
//     "cca3": "BRB",
//     "cioc": "BAR",
//     "independent": true,
//     "status": "officially-assigned",
//     "unMember": true,
//     "currencies": {
//       "BBD": {
//         "name": "Barbadian dollar",
//         "symbol": "$"
//       }
//     },
//     "idd": {
//       "root": "+1",
//       "suffixes": [
//         "246"
//       ]
//     },
//     "capital": [
//       "Bridgetown"
//     ],
//     "altSpellings": [
//       "BB"
//     ],
//     "region": "Americas",
//     "subregion": "Caribbean",
//     "languages": {
//       "eng": "English"
//     },
//     "translations": {
//       "ara": {
//         "official": "باربادوس",
//         "common": "باربادوس"
//       },
//       "bre": {
//         "official": "Barbados",
//         "common": "Barbados"
//       },
//       "ces": {
//         "official": "Barbados",
//         "common": "Barbados"
//       },
//       "cym": {
//         "official": "Barbados",
//         "common": "Barbados"
//       },
//       "deu": {
//         "official": "Barbados",
//         "common": "Barbados"
//       },
//       "est": {
//         "official": "Barbados",
//         "common": "Barbados"
//       },
//       "fin": {
//         "official": "Barbados",
//         "common": "Barbados"
//       },
//       "fra": {
//         "official": "Barbade",
//         "common": "Barbade"
//       },
//       "hrv": {
//         "official": "Barbados",
//         "common": "Barbados"
//       },
//       "hun": {
//         "official": "Barbados",
//         "common": "Barbados"
//       },
//       "ita": {
//         "official": "Barbados",
//         "common": "Barbados"
//       },
//       "jpn": {
//         "official": "バルバドス",
//         "common": "バルバドス"
//       },
//       "kor": {
//         "official": "바베이도스",
//         "common": "바베이도스"
//       },
//       "nld": {
//         "official": "Barbados",
//         "common": "Barbados"
//       },
//       "per": {
//         "official": "باربادوس",
//         "common": "باربادوس"
//       },
//       "pol": {
//         "official": "Barbados",
//         "common": "Barbados"
//       },
//       "por": {
//         "official": "Barbados",
//         "common": "Barbados"
//       },
//       "rus": {
//         "official": "Барбадос",
//         "common": "Барбадос"
//       },
//       "slk": {
//         "official": "Barbados",
//         "common": "Barbados"
//       },
//       "spa": {
//         "official": "Barbados",
//         "common": "Barbados"
//       },
//       "srp": {
//         "official": "Барбадос",
//         "common": "Барбадос"
//       },
//       "swe": {
//         "official": "Barbados",
//         "common": "Barbados"
//       },
//       "tur": {
//         "official": "Barbados",
//         "common": "Barbados"
//       },
//       "urd": {
//         "official": "بارباڈوس",
//         "common": "بارباڈوس"
//       },
//       "zho": {
//         "official": "巴巴多斯",
//         "common": "巴巴多斯"
//       }
//     },
//     "latlng": [
//       13.16666666,
//       -59.53333333
//     ],
//     "landlocked": false,
//     "area": 430,
//     "demonyms": {
//       "eng": {
//         "f": "Barbadian",
//         "m": "Barbadian"
//       },
//       "fra": {
//         "f": "Barbadienne",
//         "m": "Barbadien"
//       }
//     },
//     "flag": "🇧🇧",
//     "maps": {
//       "googleMaps": "https://goo.gl/maps/2m36v8STvbGAWd9c7",
//       "openStreetMaps": "https://www.openstreetmap.org/relation/547511"
//     },
//     "population": 287371,
//     "fifa": "BRB",
//     "car": {
//       "signs": [
//         "BDS"
//       ],
//       "side": "left"
//     },
//     "timezones": [
//       "UTC-04:00"
//     ],
//     "continents": [
//       "North America"
//     ],
//     "flags": {
//       "png": "https://flagcdn.com/w320/bb.png",
//       "svg": "https://flagcdn.com/bb.svg",
//       "alt": "The flag of Barbados is composed of three equal vertical bands of ultramarine, gold and ultramarine. The head of a black trident is centered in the gold band."
//     },
//     "coatOfArms": {
//       "png": "https://mainfacts.com/media/images/coats_of_arms/bb.png",
//       "svg": "https://mainfacts.com/media/images/coats_of_arms/bb.svg"
//     },
//     "startOfWeek": "monday",
//     "capitalInfo": {
//       "latlng": [
//         13.1,
//         -59.62
//       ]
//     },
//     "postalCode": {
//       "format": "BB#####",
//       "regex": "^(?:BB)*(\\d{5})$"
//     }
//   }])