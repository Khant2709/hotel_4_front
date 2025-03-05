'use client';

import {useEffect, useState, useCallback, useMemo} from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import Button from "../../ui/buttons/button/button";
import { HOTEL_TYPE } from "../../../config/envData";
import { getDayStartSeason, transformDateFormat } from "../../../utils/getDay";

import emojiSleep from "../../../../public/emoji_sleep.png";

import styles from "./WindowWarningOutofSession.module.css";
import stylesFontT from "../../../styles/fonts/timesNewRoman.module.css";

const WindowWarningOutofSession = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [showWarning, setShowWarning] = useState(false);

  const { checkInDate, checkOutDate } = useMemo(() => getDayStartSeason(), []);

  useEffect(() => {
    setShowWarning(!sessionStorage.getItem("familiarized"));
  }, [pathname]);

  const handleClose = useCallback(() => {
    sessionStorage.setItem("familiarized", "Y");
    setShowWarning(false);
  }, []);

  const handleViewRooms = useCallback(() => {
    sessionStorage.setItem("familiarized", "Y");
    setShowWarning(false);
    router.push("/reservation");
  }, [router]);

  if (!showWarning) return null;

  return (
      <div className={styles.wrapperWindow}  onClick={handleClose}>
        <div className={`${stylesFontT.newRoman400} ${styles.containerContent}`} onClick={(e) => e.stopPropagation()}>
          <p className={styles.title}>Добро пожаловать! Но пока мы отдыхаем...</p>
          <Image
              alt="Спящий эмодзи"
              src={emojiSleep}
              className={styles.emoji}
              placeholder="blur"
          />
          <p className={styles.description}>
            Наш отель работает в период с{" "}
            <span>{transformDateFormat(checkInDate)}</span> по{" "}
            <span>{transformDateFormat(checkOutDate)}</span>. Вы можете
            ознакомиться с сайтом или забронировать номер на сезон.
          </p>
          <div className={styles.containerButtons}>
            <Button text="Ознакомиться с отелем" hotel={HOTEL_TYPE} handleClick={handleClose} />
            <Button text="Посмотреть номера" hotel={HOTEL_TYPE} handleClick={handleViewRooms} />
          </div>
        </div>
      </div>
  );
};

export default WindowWarningOutofSession;
