export type Airport = {
    icao: string;
    iata: string;
    name: string;
    city: string;
    region: string;
    country: string;
    elevation_ft: number;
    latitude: number;
    longitude: number;
    timezone: string;
  };
  
  export type Joke = {
    joke: string;
  };

  export type Recipe={
    title: string;
    ingredients: string;
    servings: string;
    instructions: string;
  }