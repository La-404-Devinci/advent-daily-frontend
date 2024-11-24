import { useEffect, useMemo } from "react";
import { Button } from "../components/buttons/Buttons";
import Header from "../components/layout/header";
import Menu from "../components/layout/menu";
import EditUserAvatar from "../components/profile-edit/edit-user-avatar";
import EditUserInfo from "../components/profile-edit/edit-user-info";
import Layout from "../layout";
import useMeStore from "../store/meStore";
import useProfileStore from "../store/profileStore";

export default function ProfileEditPage() {

  const { me, getMe } = useMeStore();
  const { profiles, getProfile } = useProfileStore()

  useEffect(() => {
    getMe();
  }, [getMe]);

  useEffect(() => {
    me && getProfile(me);
  }, [me, getProfile]);

  const user = useMemo(() => profiles[me].user, [profiles, me]);

 
  return (
    <Layout>
      <Header title="Editer le profil" />
        <div className="mt-16 mb-36 w-full max-w-[30rem] p-6 mx-auto flex flex-col items-center gap-8">
            <EditUserAvatar user={user}/>
            <EditUserInfo user={user}/>
        </div>
      <Menu />
    </Layout>
  )
}