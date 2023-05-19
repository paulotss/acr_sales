import { Link } from 'react-router-dom';

const ProfileMenu = (props) => {
  return (
    <nav className="p-5 bg-green-100 h-full">
      <ul className="text-green-900 w-48">
        <Link to="/profile">
          <li
            className={
              props.linkActive === 1
                ? "p-1 border-2 rounded-xl border-green-900 bg-green-900 cursor-pointer text-white"
                : "p-1 border-2 rounded-xl border-green-100 cursor-pointer hover:border-green-900"
            }
          >
            Meus dados
          </li>
        </Link>
        <Link to="/profile/adverts">
          <li
            className={
              props.linkActive === 2
                ? "p-1 border-2 rounded-xl border-green-900 bg-green-900 cursor-pointer text-white"
                : "p-1 border-2 rounded-xl border-green-100 cursor-pointer hover:border-green-900"
            }
          >
            Anúncios
          </li>
        </Link>
        <Link to="/profile/requests">
          <li
            className={
              props.linkActive === 3
                ? "p-1 border-2 rounded-xl border-green-900 bg-green-900 cursor-pointer text-white"
                : "p-1 border-2 rounded-xl border-green-100 cursor-pointer hover:border-green-900"
          }
          >
            Pedidos
          </li>
        </Link>
        <Link to="/profile/sales">
          <li
            className={
              props.linkActive === 4
                ? "p-1 border-2 rounded-xl border-green-900 bg-green-900 cursor-pointer text-white"
                : "p-1 border-2 rounded-xl border-green-100 cursor-pointer hover:border-green-900"
            }
          >
            Vendas
          </li>
        </Link>
      </ul>
    </nav>
  )
}

export default ProfileMenu;