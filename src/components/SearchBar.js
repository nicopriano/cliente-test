import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';


export default function SearchBar () {

  const [searchValue, setSearchValue] = useState('');
  const [navigate, setNavigate] = useState(false);

  const beginSearch = () => {
    setNavigate(true);
  }

  if(navigate) {
    return (
      <Redirect to={{ pathname: "/items", search: `?search=${searchValue}` }} push/>
    )
  }

  return (
    <form className="search-bar-container" onSubmit={beginSearch}>
      <article className="logo-input-container">
        <Link to="/"><aside className="logo"></aside></Link>
        <input value={searchValue} onChange={e => setSearchValue(e.target.value)} className="search-input" type="search" placeholder="Nunca dejes de buscar"></input>
        <div className="search-btn" onClick={beginSearch}></div>
      </article>
    </form>
  )
}