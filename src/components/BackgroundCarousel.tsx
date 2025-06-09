
/* 
  Posible implementación para el futuro, carrusel de imagenes para que el
  fondo vaya cambiando, no lo implemento actualmente porque me ha gustado más 
  como queda con un fondo estático pero no descarto mejorarlo y añadirlo en un futuro, 
  por eso no elimino la clase de momento
*/

import { useEffect, useState, type FC } from "react";

const IMAGES = [
  './images/ruinas_otoño.png',
  './images/ruinas_primavera.png',
];

const BackgroundCarousel: FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex(i => (i + 1) % IMAGES.length),
      7000,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <div
        key={index}
        className="background-slide"
        style={{ backgroundImage:`url(${IMAGES[index]})` }}
      />
      <div
        className="background-slide"
        style={{
          animationDelay:"3.5s",
          backgroundImage:`url(${IMAGES[(index + 1) % IMAGES.length]})`,
        }}
      />
    </>
  );
};

export default BackgroundCarousel;
