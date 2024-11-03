export function MiniCard ({children, className}) {
    return (
        <div className={`border-blue-700 border rounded-md p-7 w-full gap-10 ${className}`}>
            {children}
        </div>
    )
}

export function Card ({children, className}) {
    return (
        <div className={`bg-gray-950 border-blue-700 border rounded-2xl py-6 px-10 w-full gap-10 ${className}`}>
            {children}
        </div>
    )
}