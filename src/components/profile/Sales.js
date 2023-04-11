import { useState, useEffect } from "react"
import ItemRequest from "../ItemRequest"
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
      <h1 className="text-green-900 font-bold text-2xl">Pedidos</h1>
      <section className="mt-3">
        {
          sales.map((sale) => (
            <ItemRequest
              key={ sale.id }
              data={ sale.products }
            />
          ))
        }
      </section>
    </>
  )
}

export default Sales