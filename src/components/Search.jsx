import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchText}`);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Search"
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;