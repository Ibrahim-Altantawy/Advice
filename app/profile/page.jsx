"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ProfileComponent from "@components/Profile/ProfileComponent.jsx";
import  useSWR  from 'swr';
import axios from "axios";
const fetcher = url => axios.get(url).then(res => res.data)
export default function ProfilePage() {
  const router=useRouter()
  // const [myPrompt, setMyPrompt] = useState([]);
  const { data: session } = useSession();

  const { data,error, isLoading,mutate   } = useSWR(`/api/users/${session?.user.id}/prompt`, fetcher,{ refreshInterval: 1000 })
  if (isLoading){
    return <>
    <div>
      <h1> loading data ...............</h1>
    </div>
    </>
  }
  if(error){
   
     console.log(error)
     return
   
    
  }



    const handleDelet =async (prompt) => {
      const hasConfirmed= confirm('are you sure want delet prompt?')
      if(hasConfirmed){
        try {
          const response = await fetch(`/api/prompt/${prompt._id}`,{
            method:"DELETE"
          })
         const deletedPrompt =await response.json()
          if(response.ok){
            alert('deleting sucesses')
            mutate (data.filter((e)=>e._id!== deletedPrompt._id))
        }
        } catch (error) {
          console.log(error);
        }
      }
    };
    const handleEdit = (prompt) => {
      router.push(`/updatePrompt?id=${prompt._id}`)
    };
    
    return (
      <>
        <ProfileComponent
          name="My"
          desc="welcome to your profile"
          data={data}
          handleEdit={handleEdit}
          handleDelet={handleDelet}
        />
      </>
    );
   
}
