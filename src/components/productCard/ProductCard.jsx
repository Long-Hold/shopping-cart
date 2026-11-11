export function ProductCard({id, title, image, price, description}) {
  return (
    <article>
      <h3>{title}</h3>
      <img src={image} alt="" height={200}/>
      <p>{price}</p>
      <p>{description}</p>
    </article>
  )
}