const URL = "https://restcountries.eu/rest/v2/all";

class RequestService {
    // async function
    async getCountries() {
        let data = await (fetch(URL)
            .then(res => {
                return res.json();
            })
            .catch(err => {
                console.log('Error: ', err);
            }));
        return data;
    }
}

export default new RequestService()