import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Head = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");

  const logout = () => {
    sessionStorage.clear();
    setToken("");
    navigate("/");
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
          ? <>
              <button
                type="button"
                className="mr-2 p-2 font-bold bg-gray-300 text-green-900"
                onClick={ logout }
              >
                Sair
              </button>
              <Link to="/profile/2" className="p-2 font-bold bg-green-900 text-white mr-2">Anunciar</Link>
              <Link to="/profile/0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mt-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </Link>
            </>
          : <Link
              to="/login"
              className="mr-2 p-2 font-bold bg-gray-300 text-green-900"
            >
              Entrar
            </Link>
        }
      </div>
    </section>
  )
};

export default Head;