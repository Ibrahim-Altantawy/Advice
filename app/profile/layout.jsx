
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next"

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions)
 if(!session){
  return (
    <>
     <div>
      <h1 className="orange_gradient font-satoshi font-semibold"> oops!!....  Sorry you should signIn our site to have you own profile page</h1>
     </div>
    </>
  );
 }
 return (
  <>

   {children}
        
  </>
);
}
