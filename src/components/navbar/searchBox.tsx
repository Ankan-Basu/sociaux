import { useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { api } from "~/utils/api";
import ResultDropdown from "./resultDropdown";

const SearchBox = () => {

  const [searchInput, setSearchInput] = useState<string>('');
  const [searchQueryVal, setSearchQueryVal] = useState<string>('');
  const [displayResults, setDisplayResults] = useState<boolean>(false);

  const searchQuery = api.search.searchUser.useQuery({searchName: searchInput});

  const searchBoxRef = useRef(null);

  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setSearchQueryVal(searchInput);
    // setSearchInput()
  }

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    // setSearchQueryVal(e.target.value);

    if (e.target.value === '') {
      setDisplayResults(false);
    } else {
      setDisplayResults(true);
    }
  }

  const handleReShowDropdown = () => {
    // redisplay the dropdown if it was hidden as a result of clicking outside
    if (searchInput) {
      setDisplayResults(true);
    }
  }

    return (
      <div className='bg-secondary2 rounded-full p-1 relative'>
        <form 
        ref={searchBoxRef}
        onClick={handleReShowDropdown}
        onSubmit={handleSearchSubmit}
        className='flex items-center'>
          <input
          placeholder="Search"
          value={searchInput} 
          onChange={handleSearchInput}
          className='p-1 w-56 lg:w-auto outline-none bg-secondary2 flex-1 rounded-full rounded-r-none'>
          </input>
          <button type='submit' className='p-1 text-primary rounded-full rounded-l-none'>
            <FiSearch fontSize="1.5em" />
          </button>
        </form>
        <ResultDropdown display={displayResults} setDisplay={setDisplayResults} results={searchQuery.data || []}
        searchBoxRef={searchBoxRef}
        searchQuery={searchQuery}
        additionCss="w-11/12 left-2 mt-1" />
      </div>
    )
  }

export default SearchBox;