import Image from "next/image";

import close from "../../../../public/close.png";
import succes from "../../../../public/succesIcon.png";
import error from "../../../../public/errorIcon.png";

import styles from "./windowPopUp.module.css";
import stylesFontT from "../../../styles/fonts/timesNewRoman.module.css";

export const ResponseWindow = ({ status, text, closeResponse }) => (
  <div className={styles.mainWindow}>
    <div className={styles.containerResponse}>
      <Image
        alt={"close"}
        src={close}
        className={styles.closeIcon}
        onClick={closeResponse}
      />
      {status === "OK" ? (
        <Image alt={"GOOD"} src={succes} className={styles.succesIcon} />
      ) : (
        <Image alt={"ERROR"} src={error} className={styles.errorIcon} />
      )}
      <p className={`${stylesFontT.newRoman400} ${styles.textResponse}`}>
        {text}
      </p>
    </div>
  </div>
);
