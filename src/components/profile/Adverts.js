import { useState, useEffect, useContext } from "react";
import ItemProfile from "../ItemProfile";
import axios from "../../http";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../../contexts/AppContext";

const Adverts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const { setActProfile } = useContext(AppContext);

  const deleteAdvert = async ({ target }) => {
    const result = await axios.delete(
      `/product/${target.value}`
    );
    console.log(result.data);
    getProducts();
  }

  const getProducts = async () => {
    try {
      const result = await axios.get("/user/products", {
        headers: { "authorization": sessionStorage.getItem("auth") }
      });
      setProducts(result.data);
    } catch (err) {
      navigate("/login");
    }
  }

  useEffect(() => {
    getProducts();
  }, [])

  return (
    <section>
      <article className="flex justify-between mb-5">
        <h1 className="text-green-900 font-bold text-2xl">Anúncios</h1>
        <button
          type="button"
          className="font-bold w-10 h-10 rounded-full flex justify-center items-center bg-green-900"
          onClick={ () => setActProfile(3) }
        >
          <span className="text-white text-2xl">+</span>
        </button>
      </article>
      <article>
        {
          products.map((product) => (
            <ItemProfile
              key={ product.id }
              id={ product.id }
              title={ product.title }
              cover={ product.cover }
              deleteAdvert={ deleteAdvert }
            />
          ))
        }
      </article>
    </section>
  )
}

export default Adverts;