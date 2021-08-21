import React, { FC, useEffect, useState } from 'react';

/**
 * CSS Modules it is implemented instead of Styled-Componentes because 
 * it works as a spected way when the client recieve de main page
 */
import styles from './styles.module.css';

const SplashScreen: FC = () => {

  const [didLoad, setDidLoad] = useState<boolean>(false);
  useEffect(() => {
    const init = () => {
      const delayRemove: number = 2000;

      window.setTimeout(() => {
        setDidLoad(true);
      }, delayRemove);
    }

    window.addEventListener('load', init);

    return () => window.removeEventListener('load', init);
  },
  []);

  if (didLoad) return <></>;

  return (
    <div className={styles.SplashScreen}>
      <div className={styles.loader} />
    </div>
  );
}

export default SplashScreen;