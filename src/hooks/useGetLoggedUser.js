import { useEffect, useState } from 'react';
import { redirect } from 'react-router-dom';
import axios from '../http';

const useGetLoggedUser = () => {
  const [user, setUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    cpf: "",
    address: {
      id: "",
      cep: "",
      state: "",
      country: "",
      city: "",
      complement: "",
      street: "",
      locality: "",
      userId: ""
    },
    phones: {
      id: "",
      area: "",
      number: "",
      type: "",
      userId: ""
    }
  });
  useEffect(() => {
    const getUser = async () => {
      try {
        const result = await axios.get(
          "/user",
          {
            headers: { "authorization": sessionStorage.getItem("auth") }
          }
        );
        setUser(result.data);
      } catch (error) {
        return redirect("/login");
      }
      return null;
    }
    getUser();
    console.log(user)
  }, []);
  return {
    user
  }
}

export default useGetLoggedUser;
