//GET (read)
import dbConnection from "@database/dbConeection/dbConnection";
import promptModel from "@database/models/prompt.model";

export const GET = async (req, { params }) => {
  try {
    await dbConnection();
    const prompt = await promptModel.findById(params.id).populate("userId");
    if (prompt) {
      return new Response(JSON.stringify(prompt), { status: 200 });
    } else {
      return new Response("prompt not found", { status: 404 });
    }
  } catch (error) {
    return new Response("failed to get Prompt", { status: 500 });
  }
};
//PATCH(update)
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();
  try {
    await dbConnection();
    const updatePrompt = await promptModel.findByIdAndUpdate({_id:params.id},{
        prompt,
        tag
    },{
      new: true 
    })
    if (!updatePrompt) {
      return new Response("prompt not found", { status: 404 });
    } else {
      
      return new Response(JSON.stringify(updatePrompt), { status: 200 });
    }
  } catch (error) {
    return new Response("failed to update Prompt", { status: 500 });
  }
};
//DELETE (delete)
export const DELETE = async (req, { params }) => {
    
    try {
      await dbConnection();
      const deletePrompt = await promptModel.findByIdAndDelete(
        params.id);
      if (!deletePrompt) {
        return new Response("prompt not found", { status: 404 });
      } else {
        return new Response(JSON.stringify(deletePrompt), { status: 200 });
      }
    } catch (error) {
      return new Response("failed to update Prompt", { status: 500 });
    }
  };