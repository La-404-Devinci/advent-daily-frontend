import { Button } from "./buttons/Buttons";


export default function EditUserAvatar({ user }) {
    return (
        <div className="flex items-center gap-3">
            <div className="w-36 h-36 rounded-lg overflow-hidden flex-shrink-0">
                <img src={user.avatarUrl} alt="avatar" className="w-full h-full object-contain"/>
            </div>
            <div className="flex flex-col gap-3">
                <Button styleType="primary">Uploader avatar</Button>
                <Button styleType="secondary">Supprimer l'avatar</Button>
            </div>
        </div>
    );
}