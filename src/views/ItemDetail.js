import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ImageGallery from '../components/ImageGallery';
import Breadcrumb from '../components/Breadcrumb';
import { Helmet } from 'react-helmet';
import Axios from 'axios';
import formatNumber from '../utils/NumberFormat';

export default function ItemDetail() {

  const [item, setItem] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const { id } = useParams();

  useEffect(() => {

    if(window.__ROUTE_DATA__) {
      setItem(window.__ROUTE_DATA__.item)
      delete window.__ROUTE_DATA__;
      setHasLoaded(true);
    } else {
      Axios.get(`/items/${id}`).then(response => {
        document.open();
        document.write(response.data);
        document.close();
      })
    }

  }, [id])

  if (!hasLoaded) {
    return null
  }
  
  return !item ? 
    <div className="item-not-found">
      No se encontro la publicación
    </div> : 
    <div className="item-detail-container">
      <Helmet>
        <title>{item.title} - Test Mercado Libre</title>
      </Helmet>
      <Breadcrumb tags={item.categories}/>
      <main className="item-detail">
        <article className="item-description-column">
          <ImageGallery pictures={item.pictures}></ImageGallery>

          <div className="item-info-container">
            <div className="item-description-container">
              <h6 className="description-tag">Descripción del producto</h6>
              <div className="description">
                <p>{item.description}</p>
              </div>
            </div>
          </div>
        </article>
        <aside className="item-buy-info-column">
          <div className="item-info-wrapper">
            <p className="above-title">{item.condition === 'new' ? 'Nuevo' : 'Usado'} - {item.sold_quantity} vendidos</p>
            <h6 className="title">{item.title}</h6>
            <h6 className="price">{item.price.currency} {formatNumber(item.price.amount, item.price.decimals)}</h6>

            {
              !item.free_shipping ? null :
                <div className="free-shipping-container">
                  <div className="free-shipping-icn"></div>
                  <p className="free-shipping-tag">Envio <b>gratuito</b></p>
                </div>
            }

            <button class="buy-btn">Comprar ahora</button>
          </div>
        </aside>
      </main>
    </div> 
}