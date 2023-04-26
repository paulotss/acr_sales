import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../http';

const useGetLoggedUserProducts = () => {
  const [adverts, setAdverts] = useState([]);
  const navigate = useNavigate();

  const getProducts = async () => {
    try {
      const auth = sessionStorage.getItem("auth")
      if(auth) {
        const result = await axios.get("/user/products", {
          headers: { "authorization": auth }
        });
        setAdverts(result.data);
      } else {
        navigate("/login");
      }
      
    } catch (err) {
      navigate("/login");
    }
  }

  const deleteAdvert = async ({ target }) => {
    await axios.delete(
      `/product/${target.value}`
    );
    getProducts();
  }

  useEffect(() => {
    getProducts();
  }, []);
  return {
    adverts,
    deleteAdvert
  }
}

export default useGetLoggedUserProducts;