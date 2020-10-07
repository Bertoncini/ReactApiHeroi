import axios from "axios";

const baseUrl = "https://superheroapi.com/api.php";

class HeroiServices {
  constructor() {}

  getHeroName(accessToken, nameHeroi) {
    let url = `${baseUrl}/${accessToken}/search/${nameHeroi}`;
    return axios.get(`${url}`);
  }

  getHeroiId(accessToken, idHeroi) {
    let url = `${baseUrl}/${accessToken}/${idHeroi}`;
    return axios.get(`${url}`);
  }
}

export default new HeroiServices();
