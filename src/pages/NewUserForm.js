import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Head from "../components/Head";
import axios from '../http';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const NewUserForm = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    cpf: "",
    area: "",
    number: "",
  });

  const [ confirmPassword, setConfirmPassword ] = useState("")

  const [ isValid, setIsValid ] = useState(false);

  const userValidate = () => {
    const {
      firstName,
      lastName,
      email,
      password,
      cpf,
      area,
      number
    } = userData;

    const emailPattern = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/igm
    const validation = [
      firstName.length > 4,
      lastName.length > 4,
      emailPattern.test(email),
      (password.length > 5) && (password === confirmPassword),
      cpf.length === 11,
      area.length === 2,
      number.length === 9
    ];

    return validation.every((val) => val);
  }

  const handleChangeUser = ({ target }) => {
    let { value, name } = target;
    switch (name) {
      case "cpf":
        value = value.replace(/\D/g, "");
      case "area":
        value = value.replace(/\D/g, "");
      case "number":
        value = value.replace(/\D/g, "");
    }
    setUserData({
      ...userData,
      [name]: value,
    });
  }

  const submitForm = async () => {

    try {
      await axios.post(
        "/user/create",
        userData
      );
      navigate("/login");
    } catch (error) {
      if (error.response.status === 409) {
        toast.error("Email já cadastrado!");
      } else {
        toast.error("Houve um problema!");
      }
    }
  }

  useEffect(() => {
    if(userValidate()) {
      setIsValid(true);
    }
  }, [userData, confirmPassword]);


  return (
    <main>
      <Head />
      <section className="p-10 bg-green-900">
        <h1 className="text-white font-bold text-xl">
          Cadastro
        </h1>
      </section>
      <section className="flex justify-center align-center mt-5">
        <article className="p-5 border w-[70%]">
          <div className="mb-5">
            <label htmlFor="firstName" className="text-green-900">Nome</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              className="border-2 p-2 w-full"
              onChange={ handleChangeUser }
              value={ userData.firstName }
            />
          </div>
          <div className="mb-5">
            <label htmlFor="lastName" className="text-green-900">Sobrenome</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              className="border-2 p-2 w-full"
              onChange={ handleChangeUser }
              value={ userData.lastName }
            />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="text-green-900">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="border-2 p-2 w-full"
              onChange={ handleChangeUser }
              value={ userData.email }
            />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="text-green-900">CPF</label>
            <input
              type="text"
              name="cpf"
              id="cpf"
              className="border-2 p-2 w-full"
              onChange={ handleChangeUser }
              value={ userData.cpf }
              maxLength={ 11 }
            />
          </div>
          <div className="mb-5">
            <label className="text-green-900">Celular</label>
            <br/>
            <input
              type="text"
              name="area"
              id="area"
              className="border-2 p-2 w-10 mr-2"
              onChange={ handleChangeUser }
              value={ userData.area }
              placeholder="99"
              maxLength={ 2 }
            />
            <input
              type="text"
              name="number"
              id="number"
              className="border-2 p-2 w-64"
              onChange={ handleChangeUser }
              value={ userData.number }
              placeholder="999999999"
              maxLength={ 9 }
            />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="text-green-900">Senha</label>
            <input
              type="password"
              name="password"
              id="password"
              className="border-2 p-2 w-full"
              onChange={ handleChangeUser }
              value={ userData.password }
            />
          </div>
          <div className="mb-5">
            <label htmlFor="confirm_password" className="text-green-900">Confirmação de senha</label>
            <input
              type="password"
              name="confirm_password"
              id="confirm_password"
              className="border-2 p-2 w-full"
              onChange={ ({ target }) => setConfirmPassword(target.value) }
              value={ confirmPassword }
            />
          </div>
          <button
            type="button"
            disabled={!isValid}
            className="bg-green-900 p-2 w-24 text-white disabled:bg-gray-400"
            onClick={ submitForm }
          >
            Cadastrar!
          </button>
        </article>
      </section>
      <Footer />
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
    </main>
  );
}

export default NewUserForm;