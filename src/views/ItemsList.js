import React, { useState, useEffect } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import SearchResults from '../components/SearchResults';
import Breadcrumb from '../components/Breadcrumb';
import { Helmet } from 'react-helmet';
import Axios from 'axios';

export default function ItemsList () {

  const [id, setId] = useState(null);
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const location = useLocation();
  const search = new URLSearchParams(location.search).get('search');

  useEffect(() => {

    if(window.__ROUTE_DATA__) {
      setItems(window.__ROUTE_DATA__.items);
      setCategories(window.__ROUTE_DATA__.categories);
      delete window.__ROUTE_DATA__;
      setHasLoaded(true);
    } else {
      Axios.get(`/items?search=${search}`).then(response => {
        document.open();
        document.write(response.data);
        document.close();
      })
    }
    
  }, [search]);

  const goToDetail = id => {
    setId(id);
  };

  if (id) {
    return (
      <Redirect to={{ pathname: `/items/${id}` }} push />
    )
  }

  return (
    <div className="items-list-container">
      <Helmet>
        <title>{ search || 'Resultados'} en Mercado Libre</title>
      </Helmet>
      <Breadcrumb tags={categories}/>
      <SearchResults items={items} action={goToDetail} hasLoaded={hasLoaded}/>
    </div>
  )
}