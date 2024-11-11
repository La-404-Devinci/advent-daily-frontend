import { Button } from "../buttons/Buttons";

export default function EditUserAvatar({ user }) {
    return (
        <div className="flex items-center justify-between gap-4 w-full">
            <div className="relative">
                <div className="w-full aspect-square rounded-xl overflow-hidden flex-shrink-0
                    border-2 border-gray-800">
                    <img 
                        src={user.avatarUrl} 
                        alt="avatar" 
                        className="w-full h-full object-contain"
                    />
                </div>
            </div>
            <div className="flex flex-col gap-3 w-48 flex-shrink-0">
                <Button styleType="primary">Uploader avatar</Button>
                <Button styleType="destructive">Supprimer l'avatar</Button>
            </div>
        </div>
    );
}