import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../http';

const useGetLoggedUser = () => {
  const navigate = useNavigate();
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
        const auth = sessionStorage.getItem("auth");
        if (auth) {
          const result = await axios.get(
            "/user",
            {
              headers: { "authorization": auth }
            }
          );
          setUser(result.data);
        } else {
          navigate("/login");
        }
      } catch (error) {
        navigate("/login");
      }
    }
    getUser();
  }, []);
  return {
    user
  }
}

export default useGetLoggedUser;
