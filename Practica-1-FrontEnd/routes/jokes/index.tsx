import { FreshContext, Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET: async (req: Request, ctx: FreshContext) => {
    const url = new URL(req.url);
    const jokes = url.searchParams.get("jokes");
    if (jokes) {
      return new Response("", {
        status: 307,
        headers: { Location: `/jokes/${jokes}` },
      });
    }
    return ctx.render();
  },
};

const Home = () => {
  return (
    <>
      <form method="get">
        Introduce numero Chistes : <input type="text" name="jokes" />
        <button type="submit">Buscar Chistes</button>
      </form>

      
    </>
  );
};

export default Home;