import { useContext } from "react";
import Head from "../components/Head";
import SearchBar from "../components/SearchBar";
import Category from "../components/Category";
import ItemDisplay from "../components/ItemDisplay";
import Footer from "../components/Footer";
import { categories, products } from "../mocks/data";
import AppContext from "../contexts/AppContext";

const HomePage = () => {
  const { search } = useContext(AppContext);

  return (
    <main>
      <Head />
      <section className="p-10 bg-green-900">
        <article>
          <SearchBar />
        </article>
        {
          search.results.length > 0 &&
          <article className="pl-10 pr-10 w-full z-10 bg-green-900 absolute left-0 top-40">
            <div className="bg-white">
              {
                search.results.map((item) => (
                  <p
                    key={ item.id }
                    className="text-sm p-4 cursor-pointer hover:bg-gray-300"
                  >
                    { item.title }
                  </p>
                ))
              }
            </div>
          </article>
        }
        <article className="flex justify-center mt-10 overflow-x-auto">
          {
            categories.map((category) => (
              <Category key={ category.id } name={ category.name } id={ category.id } />
            ))
          }
        </article>
        <article className="flex justify-start bg-white p-10 mt-10 overflow-x-auto">
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