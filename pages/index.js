import Head from 'next/head'
import Link from "next/link";
import User from "../components/User";

const Home = (props) => (
  <div>
    <h2>Home</h2>

    <User query={props.query} />
    
    <Link href="/items">
      <a>Go to items</a>
    </Link>
  </div>
)

export default Home
