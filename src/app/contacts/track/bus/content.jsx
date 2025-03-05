'use client'

import React, {useEffect, useRef} from 'react';
import {useSearchParams} from "next/navigation";

import styles from "../../../../styles/track.module.css";
import stylesFontT from "../../../../styles/fonts/timesNewRoman.module.css";
import CenteredWrapper from "../../../../components/ui/wrapperPage/centeredWrapper";


const ContentTrackBusPage = () => {
  const searchParams = useSearchParams();
  const myElementRef = useRef(null);
  const scroll = searchParams.has("scroll");

  useEffect(() => {
    if (scroll && myElementRef.current) {
      myElementRef.current.scrollIntoView({behavior: "smooth"});
    }
  }, []);


  return (
      <div className={`${stylesFontT.newRoman400} ${styles.wrapperPage}`}>
        <CenteredWrapper>
          <section>
            <h1 className={`${stylesFontT.newRoman700} ${styles.title}`}>Как добраться до ЖК Сан Марина</h1>
            <p className={styles.text}>
              ЖК Сан Марина находится поселке Лазаревское. До Лазаревского можно добраться любым видом транспорта.
              Через поселок проходит автотрасса Джубга — Сочи, Северо-Кавказская железная дорога, в Адлере открыт
              аэропорт.
            </p>
            <br/>
            <p className={styles.text}>
              Самым востребованным и популярным способом доехать до Лазаревского по прежнему является железная
              дорога. На станции «Лазаревская» делают остановку все поезда дальнего следования, которые едут из
              Российских городов в сторону Адлера. Дом находится напротив станции Лазаревское.
            </p>
            <br/>
            <p className={styles.text}>
              Если у вас много вещей – лучше вызвать Яндекс такси – стоимость примерно 200 руб.
              Если вы без вещей – то пешком – 10 минут до дома. Вы выходите с вокзала и идете направо до первого
              поворота направо под ЖД путями и в строну дома направо.
            </p>
          </section>

          <section>
            <h2 className={`${stylesFontT.newRoman700} ${styles.title}`} ref={myElementRef}>
              Адлер — Лазаревское: как добраться?
            </h2>
            <p className={styles.text}>
              <b>Добраться из аэропорта Адлер до Лазаревского можно несколькими способами:</b>
            </p>
            <br/>
            <p className={styles.text}>В аэропорту оборудована станция, откуда 4 раза в сутки до Лазаревского
              отправляются
              электропоезда
              «Ласточки».
            </p>
            <br/>
            <p className={styles.text}>Добраться из аэропорта автобусом труднее: придётся из Адлера доехать до Сочи, и
              сесть на автобус
              №155, который доставит Вас до Лазаревского.
            </p>
            <br/>
            <p className={styles.text}>
              У аэропорта дежурят частные извозчики, готовые хоть и дороже, но быстрее доставить туристов к
              месту назначения. Безопаснее вызвать Яндекс такси, стоимость которого до Лазаревского доходит до
              3000 р. Но от сезонных заторов на узком, серпантинном шоссе не застрахован никто: временами путь в
              70 км занимает несколько часов. Вариантов объезда пробок на трассе Сочи — Лазаревское нет.
            </p>
          </section>
        </CenteredWrapper>
      </div>
  );
};

export default ContentTrackBusPage;