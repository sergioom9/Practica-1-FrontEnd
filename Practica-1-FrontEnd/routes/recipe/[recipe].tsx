import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import axios from "npm:axios";
import { Recipe } from "../../types.ts";

export const handler: Handlers = {
  GET: async (_req: Request, ctx: FreshContext<unknown, Recipe[]>) => {
    const { recipe } = ctx.params;
    const API_KEY = "nyUaq934E+v/f8wd3lGEdQ==Zxh8OOK7GzEP9WAb";
    if (!API_KEY) {
      return new Response("Error - NINJA API KEY NOT FOUND", { status: 500 });
    }
    const url = "https://api.api-ninjas.com/v1/recipe?query=" + recipe ;
    try {
      const response = await axios.get<Recipe[]>(url, {
        headers: {
          "X-Api-Key": API_KEY,
        },
      });
      if (response.data.length === 0) {
        return new Response("Recipe not found", { status: 404 });
      }
      return ctx.render(response.data);
    } catch (error) {
      console.error(error);
      return new Response("Error", { status: 500 });
    }
  },
};

const Page = (props: PageProps<Recipe[]>) => {
    const data = props.data;
    return (
      <ol class="listarecetas">
        {data.map((recipe) => (
          <li key={recipe.title} class="recetas" >
            <div ><p class="Titulo"><strong>Titulo: </strong></p> {recipe.title}</div>
            <div ><p class="Ingrediente"><strong>Ingredientes: </strong></p>
              <ul>
                {recipe.ingredients.split('|').map((ingredient) => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
              </ul>
            </div>
            <div ><p class="Porciones"><strong>Porciones:</strong> </p>{recipe.servings}</div>
            <div ><p class="Instrucciones"><strong>Instrucciones: </strong></p>
               <ul>
                {recipe.instructions.split('.').map((instructions) => (
                  <li key={instructions}>{instructions}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    );
  };
  
  export default Page;