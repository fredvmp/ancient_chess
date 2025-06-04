import { useEffect, useState, type FC } from "react";
import ruin01 from './images/ruinas_otoño.png'
import ruin02 from './images/ruinas_primavera.png'


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
