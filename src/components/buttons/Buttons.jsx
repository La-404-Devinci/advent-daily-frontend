import { cn } from "../../libs/functions";

const styles = {
    primary:
        `bg-blue-700 hover:bg-blue-900 text-white flex items-center justify-center h-12 rounded-md leading-6
         font-sm transition-all duration-300`,
    secondary:
        `text-[#8BA8FA] flex items-center justify-center h-12 rounded border border-[#8BA8FA] hover:bg-[#8BA8FA]
         hover:text-black transition-all duration-300`,
    destructive:
        `border border-red-700 text-red-700 hover:bg-red-900 hover:text-gray-50 flex items-center justify-center
         h-12 rounded-md leading-6 font-sm transition-colors duration-300`,
};

export function Button({children, styleType, type, className, onClick, disabled }) {
    return (
        <button
            className={cn(
                styles[styleType],
                className,
                disabled && "opacity-50 cursor-not-allowed"
            )}
            type={type}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
