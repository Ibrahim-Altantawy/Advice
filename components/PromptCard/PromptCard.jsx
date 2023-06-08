"use client";

import '@components/PromptCard/promptCard.css'
import Image from "next/image";
import SimpleCopy from './SimpleCopy';
import SimpleEditPrompt from './simpleEditPrompt';

/**--------main function----- */
export default function PromptCard({
  post,
  handleTaqClick,
  handleEdit,
  handleDelet,
}) {
  return (
    <div className=" prompt_card">
      <div className=" flex justify-between items-start gap-5">
        <div className=" flex-1 flex justify-start items-start gap-3 cursor-pointer" onClick={()=>{
        handleTaqClick(post?.userId.userName)
      }}>
          <Image
            src={post?.userId.image}
            alt="user image"
            height={30}
            width={30}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className=" font-satoshi font-semibold text-gray-900">{post?.userId.userName}</h3>
            <p className="font-inter text-sm text-gray-500 ">{post.userId.email}</p>
          </div>
        </div>
        {/**---copy icon component----- */}
        <SimpleCopy post={post}/>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post?.prompt}</p>
      <p className=" font-inter text-sm blue_gradient cursor-pointer" 
      onClick={()=>{
        handleTaqClick(post?.tag)
      }}>#{post?.tag}</p>
     {/**--------edit and deldt prompt-------- */}
     <SimpleEditPrompt
     post={post}
     handleEdit={handleEdit}
     handleDelet={handleDelet}
     />
    </div>
  );
}
