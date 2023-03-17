import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Head = () => {
  const [token, setToken] = useState("");

  const logout = () => {
    sessionStorage.clear();
    setToken("");
  }

  useEffect(() => {
    if (sessionStorage.getItem("auth")) {
      setToken(sessionStorage.getItem("auth"));
    }
  }, [])
  return (
    <section className="flex justify-between w-full p-4">
      <div className="flex">
        <Link to="/" className="w-10 h-10 bg-green-900"></Link>
        <h1 className="ml-2 font-bold text-2xl text-green-900">Acrópole</h1>
      </div>

      <div className="flex">
        {
          sessionStorage.getItem("auth")
          ? <button
              type="button"
              className="mr-2 p-2 font-bold bg-gray-300 text-green-900"
              onClick={ logout }
            >
              Sair
            </button>
          : <Link
              to="/login"
              className="mr-2 p-2 font-bold bg-gray-300 text-green-900"
            >
              Entrar
            </Link>
        }
        <Link to="/profile/3" className="p-2 font-bold bg-green-900 text-white">Anunciar</Link>
      </div>
    </section>
  )
};

export default Head;