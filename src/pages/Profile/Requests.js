import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../http';
import Head from '../../components/Head';
import HeadTitle from '../../components/HeadTitle';
import ProfileMenu from '../../components/profile/ProfileMenu';
import ItemRequest from '../../components/ItemRequest';

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  const getRequest = async () => {
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
  }

  useEffect(() => {
    getRequest();
  }, []);

  return (
    <>
      <Head />
      <HeadTitle title="Profile" />
      <section className="flex flex-col md:flex-row">
        <ProfileMenu linkActive={3} />
        <section className="p-5 w-full">
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
      </section>
    </>
  )
}

export default Requests;