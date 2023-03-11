import { FiSearch } from "react-icons/fi";

const SearchBox = () => {
    return (
      <div className=' bg-secondary2 rounded-full p-1'>
        <form className='flex items-center'>
          <input className='p-1 w-36 lg:w-auto outline-none bg-secondary2 flex-1 rounded-full rounded-r-none'>
          </input>
          <button type='submit' className='p-1 text-primary rounded-full rounded-l-none'>
            <FiSearch fontSize="1.5em" />
          </button>
        </form>
      </div>
    )
  }

export default SearchBox;