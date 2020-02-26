import Head from 'next/head'
import Link from "next/link";

const Home = () => (
  <div>
    <h2>Home</h2>
    <Link href="/items">
      <a>Go to items</a>
    </Link>
  </div>
)

export default Home
