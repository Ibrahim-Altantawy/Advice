import Link from "next/link";
import Image from "next/image";
import '@components/Navbar/navStyle.css'
import LoginNavbar from "@components/loginNav/LoginNavbar";


export default function NavbarComponent() {
 
  
  return (
    <>
      <nav className=" flex-between w-full mb-16 pt-3 navBar">
        <Link href='/'  className="flex-between " prefetch={true}>
        <Image 
        src='/assets/image/logo.jpg'
        width={30}
        height={30}
        className="rounded-full mr-3"
        alt="logo image"
        />
        <p className="logo_text orange_gradient">Advice</p>
        </Link>
        {/**mobil navigation */}
       <LoginNavbar/>
      </nav>
    </>
  );
}
