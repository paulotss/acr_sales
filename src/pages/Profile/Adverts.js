import Head from '../../components/Head';
import HeadTitle from '../../components/HeadTitle';
import ProfileMenu from '../../components/profile/ProfileMenu';
import ItemProfile from '../../components/ItemProfile';
import useGetLoggedUserProducts from '../../hooks/useGetLoggedUserProducts';
import { ToastContainer } from "react-toastify";
import { Link } from 'react-router-dom';

const Adverts = () => {
  const { adverts, deleteAdvert } = useGetLoggedUserProducts();
  return (
    <>
      <Head />
      <HeadTitle title="Profile" />
      <section className="flex flex-col md:flex-row">
        <ProfileMenu linkActive={2} />
        <section className="p-5 w-full">
          <article className="flex justify-between mb-5">
            <h1 className="text-green-900 font-bold text-2xl">Anúncios</h1>
            <Link
              to="/profile/adverts/create"
              className="font-bold w-8 h-8 rounded-full flex justify-center items-center bg-green-900"
            >
              <span className="text-white text-2xl">+</span>
            </Link>
          </article>
          <article>
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
        </section>
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