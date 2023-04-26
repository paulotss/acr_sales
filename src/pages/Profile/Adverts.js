import Head from '../../components/Head';
import HeadTitle from '../../components/HeadTitle';
import ProfileMenu from '../../components/profile/ProfileMenu';
import ItemProfile from '../../components/ItemProfile';
import useGetLoggedUserProducts from '../../hooks/useGetLoggedUserProducts';
import { Link } from 'react-router-dom';

const Adverts = () => {
  const { adverts, deleteAdvert } = useGetLoggedUserProducts();
  return (
    <>
      <Head />
      <HeadTitle title="Profile" />
      <section className="flex">
        <ProfileMenu />
        <section className="p-5 w-full">
          <article className="flex justify-between mb-5">
            <h1 className="text-green-900 font-bold text-2xl">Anúncios</h1>
            <Link
              to="/profile/adverts/create"
              className="font-bold w-10 h-10 rounded-full flex justify-center items-center bg-green-900"
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
                  deleteAdvert={ deleteAdvert }
                />
              ))
            }
          </article>
        </section>
      </section>
    </>
  )
}

export default Adverts;