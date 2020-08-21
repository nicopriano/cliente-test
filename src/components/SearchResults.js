import React from 'react'

export default function SearchResults({ items, action, hasLoaded }) {

  if (!items.length && hasLoaded) {
    return (
      <div className="item-not-found">
        No se encontraron productos relacionados a tu búsqueda
      </div>
    )
  }
  
  return (
    <div className="items-list">
      {
        items.map(el => (
          <div className="item-container" key={el.id} onClick={() => action(el.id)}>
            <aside className="foto" style={{
              backgroundImage: `url("${el.picture}")`,
              backgroundSize: 'cover',
            }}></aside>
            <article className="item-info">
              <h3 className="precio">{el.price.currency} {el.price.amount}</h3>
              <h6 className="lugar">{el.address}</h6>
              <h5 className="titulo">{el.title}</h5>
              {
                !el.free_shipping ? null :
                  (
                    <div className="free-shipping-container">
                      <div className="free-shipping-icn"></div>
                      <p className="free-shipping-tag">Envio <b>gratuito</b></p>
                    </div>
                  )
              }
            </article>
          </div>
        ))
      }
    </div>
  )
}