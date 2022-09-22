import Head from "../components/Head";
import SearchBar from "../components/SearchBar";

const HomePages = () => {
  return (
    <main>
      <Head />
      <section className="p-10 bg-green-900">
        <SearchBar />
      </section>
    </main>
  )
}

export default HomePages;