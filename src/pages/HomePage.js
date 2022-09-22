import Head from "../components/Head";
import SearchBar from "../components/SearchBar";
import Category from "../components/Category";
import { categories, products } from "../mocks/data";
import ItemDisplay from "../components/ItemDisplay";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <main>
      <Head />
      <section className="p-10 bg-green-900">
        <article>
          <SearchBar />
        </article>
        <article className="flex justify-center mt-10">
          {
            categories.map((category) => (
              <Category key={ category.id } name={ category.name } />
            ))
          }
        </article>
        <article className="flex justify-center bg-white p-10 mt-10">
          {
            products.map((product) => (
              <ItemDisplay key={ product.id } title={ product.title } price={ product.price } />
            ))
          }
        </article>
      </section>
      <Footer />
    </main>
  )
}

export default HomePage;