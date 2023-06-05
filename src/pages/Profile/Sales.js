import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../http";
import Head from '../../components/Head';
import HeadTitle from '../../components/HeadTitle';
import ProfileMenu from '../../components/profile/ProfileMenu';
import ItemSale from "../../components/ItemSale"
import loading from "../../media/loading.gif";

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getSales = async () => {
      setIsLoading(true);
      try {
        const auth = sessionStorage.getItem("auth");
        if (auth) {
          const resultUser = await axios.get(
            "/user",
            {
              headers: { "authorization": auth }
            }
          );
          setUser(resultUser.data);
          const resultSale = await axios.get(
            `/sale/product/user`,
            { headers: { "authorization": auth } }
          );
          setSales(resultSale.data);
        } else {
          navigate("/login");
        }
        
      } catch (error) {
        console.log(error)
      }
      setIsLoading(false)
    }
    getSales();
  }, [navigate]);

  return (
    <>
      <Head />
      <HeadTitle title="Profile" />
      <section className="flex flex-col md:flex-row">
        <ProfileMenu linkActive={4} />
        { !isLoading 
        ? user.seller === 1 
          ? <section className="p-5 w-full">
              <h1 className="text-green-900 font-bold text-2xl">Vendas</h1>
              <article className="mt-3">
                {
                  sales.map((sale) => (
                    <ItemSale
                      key={ sale.id }
                      createdAt={ sale.createdAt }
                      data={ sale.products }
                      saleId={ sale.id }
                    />
                  ))
                }
              </article>
            </section>
          : <p className="text-green-900 font-bold text-center p-2 w-full">Área restrita para anunciantes.</p>
        : <div className="flex justify-center w-full">
            <img src={loading} alt="" className="place-self-center self-center" />
          </div>
      }
      </section>
    </>
  )
}

export default Sales;