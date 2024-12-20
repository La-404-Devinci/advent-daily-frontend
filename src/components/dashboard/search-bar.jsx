import React from "react";

export const SearchBar = ({className, search, setSearch}) => {

    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    return (
        <div className={`flex items-center gap-2 `}>
            <input type="text" placeholder="Rechercher" className={`p-2 rounded-lg bg-blue-950 ${className}`}
                   onChange={handleSearch} value={search}
            />
        </div>
    )
}
