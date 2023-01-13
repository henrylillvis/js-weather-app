import axios from "axios";
//`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`

//https://nominatim.openstreetmap.org/reverse?format=json&lat=62.89&lon=27.68
//`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
//latitude, longitude
export function getLocationName(latitude, longitude) {
    return axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
        .then(response => {
            if (response.data.address) {
                console.log(response.data);
                return response.data.address.town ||
                    response.data.address.city ||
                    response.data.address.village ||
                    response.data.address.hamlet ||
                    response.data.address.county ||
                    response.data.address.state ||
                    response.data.address.country;
            }
            
            throw new Error('Reverse geocoding failed');
        });
}

