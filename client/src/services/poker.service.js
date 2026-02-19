import axios from "axios";
import authService from "./auth.service";

const API_URL = "http://localhost:8080/api/poker";

class PokerService {
  calculate(hands, board) {
    const token = authService.getToken();
    return axios.post(
      `${API_URL}/calculate`,
      { hands, board },
      { headers: { Authorization: token } }
    );
  }
}

export default new PokerService();
