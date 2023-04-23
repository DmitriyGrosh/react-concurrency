import axios from "axios";

export const api = axios.create({
  baseURL: 'https://api-football-v1.p.rapidapi.com/v3',
  headers: {
    'X-RapidAPI-Key': '8b86658a70mshc3b56c1c88d9515p1db58ajsn4b29c1be4a37',
    'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
  }
});
