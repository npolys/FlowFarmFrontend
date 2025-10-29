// src/services/gameAPI.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api/games/aquaponics';

class GameAPI {
  constructor() {
    this.matchID = null;
  }

  // Create a new game match
  async createMatch() {
    try {
      const response = await axios.post(`${API_BASE_URL}/create`, {});
      this.matchID = response.data.matchID;
      return this.matchID;
    } catch (error) {
      console.error('Error creating match:', error);
      throw error;
    }
  }

  // Get current game state
  async getGameState() {
    if (!this.matchID) {
      throw new Error('No match ID. Create a match first!');
    }
    try {
      const response = await axios.get(`${API_BASE_URL}/${this.matchID}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching game state:', error);
      throw error;
    }
  }

  // Execute a move
  async makeMove(move, args = []) {
    if (!this.matchID) {
      throw new Error('No match ID. Create a match first!');
    }
    try {
      const response = await axios.post(
        `${API_BASE_URL}/${this.matchID}/move`,
        {
          move,
          args,
          playerID: '0'
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Error making move ${move}:`, error);
      throw error;
    }
  }

  // Convenience methods for specific moves
  async addFish(fishType, count) {
    return this.makeMove('addFish', [fishType, count]);
  }

  async plantSeed(plantType, bedLocation) {
    return this.makeMove('plantSeed', [plantType, bedLocation]);
  }

  async feedFish(tankId, amount) {
    return this.makeMove('feedFish', [tankId, amount]);
  }

  async harvestPlant(plantId) {
    return this.makeMove('harvestPlant', [plantId]);
  }

  async progressTurn() {
    return this.makeMove('progressTurn', []);
  }

  async buyItem(itemType, quantity) {
    return this.makeMove('buyItem', [itemType, quantity]);
  }

  async sellItem(itemType, quantity) {
    return this.makeMove('sellItem', [itemType, quantity]);
  }
}

export default new GameAPI();