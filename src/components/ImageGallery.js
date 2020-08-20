import React, { useState, useEffect } from 'react'

export default function ImageGallery ({ pictures }) {

  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    if(pictures && pictures.length && pictures[0]) {
      setSelectedImage(pictures[0].url)
    }
  }, [pictures])

  return (
    <div className="gallery-container">
      <aside className="list-of-images">
        { pictures.map(pic => (
          <div className="mini-pic" onMouseOver={() => setSelectedImage(pic.url)} key={pic.id} style={{ backgroundImage: `url('${pic.url}')` }}></div>
        ))}
      </aside>
      <main className="large-pic" style={{ backgroundImage: `url('${selectedImage}')`}}></main>
    </div>
  )

}