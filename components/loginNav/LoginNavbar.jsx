"use client";
import '@components/loginNav/loginNavStyle.css'
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { signIn, signOut, useSession, getProviders } from "next-auth/react";

export default function LoginNavbar() {

  const [providers, setProviders] = useState(null);
  const [toggleDropdown,setToggleDropdown]=useState(false);
  useEffect(() => {
    const nextProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    nextProviders();
  }, []);
  const {data:session}=useSession()


  return (
    <>
      <div className="sm:flex hidden">
        {session ?.user? (
          <>
            <div className="flex gap-3 md:gap-5">
              <Link href="/creat-prompt" className="black_btn">
                Creat Post
              </Link>
              <button type="button" onClick={()=>{signOut({ callbackUrl: 'http://localhost:3000' })}} className="outline_btn">
                sign out
              </button>
              <Link href="/profile">
                <Image
                  src={session?.user?.image}
                  width={37}
                  height={37}
                  className="rounded-full"
                  alt="profile photo"
                ></Image>
              </Link>
            </div>
          </>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => <button type='button'
              key={provider.name}
              onClick={()=>signIn(provider.id)}
              className='black_btn'
              >
                sign in
              </button>)}
          </>
        )}
      </div>
      {/**mobil navigation */}
      <div className="sm:hidden flex relative">
        {session ?.user?(
            <div className=' relative'>
            <Image
                      src={session?.user?.image}
                      width={37}
                      height={37}
                      className="rounded-full"
                      alt="profile photo"
                      onClick={()=>
                        setToggleDropdown((prev)=>!prev)
                      }
                   / > 
                 {toggleDropdown&&(  <div className='dropdown'>
                    <Link href='/profile'
                    className="dropdown_link"
                    onClick={()=>setToggleDropdown(false)}>
                     my profile   
                    </Link>
                    <Link href='/creat-prompt'
                    className="dropdown_link"
                    onClick={()=>setToggleDropdown(false)}>
                     Creat Post  
                    </Link>
                    <button type='button'
                    className='black_btn w-full mt-5'
                    onClick={
                       ()=>{
                        setToggleDropdown(false);
                        signOut();
                       }
                    }>
                        sign out
                    </button>

                    </div> )}
            </div>
        ):(
            <button type='button'
              
              onClick={signIn}
              className='black_btn'
              >
                sign in
              </button>
        )}

      </div>
    </>
  );
}
