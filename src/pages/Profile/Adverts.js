import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "../../http";
import Head from '../../components/Head';
import HeadTitle from '../../components/HeadTitle';
import ProfileMenu from '../../components/profile/ProfileMenu';
import ItemProfile from '../../components/ItemProfile';
import { ToastContainer, toast } from "react-toastify";
import loading from "../../media/loading.gif";

const Adverts = () => {
  const [user, setUser] = useState({});
  const [adverts, setAdverts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const deleteAdvert = async ({ target }) => {
    setIsLoading(true);
    try {
      await axios.delete(
        `/product/${target.id}`
      );
      const auth = sessionStorage.getItem("auth")
      if(auth) {
        const resultAdverts = await axios.get("/user/products", {
          headers: { "authorization": auth }
        });
        setAdverts(resultAdverts.data);
        toast.success("Anúncio removido com sucesso!")
      } else {
        navigate("/login");
      }
    } catch (err) {
      toast.error("Não foi possível excluir!");
    }
    setIsLoading(false);
  }

  useEffect(() => {
    const getUserAndAdverts = async () => {
      setIsLoading(true);
      try {
        const auth = sessionStorage.getItem("auth")
        if(auth) {
          const resultAdverts = await axios.get("/user/products", {
            headers: { "authorization": auth }
          });
          setAdverts(resultAdverts.data);
          const resultUser = await axios.get(
            "/user",
            {
              headers: { "authorization": auth }
            }
          );
          setUser(resultUser.data)
        } else {
          navigate("/login");
        }
      } catch (err) {
        navigate("/login");
      }
      setIsLoading(false);
    }
    getUserAndAdverts();
  }, [navigate]);

  return (
    <>
      <Head />
      <HeadTitle title="Anúncios" />
      <section className="flex flex-col md:flex-row">
        <ProfileMenu linkActive={2} />
        { !isLoading
        ? user.seller === 1
          ? <section className="p-5 w-full">
              <article className="flex justify-between mb-5">
                <h1 className="text-green-900 font-bold text-2xl">Anúncios</h1>
                <Link
                  to="/profile/adverts/create"
                  className="font-bold w-8 h-8 rounded-full flex justify-center items-center bg-green-900"
                >
                  <span className="text-white text-2xl">+</span>
                </Link>
              </article>
              { Object.values(adverts).length !== 0
              ? <article>
                  {
                    adverts.map((advert) => (
                      <ItemProfile
                        key={ advert.id }
                        id={ advert.id }
                        title={ advert.title }
                        cover={ advert.cover }
                        amount={ advert.amount }
                        deleteAdvert={ deleteAdvert }
                      />
                    ))
                  }
                </article>
              : <p className="text-green-900 font-bold text-center p-2 w-full mt-5">Nada por aqui!</p>
              }
            </section>
          : <p className="text-green-900 font-bold text-center p-2 w-full">Área restrita para anunciantes.</p>
        : <div className="flex justify-center w-full">
            <img src={loading} alt="" className="place-self-center self-center" />
          </div>
        }
      </section>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  )
}

export default Adverts;