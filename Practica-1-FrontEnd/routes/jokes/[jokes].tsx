import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import axios from "npm:axios";
import { Joke } from "../../types.ts";

export const handler: Handlers = {
  GET: async (_req: Request, ctx: FreshContext<unknown, Joke[]>) => {
    const { jokes } = ctx.params;
    const API_KEY = "nyUaq934E+v/f8wd3lGEdQ==Zxh8OOK7GzEP9WAb";
    if (!API_KEY) {
      return new Response("Error - NINJA API KEY NOT FOUND", { status: 500 });
    }
    const url = "https://api.api-ninjas.com/v1/jokes?limit=" + jokes ;
    try {
      const response = await axios.get<Joke[]>(url, {
        headers: {
          "X-Api-Key": API_KEY,
        },
      });
      if (response.data.length === 0) {
        return new Response("Jokes not found", { status: 404 });
      }
      return ctx.render(response.data);
    } catch (error) {
      console.error(error);
      return new Response("Error", { status: 500 });
    }
  },
};

const Page = (props: PageProps<Joke[]>) => {
    const data = props.data;
    return (
      <>
        {data.map((jokee) => (
          <div class="joke">
            <p><strong>Joke:</strong><i> {jokee.joke}</i></p>
          </div>
        ))}
        <a href="/">Volver al formulario de búsqueda</a>
      </>
    );
  };

export default Page;