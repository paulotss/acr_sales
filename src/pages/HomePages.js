import Head from "../components/Head";
import SearchBar from "../components/SearchBar";
import Category from "../components/Category";
import { categories } from "../mocks/data";

const HomePages = () => {
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
      </section>
    </main>
  )
}

export default HomePages;