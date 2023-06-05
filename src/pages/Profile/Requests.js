import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../http';
import Head from '../../components/Head';
import HeadTitle from '../../components/HeadTitle';
import ProfileMenu from '../../components/profile/ProfileMenu';
import ItemRequest from '../../components/ItemRequest';
import loading from "../../media/loading.gif";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getRequest = async () => {
      setIsLoading(true);
      try {
        const auth = sessionStorage.getItem("auth");
        if (auth) {
          const result = await axios.get(
            `/sales`,
            { headers: { 'authorization': auth } }
          );
          setRequests(result.data);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.log(error)
      }
      setIsLoading(false);
    }
    getRequest();
  }, [navigate]);

  return (
    <>
      <Head />
      <HeadTitle title="Pedidos" />
      <section className="flex flex-col md:flex-row">
        <ProfileMenu linkActive={3} />
        { !isLoading 
        ? requests
          ? <section className="p-5 w-full">
              <h1 className="text-green-900 font-bold text-2xl">Pedidos</h1>
              <article className="mt-3">
                {
                  requests.map((request) => (
                    <ItemRequest
                      key={request.id}
                      createdAt={request.createdAt}
                      data={request.products}
                    />
                  ))
                }
              </article>
            </section>
          : <p className="text-green-900 font-bold text-center p-2 w-full mt-5">Nada por aqui!</p>
        : <div className="flex justify-center w-full">
            <img src={loading} alt="" className="place-self-center self-center" />
          </div>
        }
      </section>
    </>
  )
}

export default Requests;