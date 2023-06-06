"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ProfileComponent from "@components/Profile/ProfileComponent.jsx";
export default function ProfilePage() {
  const router=useRouter()
  const [myPrompt, setMyPrompt] = useState([]);
  const { data: session } = useSession();
  const handleDelet =async (prompt) => {
    const hasConfirmed= confirm('are you sure want delet prompt?')
    if(hasConfirmed){
      try {
        const response = await fetch(`/api/prompt/${prompt._id}`,{
          method:"DELETE"
        })
       const data =await response.json()
        if(response.ok){
          alert('deleting sucesses')
          setMyPrompt(myPrompt.filter((e)=>e._id!== data._id))
      }

      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleEdit = (prompt) => {
    router.push(`/updatePrompt?id=${prompt._id}`)
  };
  useEffect(() => {

    const fetchData = async () => {
      const respose = await fetch(`/api/users/${session?.user.id}/prompt`);
      const data = await respose.json();
      setMyPrompt(data);

    };
    fetchData();
  }, []);
  return (
    <>
      <ProfileComponent
        name="My"
        desc="welcome to your profile"
        data={myPrompt}
        handleEdit={handleEdit}
        handleDelet={handleDelet}
      />
    </>
  );
}
