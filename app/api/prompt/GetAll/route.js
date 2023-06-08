import dbConnection from "@database/dbConeection/dbConnection"
import promptModel from "@database/models/prompt.model";

export const GET= async(req)=>{
      try {
    await dbConnection();
    const allPrompt= await promptModel.find().populate('userId')
    if(allPrompt){
        return new Response(JSON.stringify(allPrompt),{status:200})
    }else{
        return new Response("failed to creat allPrompt",{status:400})
    }
   } catch (error) {
    return new Response("failed to creat allPrompt",{status:500})
   }
}