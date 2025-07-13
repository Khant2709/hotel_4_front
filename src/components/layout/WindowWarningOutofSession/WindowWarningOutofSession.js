'use client';

import {useEffect, useState, useCallback} from "react";
import Image from "next/image";
import {usePathname, useRouter} from "next/navigation";

import Button from "../../ui/buttons/button/button";
import {HOTEL_TYPE} from "../../../config/envData";
import {getPeriodWork, transformDateFormat} from "../../../utils/getDay";

import emojiSleep from "../../../../public/emoji_sleep.png";

import styles from "./WindowWarningOutofSession.module.css";
import stylesFontT from "../../../styles/fonts/timesNewRoman.module.css";

const seasonDates = getPeriodWork();

const WindowWarningOutofSession = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [showWarning, setShowWarning] = useState(false);

    useEffect(() => {
        const today = new Date();
        const start = new Date(seasonDates.startSeason);
        const end = new Date(seasonDates.endSeason);

        const isInSeason = today >= start && today <= end;
        const isFamiliarized = sessionStorage.getItem("familiarized");

        if (!isInSeason && !isFamiliarized) {
            setShowWarning(true);
        }
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
        <div className={styles.wrapperWindow} onClick={handleClose}>
            <div className={`${stylesFontT.newRoman400} ${styles.containerContent}`}
                 onClick={(e) => e.stopPropagation()}>
                {/*<p className={styles.title}>Добро пожаловать! К сожалению на сайте идут технические работы.</p>*/}
                <p className={styles.title}>Добро пожаловать! Но пока мы отдыхаем...</p>
                <Image
                    alt="Спящий эмодзи"
                    src={emojiSleep}
                    className={styles.emoji}
                    placeholder="blur"
                />
                {/*<p className={styles.description}>*/}
                {/*  Сайт будет доступен вновь <span>14.07.2025</span>, приносим извинения, все интересующие вас вопросы*/}
                {/*  вы можете задать по телефону <span>+7 (991) 416-26-38</span>*/}
                {/*</p>*/}
                <p className={styles.description}>
                    Наш отель работает в период с{" "}
                    <span>{transformDateFormat(seasonDates.startSeason)}</span> по{" "}
                    <span>{transformDateFormat(seasonDates.endSeason)}</span>. Вы можете
                    ознакомиться с сайтом или забронировать номер на сезон.
                </p>

                <div className={styles.containerButtons}>
                    <Button text="Ознакомиться с отелем" hotel={HOTEL_TYPE} handleClick={handleClose}/>
                    <Button text="Посмотреть номера" hotel={HOTEL_TYPE} handleClick={handleViewRooms}/>
                </div>
            </div>
        </div>
    );
};

export default WindowWarningOutofSession;
