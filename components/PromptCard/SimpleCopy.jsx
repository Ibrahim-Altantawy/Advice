'use client'
import { useState } from "react";
import Image from "next/image"

export default function SimpleCopy({post}) {
const [copied, setCopied] = useState("");

    const handleCopy=()=>{
        setCopied(post?.prompt);
        navigator.clipboard.writeText(post.prompt);
        setTimeout(()=>setCopied(''),3000);
      }
  return (
    <div className="copy_btn" onClick={handleCopy}>
      <Image src={copied===post?.prompt?'/assets/icons/checked.png':'/assets/icons/copy.png'}
          height={14}
          width={14}
          alt="copy icon"/>
    </div>
  )
}
