"use client";
import Form from "@components/Form/Form";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
export default function UpdataPrompt() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const promptID = searchParams.get("id");
  const submitHandle = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    if (!promptID) return alert("prompt Id is missed");
    try {
      const response = await fetch(`/api/prompt/${promptID}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      if (response?.ok) {
        router.push("/profile");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptID}`);
      const data = await response.json();
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };
    if (promptID) getPromptDetails();
  }, [promptID]);
  return (
    <>
      <Form
        type="Update"
        post={post}
        setPost={setPost}
        submit={submitting}
        handleSubmit={submitHandle}
      />
    </>
  );
}
