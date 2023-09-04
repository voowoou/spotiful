import React from "react";

function SearchBar() {
    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text"/>
            <input type="submit" value="SEARCH" />
        </form>
    );
};

function SearchResults() {

};

export default function Search() {
    return (
        <div>
            <h3>Search by song name</h3>
            <SearchBar />
        </div>
    );
};