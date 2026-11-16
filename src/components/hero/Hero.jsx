import styles from "./Hero.module.css";

export function Hero({
  title,
  caption,
  alt="",
  desktop1280, 
  desktop1920, 
  desktop2560,
  mobile800,
  mobile1200,
  mobile1600
}) {
  return (
    <section className={styles.banner}>
      <h2 className={styles.title}>{title}</h2>
      <figure className={styles.figure}>
        <picture className={styles.picture}>
          <source 
            media="(max-width: 37.5rem)"
            srcSet={`${mobile800} 800w, ${mobile1200} 1200w, ${mobile1600} 1600w`}
            sizes="100vw"
          />
          <source
            srcSet={`${desktop1280} 1280w, ${desktop1920} 1920w, ${desktop2560} 2560w`}
            sizes="100vw"
          />
          <img
            className={styles.image}
            src={desktop1920}
            width={1920}
            height={1080}
            alt={alt}
            fetchPriority="high"
          />
        </picture>
        <figcaption className={styles.caption}>{caption}</figcaption>
      </figure>
    </section>
  )
}