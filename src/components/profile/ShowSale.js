import { useContext, useEffect } from "react";
import AppContext from "../../contexts/AppContext";

const ShowSale = () => {
  const { saleData } = useContext(AppContext);

  const getSaleInfo = async () => {

  }

  useEffect(() => {
    console.log(saleData)
  }, [])

  return (
    <>
      <h1 className="text-green-900 font-bold text-2xl">Detalhes da venda:</h1>
    </>
  )
}

export default ShowSale;