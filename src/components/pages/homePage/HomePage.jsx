import { Link } from "react-router";

export function HomePage() {
  return (
    <>
      <h2>Currently Viewing: HomePage</h2>
      <Link to={"/"}>Back To Directory</Link>
    </>
  )
}