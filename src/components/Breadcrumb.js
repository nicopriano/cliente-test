import React from 'react'

export default function Breadcrumb({ tags }) {

  return (
    <div className="breadcrumbs">
      {
        tags && tags.length ? tags.map(el => (
          <span className="category" key={el}>{el}</span>
        )) : null
      }
    </div>
  )
}
