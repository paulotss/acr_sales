import { useEffect } from "react";
import axios from "../http";

const ShippingSelect = (props) => {
  const DEFAULT_SHIPPING_ID = 10;
  const {
    statusPix,
    handleShippingChange,
    currentShipping,
    setCurrentShipping,
    setShippings,
    shippings
  } = props;

  useEffect(() => {
    const getShippings = async () => {
      try {
        const result = await axios.get('/shippings');
        setShippings(result.data);
        const defaultShipping = result.data.find((data) => (
          data.id === DEFAULT_SHIPPING_ID
        ));
        setCurrentShipping(defaultShipping);
      } catch (error) {
        console.log(error);
      }
    }
    getShippings();
  }, [setCurrentShipping, setShippings]);

  return (
    <div className="m-2">
      <p className="text-green-900">Local de entrega</p>
      { shippings.length > 0 &&
        <select
          className="p-2"
          value={currentShipping.id}
          onChange={handleShippingChange}
          disabled={statusPix}
        >
          {
            shippings.map((shipping) => (
              <option key={shipping.id} value={shipping.id}>
                {shipping.name}
              </option>
            ))
          }
        </select>
      }
      <p className="text-green-900 italic">
        { currentShipping.address }
      </p>
      <p className="text-green-900 font-bold">
        Taxa de entrega: { currentShipping.price.toLocaleString(
            'pt-BR',
            { style:'currency', currency:'BRL' }) }
      </p>
    </div>
  )
}

export default ShippingSelect;