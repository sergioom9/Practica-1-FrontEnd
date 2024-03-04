import { FreshContext, Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET: async (req: Request, ctx: FreshContext) => {
    const url = new URL(req.url);
    const airport = url.searchParams.get("airport");
    if (airport) {
      return new Response("", {
        status: 307,
        headers: { Location: `/airport/${airport}` },
      });
    }
    return ctx.render();
  },
};

const Home = () => {
  return (
    <>
      <form method="get">
        Introduce un Aeropuerto: <input type="text" name="airport" />
        <button type="submit">Buscar por Aeropuerto</button>
      </form>

      
    </>
  );
};

export default Home;