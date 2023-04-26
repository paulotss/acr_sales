const ProfileMenu = () => {
  return (
    <nav className="p-5 bg-green-100 w-64 h-full">
      <ul className="text-green-900">
        <li className="p-2 border-2 border-green-100 hover:border-green-900 cursor-pointer">
          Meus dados
        </li>
        <li className="p-2 border-2 border-green-100 hover:border-green-900 cursor-pointer">
          Anúncios
        </li>
        <li className="p-2 border-2 border-green-100 hover:border-green-900 cursor-pointer">
          Pedidos
        </li>
        <li className="p-2 border-2 border-green-100 hover:border-green-900 cursor-pointer">
          Vendas
        </li>
      </ul>
    </nav>
  )
}

export default ProfileMenu;