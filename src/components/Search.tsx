
const Search = ({onSearch, search}: any): JSX.Element => {
    // console.log("SEARCH");
    const handleChange = (event: any) => {
        onSearch(event);
    }
    return (
        <>
            <label htmlFor="search">Search</label>
            <input onChange={handleChange} type="text" id="search" value={search} />
            {/* <p> SearchState is: {searchState} </p> */}
        </>
    )
}

export default Search;