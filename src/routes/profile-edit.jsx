import avatar from "../assets/celest.png";
import { Button } from "../components/buttons/Buttons";
import Header from "../components/layout/header";
import Menu from "../components/layout/menu";
import EditUserAvatar from "../components/profile-edit/edit-user-avatar";
import EditUserInfo from "../components/profile-edit/edit-user-info";
import Layout from "../layout";

const user = {
    avatarUrl: avatar,
    username: "Celestaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    quote: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    place: 2,
    score: 9000,
    email: "celest@celest.com",
}

export default function ProfileEditPage() {

  return (
    <Layout>
      <Header title="Editer le profil" />
        <div className="mt-16 mb-20 w-full max-w-[30rem] p-6 mx-auto flex flex-col items-center gap-8">
            <EditUserAvatar user={user}/>
            <EditUserInfo user={user}/>
            <div className="flex p-4 gap-4 justify-center items-center fixed bottom-20 left-0 right-0 bg-gradient-to-t from-black/100 to-black/0">
                <Button styleType="primary" className="flex-1 max-w-[30rem]">Sauvegarder</Button>
            </div>
        </div>
      <Menu />
    </Layout>
  )
}