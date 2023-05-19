import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
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
    try {
      console.log(target.id);
      await axios.delete(
        `/product/${target.id}`
      );
      getProducts();
      toast.success("Anúncio removido com sucesso!")
    } catch (error) {
      toast.error("Não foi possível excluir!")
    }
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