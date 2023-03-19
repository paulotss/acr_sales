import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PersonalData = (props) => {
  return (
    <session className="text-green-900">
      <p className="mb-3">
        <span className="font-bold">Nome: </span>
        { `${props.firstName} ${props.lastName}` }
      </p>
      <p className="mb-3">
        <span className="font-bold">Email: </span>
        { props.email }
      </p>
      <p className="mb-3">
        <span className="font-bold">Celular: </span>
        { props.cellPhone }
      </p>
      <p className="mb-3">
        <span className="font-bold">Whatsapp: </span>
        { props.whatsapp }
      </p>
    </session>
  )
};

export default PersonalData;