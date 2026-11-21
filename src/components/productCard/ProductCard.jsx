import styles from "./ProductCard.module.css";

export function ProductCard({title, image, price}) {
  return (
    <article className={styles.productCard}>
      <img src={image} alt="" height={200}/>
      <h3>{title}</h3>
      <p>${price}</p>
    </article>
  )
}