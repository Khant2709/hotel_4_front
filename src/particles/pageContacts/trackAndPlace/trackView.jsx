import Link from "next/link";

import {trackMethod} from "./data";

import styles from "./track.module.css";
import stylesFont from "../../../styles/fonts/timesNewRoman.module.css";


export const TrackView = () => {
  return (
      <section className={`${stylesFont.newRoman400} ${styles.container}`}>
        <p className={styles.subtitle}>Путь до нас:</p>
        {trackMethod.map((item) => (
            <div key={item.id} className={`${styles.container} ${styles.miniContainer}`}>
              <p className={styles.subtitleMethod}>{item.title}</p>
              <ul className={styles.list}>
                {item.method.map((method) => {
                  return render(method)
                })}
              </ul>
            </div>
        ))}
      </section>
  );
};

const render = (method) => {
  switch (method.type) {
    case "text":
      return <li key={method.id}>{method.text}</li>;
    case "router":
      return <li key={method.id}>{method.text}(<Link href={method.link}>{method.subtext}</Link>)</li>
    case "link":
      return <li key={method.id}>{method.text}
        <a
            target={"_blank"}
            rel="noopener noopener"
            href={method.link}
        >
          {method.subtext}
        </a>
      </li>
    default:
      return null;
  }
}