import { NavLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import AuthProviders from "./AuthProviders";
import { getCurrentUser } from "@/lib/session";
import { signOut } from "next-auth/react";
import { AiOutlinePlus } from 'react-icons/ai'
import ProfileMenu from "./ProfileMenu";

const Navbar = async () => {
  const session = await getCurrentUser()

  return <nav className="flexBetween navbar">
    <div className="flex-1 justify-between flexStart gap-10">
      <div className="flex items-center gap-10">
        <Link href='/'>
        <Image
          src="/logo.svg"
          width={115}
          height={43}
          alt="logo"
        />
        </Link>
        <ul className="xl:flex hidden text-sm gap-7">
        {NavLinks.map((link) => (
          <Link href={link.href} key={link.key}>
            {link.text}
          </Link>
        ))}
        </ul>
      </div>
      <div className="flexCenter gap-4">
          {session?.user ? (
            <>
            <ProfileMenu session={session} />
            <Link href='/create'>
              <button className="bg-primary-purple hover:bg-purple-400 hover:text-black transition rounded-lg p-2 text-white flex items-center justify-center gap-2">
                <AiOutlinePlus /> Create Project
              </button>
            </Link>
            </>
          ) : (
            <AuthProviders />
          )}
      </div>
    </div>
  </nav>;
};

export default Navbar;
