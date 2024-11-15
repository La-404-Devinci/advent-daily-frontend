import Light from "./components/light";
import { cn } from "./libs/functions";

export default function Layout({children, className}) {
    return (
        <div
            className={cn(
                `max-w-[30rem] min-h-screen mx-auto overflow-hidden 
                sm:overflow-visible bg-background-color z-0`, 
                className
            )}>
            <div className="fixed top-0 left-0 z-10 w-full h-full">
                <Light size={12} top={40} left={0} color={"1D4ED8"}/>
                <Light size={8.5} top={80} left={80} color={"1D4ED8"}/>
                <Light size={11} top={80} left={50} color={"172554"}/>
                <Light size={11} top={0} left={50} color={"172554"}/>
            </div>
            <div className="relative z-10 flex flex-col items-center justify-center">
                {children}
            </div>
        </div>
    );
}
