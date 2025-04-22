import { Link } from "react-router-dom";

export default function Navbar() {

  return(
    <nav className="bg-emerald-500 p-4 rounded-b-xl">
      <p className="text-3xl"><Link to='/'>Assignment-32</Link></p>
    </nav>
  )
}