import { FreshContext, Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET: async (req: Request, ctx: FreshContext) => {
    const url = new URL(req.url);
    const recipe = url.searchParams.get("recipe");
    if (recipe) {
      return new Response("", {
        status: 307,
        headers: { Location: `/recipe/${recipe}` },
      });
    }
    return ctx.render();
  },
};

const Home = () => {
  return (
    <>
      <form method="get">
        Introduce Receta : <input type="text" name="recipe" />
        <button type="submit">Buscar Receta</button>
      </form>

      
    </>
  );
};

export default Home;