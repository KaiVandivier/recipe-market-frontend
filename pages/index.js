import Head from 'next/head'
import Recipes from "../components/Recipes";

const Home = props => {
  return (
    <div>
      <Recipes page={props.query.page || 1} />
    </div>
  );
};

export default Home;
