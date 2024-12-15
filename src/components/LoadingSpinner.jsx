import { useEffect, useRef } from 'react';
import { COLOR_ARRAY } from '../constant/loadingSpinnerData';
// import './LoadingSpinner.css';

export const LoadingSpinner = () => {
  const squareRef = useRef(null);

  useEffect(() => {
    const numOfPlanets = 50;

    const createPlanet = () => {
      const span = document.createElement('span');
      const randHeight = Math.random() * 460 + 0.8 * 720;
      const randWidth = Math.random() * 740 + 0.8 * 400;
      span.style.height = `${randHeight}px`;
      span.style.width = `${randWidth}px`;

      const randInterval = Math.floor(Math.random() * 10000 + 10000);
      const randDelay = Math.floor(Math.random() * 20000);
      span.style.animationDuration = `${randInterval}ms`;
      span.style.animationDelay = `-${randDelay}ms`;

      const childNode = document.createElement('div');
      const divRadius = Math.random() * 10 + 2;
      childNode.style.height = `${divRadius}px`;
      childNode.style.width = `${divRadius}px`;

      const randomColor = COLOR_ARRAY[Math.floor(Math.random() * COLOR_ARRAY.length)];
      childNode.style.background = randomColor;
      childNode.style.boxShadow = `0 0 1px 1px ${randomColor}`;

      span.appendChild(childNode);
      return span;
    };

    for (let i = 0; i < numOfPlanets; i++) {
      squareRef.current.appendChild(createPlanet());
    }
  }, []);

  return (
    <div id="square" ref={squareRef}>
      <p>Lädt...</p>
    </div>
  );
};
