"use client";

import Form from "@components/Form/Form";
import { useSession } from "next-auth/react";
import { useRouter  } from "next/navigation";
import { useState } from "react";
export default function CreatPrompt() {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  





  if(!session){
   
  
   return (
    <>
     <div>
      <h1 className="orange_gradient font-satoshi font-semibold"> oops!!....  Sorry you should signIn our site to creat advice</h1>
     </div>
    </>
  );
  }else{
    const creatPrompt = async (e) => {
      e.preventDefault();
      setSubmitting(true);
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push("/");
        router.refresh('/')
      }
    };
    return (
      <>
        <Form
          type="create"
          post={post}
          setPost={setPost}
          submit={submitting}
          handleSubmit={creatPrompt}
        />
      </>
    );
  }
  

}
