import { UserProfile } from "@/common.types"
import ProfilePage from "@/components/ProfilePage"
import { getUserProjects } from "@/lib/actions"

type Props = {
    params: {
        id: string
    }
}

const Profile = async ({ params }: Props) => {
    const result = await getUserProjects(params.id, 100) as { user: UserProfile}
    
    if (!result?.user) {
        return <p className="glow text-red-700">Failed to fetch user info</p>
    }
  return <ProfilePage params={params} user={result?.user} />
}

export default Profile