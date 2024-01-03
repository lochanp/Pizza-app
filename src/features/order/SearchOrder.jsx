import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchOrder = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query) {
      navigate(`order/${query}`);
      setQuery("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search Order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-28 rounded-full bg-yellow-100 px-4 py-4 text-sm transition-none  duration-300 placeholder:text-stone-400 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-opacity-50 sm:w-64 sm:focus:w-72"
      ></input>
    </form>
  );
};

export default SearchOrder;
