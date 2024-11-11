import {MiniCard} from "../ui/cards.jsx";
import {CircleDot} from "lucide-react";
import React from "react";

export const StatsBar = ({data, className}) => {
    return (
        <div className={`flex flex-col lg:flex-row gap justify-start gap-5 items-center ${className}`}>
            {data.map((card) => (
                <MiniCard key={card.id} className={"bg-gray-950"}>
                    <div className="flex items-center justify-between gap-2">
                        <h2>{card.title}</h2>
                        <CircleDot className={"h-6 w-6 text-blue-700"}/>
                    </div>
                    <div className="mt-2.5">
                        <h1 className='text-3xl font-bold'>{card.value}</h1>
                        {card.description && <p className="text-sm">{card.description}</p>}
                    </div>
                </MiniCard>
            ))}
        </div>
    )
}