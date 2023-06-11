import dbConnection from "@database/dbConeection/dbConnection";
import userModel from "@database/models/user.model";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
export const authOptions={
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  secret:process.env.NEXTAUTH_SECRET,
  callbacks:{
    async session({ session }) {
        const sessionUser = await userModel.findOne({ email: session.user.email });
        session.user.id = sessionUser._id.toString();
        return session;
      },
      /**=============== */
      async signIn({ profile }) {
        try {
          await dbConnection();
          const userExsit = await userModel.findOne({ email: profile.email });
          if (!userExsit) {
        
            await userModel.create({
              email: profile.email,
              userName: profile.name,
              image: profile.picture,
            });
           
          }
            return true
          
        } catch (error) {
          console.log(error);
        }
      },
      
  }
  
}
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
