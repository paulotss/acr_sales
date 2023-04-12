import { useState, useEffect } from "react"
import ItemSale from "../ItemSale"
import axios from "../../http"

const Sales = (props) => {
  const [sales, setSales] = useState([])

  const getSales = async () => {
    try {
      const result = await axios.get(
        `/sale/product/user/${props.userId}`
      );
      setSales(result.data);
      console.log(result.data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getSales();
  }, []);
  return (
    <>
      <h1 className="text-green-900 font-bold text-2xl">Vendas</h1>
      <section className="mt-3">
        {
          sales.map((sale) => (
            <ItemSale
              key={ sale.id }
              data={ sale.products }
              saleId={ sale.id }
            />
          ))
        }
      </section>
    </>
  )
}

export default Sales