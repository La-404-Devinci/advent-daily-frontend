import { cn } from "../../libs/functions";

export default function Logo({path, alt, className}) {
  return (
    <div className={cn(
      `overflow-hidden rounded-lg`,
      className
    )}>
      <img 
        src={path} 
        alt={alt} 
        className="object-contain w-full h-full" 
      />
    </div>
  );
}