'use client'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation';
import React from 'react'
export default function SimpleEditPrompt({post,handleEdit,handleDelet}) {
    const{data:session}= useSession();
    const pathname = usePathname();
  return (
    <div>
       {session?.user.id===post.userId._id && pathname ==='/profile' && (
        <div className='flex-center mt-5 gap-4 border-t border-gray-100 pt-3'>
          <p className='font-inter text-sm green_gradient cursor-pointer'
          onClick={handleEdit}>
        Edit
          </p>
          <p className='font-inter text-sm orange_gradient cursor-pointer'
          onClick={handleDelet}>
        Delete
          </p>
        </div>
      )}
    </div>
  )
}
