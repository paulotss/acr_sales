import { useState, useEffect } from "react";
import axios from "../../http";
import ItemRequest from "../ItemRequest";

const Requests = (props) => {
  const [requests, setRequests] = useState([])

  const getRequest = async () => {
    try {
      const result = await axios.get(
        `/sale/${props.userId}`
      );
      setRequests(result.data);
      console.log(result.data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getRequest();
  }, []);

  return (
    <>
      <h1 className="text-green-900 font-bold text-2xl">Pedidos</h1>
      <section className="mt-3">
        {
          requests.map((request) => (
            <ItemRequest
              key={request.id}
              data={ request.products }
            />
          ))
        }
      </section>
    </>
  )
}

export default Requests;