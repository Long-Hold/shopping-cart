import { Link } from "react-router";

export function ErrorPage() {
  return (
    <>
      <h2>Oops! That page doesn't exist.</h2>
      <Link to={"/"}>Back to Directory</Link>
    </>
  )
}