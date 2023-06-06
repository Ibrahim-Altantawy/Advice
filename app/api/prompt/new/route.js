import dbConnection from "@database/dbConeection/dbConnection"
import promptModel from "@database/models/prompt.model";

export const POST= async(req)=>{
    const {userId,prompt,tag}= await req.json()
    
   try {
    await dbConnection();
    const newPrompt= await promptModel.create({
        userId,prompt,tag  
    })
    if(newPrompt){
        return new Response(JSON.stringify(newPrompt),{status:201})
    }else{
        return new Response("failed to creat newprompt",{status:400})
    }

   } catch (error) {
    return new Response("failed to creat newprompt",{status:500})
   }
}