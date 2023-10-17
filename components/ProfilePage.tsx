import { ProjectInterface, UserProfile } from "@/common.types";
import Image from "next/image";

import Link from "next/link";
import Button from "./Button";
import ProjectCard from "./ProjectCard";
import { getCurrentUser } from "@/lib/session";
import ProjectActions from "./ProjectActions";
import { getProjectDetails, getUser } from "@/lib/actions";
import { FaPaintBrush } from "react-icons/fa";

type Props = {
  user: UserProfile;
  // params: string;
  params: { id: string };
};

const ProfilePage = async ({ user, params: { id } }: Props) => {
  const session = await getCurrentUser();
  const result = (await getUser(id)) as { user?: string };
  const userDetails = result?.user;
  console.log(user?.projects?.edges[0]?.node?.title);

  return (
    <section className="flexCenter flex-col max-w-10xl w-full mx-auto paddings">
      <section className="flexBetween max-lg:flex-col gap-10 w-full">
        <div className="flex items-start flex-col w-full">
          <Image
            src={user?.avatarUrl}
            width={100}
            height={100}
            className="rounded-full"
            alt="user image"
          />
          {session?.user?.id === userDetails && (
            <div className="flex justify-end items-center gap-2">
              <Button title="Edit Profile" leftIcon="/pencile.svg"></Button>
            </div>
          )}
          <div className="flex items-center justify-center mt-10 gap-8">
            <p className="text-4xl font-bold">{user?.name}</p>
            <Link href={`mailto:${user?.email}`}>
              <Button title="Portfolio" leftIcon="/portfolio.svg" />
            </Link>
          </div>
          <p className="md:text-5xl text-3xl font-extrabold md:mt-10 mt-5 max-w-lg">
            Software Engineer
          </p>

          <div className="flex mt-8 gap-5 w-full flex-wrap">
            <Button
              title="Follow"
              leftIcon="/plus-round.svg"
              bgColor="bg-light-white-400 !w-max"
              textColor="text-black-100"
            />
            <Link href={`mailto:${user?.email}`}>
              <Button title="Hire Me" leftIcon="/email.svg" />
            </Link>
          </div>
        </div>

        {user?.projects?.edges?.length > 0 ? (
          <div className="flex flex-col">
            <h1 className="text-2xl justify-center items-center flex gap-3 font-light">
              <FaPaintBrush className="text-[#9747FF]" size={20} />
              Latest Work
            </h1>
            <div className="relative">
              <Image
                src={user?.projects?.edges[0]?.node?.image}
                alt="project image"
                width={739}
                height={554}
                className="rounded-xl object-contain"
              />
              <div className="w-full absolute bottom-12 flex flex-col justify-center items-center h-5 border-b-2  border-b-[#9747FF]">
                <h2 className="text-[#9747FF] text-2xl font-bold mt-16">
                  {user?.projects?.edges[0]?.node?.title}
                </h2>
              </div>
            </div>
          </div>
        ) : (
          <Image
            src="/profile-post.png"
            width={739}
            height={554}
            alt="project image"
            className="rounded-xl"
          />
        )}
      </section>

      <section className="flexStart flex-col lg:mt-28 mt-16 w-full">
        <p className="w-full text-left text-lg font-semibold">Recent Work</p>

        <div className="profile_projects">
          {user?.projects?.edges?.map(
            ({ node }: { node: ProjectInterface }) => (
              <ProjectCard
                key={`${node?.id}`}
                id={node?.id}
                image={node?.image}
                title={node?.title}
                name={user.name}
                avatarUrl={user.avatarUrl}
                userId={user.id}
                category={node?.category}
              />
            )
          )}
        </div>
      </section>
    </section>
  );
};

export default ProfilePage;
