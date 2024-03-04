import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import axios from "npm:axios";
import { Airport } from "../../types.ts";

export const handler: Handlers = {
  GET: async (_req: Request, ctx: FreshContext<unknown, Airport[]>) => {
    const { airport } = ctx.params;
    const API_KEY = "nyUaq934E+v/f8wd3lGEdQ==Zxh8OOK7GzEP9WAb";
    if (!API_KEY) {
      return new Response("Error - NINJA API KEY NOT FOUND", { status: 500 });
    }
    const url = "https://api.api-ninjas.com/v1/airports?name=" + airport ;
    try {
      const response = await axios.get<Airport[]>(url, {
        headers: {
          "X-Api-Key": API_KEY,
        },
      });
      if (response.data.length === 0) {
        return new Response("Airport not found", { status: 404 });
      }
      return ctx.render(response.data);
    } catch (error) {
      console.error(error);
      return new Response("Error", { status: 500 });
    }
  },
};

const Page = (props: PageProps<Airport[]>) => {
  const data = props.data;
  return (
    <>
      {data.map((airport) => (
        <div class="airport">
          <h1>{airport.name}</h1>
          <h2>Country, city and region : {airport.country} {airport.city} {airport.region}</h2>
          <p><strong>Icao:</strong><i> {airport.icao}</i></p>
          <p><strong>Iata:</strong> <i>{airport.iata}</i></p>
          <p><strong>Elevation_ft:</strong> <i>{airport.elevation_ft}</i></p>
          <p><strong>Latitude:</strong> <i>{airport.latitude}</i></p>
          <p><strong>Longitude:</strong><i> {airport.longitude}</i></p>
          <p><strong>Timezone: </strong><i>{airport.timezone}</i></p>
          <hr />
          <br />
        </div>
      ))}
      <a href="/">Back</a>
    </>
  );
};

export default Page;