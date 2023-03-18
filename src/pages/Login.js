import Head from "../components/Head";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [validation, setValidation] = useState(false);

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUser({
      ...user,
      [name]: value,
    });
  }

  const submitLogin = async () => {
    try {
      const result = await axios.post("http://localhost:3001/login", user);
      sessionStorage.setItem("auth", result.data);
      return navigate("/");
    } catch (err) {
      alert(err);
    }
  }

  useEffect(() => {
    const emailPattern = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/igm
    const result = emailPattern.test(user.email) && user.password.length > 5;
    setValidation(result);
  }, [user])

  return (
    <main>
      <Head />
      <section className="p-10 bg-green-900">
        <h1 className="text-white font-bold text-xl">
          Login
        </h1>
      </section>
      <section className="flex justify-center align-center mt-5">
        <article className="p-5 border">
          <div className="mb-5">
            <label htmlFor="email" className="text-green-900">Email</label><br/>
            <input
              type="email"
              name="email"
              id="email"
              className="border-2 p-2 w-full"
              placeholder="acropole@acropole.com"
              value={ user.email }
              onChange={ handleChange }
            />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="text-green-900">Senha</label><br/>
            <input
              type="password"
              name="password"
              id="password"
              className="border-2 p-2 w-full"
              value={ user.password }
              onChange={ handleChange }
            />
          </div>
          <div>
            <button
              type="button"
              disabled={!validation}
              className="bg-green-900 p-2 w-24 text-white disabled:bg-gray-400"
              onClick={ submitLogin }
            >
              Entrar
            </button>
            <Link
              to="/register"
              className="ml-5 text-sm text-green-900"
            >
              Ainda não possuo cadastro
            </Link>
          </div>
        </article>
      </section>
      <Footer />
    </main>
  );
}

export default Login;