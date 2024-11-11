import EditUserAvatar from "../components/edit-user-avatar";
import Header from "../components/layout/header";
import Menu from "../components/layout/menu";
import Layout from "../layout";
import avatar from "../assets/celest.png";
import EditUserInfo from "../components/edit-user-info";
import { Button } from "../components/buttons/Buttons";


const users = [
  {
      avatarUrl: avatar,
      username: "Celestaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      quote: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      place: 1,
      score: 10000,
  },
  {
      avatarUrl: avatar,
      username: "Celestaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      quote: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      place: 2,
      score: 9000,
      email: "celest@celest.com",
  },
  {
      avatarUrl: avatar,
      username: "Celestaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      quote: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      place: 3,
      score: 8000,
  },
  {
      avatarUrl: avatar,
      username: "Celest",
      quote: "I'm the best",
      place: 4,
      score: 6000,
  },
  {
      avatarUrl: avatar,
      username: "Celest",
      quote: "I'm the best",
      place: 5,
      score: 5000,
  },
  {
      avatarUrl: avatar,
      username: "Celest",
      quote: "I'm the best",
      place: 6,
      score: 4000,
  },
  {
      avatarUrl: avatar,
      username: "Celest",
      quote: "I'm the best",
      place: 6,
      score: 4000,
  },
  {
      avatarUrl: avatar,
      username: "Celest",
      quote: "I'm the best",
      place: 6,
      score: 4000,
  },
  {
      avatarUrl: avatar,
      username: "Celest",
      quote: "I'm the best",
      place: 6,
      score: 4000,
  },
  {
      avatarUrl: avatar,
      username: "Celest",
      quote: "I'm the best",
      place: 6,
      score: 4000,
  },
] 

export default function ProfileEditPage() {

  return (
    <Layout>
      <Header title="Editer mon profil" />
        <div className="flex items-center gap-8 flex-col p-6 mt-20">
            <EditUserAvatar user={users[1]}/>
            <EditUserInfo user={users[1]}/>
            <div className="flex p-4 gap-4 justify-center items-center fixed bottom-20 left-0 right-0 bg-gradient-to-t from-black/100 to-black/0">
                <Button styleType="primary" className="flex-grow">Enregistrer</Button>
                {/* <Button styleType="secondary" className="flex-grow text-[#DC2626] border-[#DC2626] px-10">Annuler</Button> */}
            </div>
        </div>
      <Menu />
    </Layout>
  )
}