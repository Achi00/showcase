import Image from "next/image"
import Link from "next/link"
import { AiOutlineHeart } from 'react-icons/ai'

type Props = {
  id: string
  image: string
  category: string
  title: string
  name: string
  avatarUrl: string
  userId: string
}

const ProjectCard = ({ id, image, category, title, name, avatarUrl, userId}: Props) => {
  return (
    <div className="flexCenter flex-col rounded-2xl  drop-shadow-card">
      <Link href={`/project/${id}`} className="flexCenter transition group relative w-full h-full">
        <Image 
          src={image}
          width={614}
          height={314}
          alt={name}
          className="w-full h-full object-cover rounded-2xl"
        />
        <div className="hidden group-hover:flex group-hover:flex-col profile_card-title ">
            <p className="w-full">{title}</p>
            <p className="w-full text-primary-purple">{category}</p>
        </div>
        <div className="hidden group-hover:flex absolute top-2 right-0 group-hover:flex-col profile_card-like ">
            <AiOutlineHeart className="bg-primary-purple p-2 rounded-md hover:bg-purple-950 " size={35} />
        </div>
      </Link>
      <div className="flexBetween w-full px-2 mt-3 font-semibold text-sm">
        <Link href={`/profile/${userId}`}>
          <div className="flexCenter gap-2">
            <Image 
              src={avatarUrl}
              width={24}
              height={24}
              className="rounded-full"
              alt="profile image"
            />
            <p>{name}</p>
          </div>
        </Link>
        <div className="flexCenter gap-3">
          <div className="flexCenter gap-2">
            <Image 
              src='/heart.svg'
              width={13}
              height={12}
              alt="heart"
            />
            <p className="text-sm">552</p>
          </div>
          <div className="flexCenter gap-2">
            <Image 
              src='/eye.svg'
              width={13}
              height={12}
              alt="heart"
            />
            <p className="text-sm">5.2k</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard