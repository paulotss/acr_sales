import { useState, useEffect } from 'react';

const useConvertDate = (date) => {
  const [convertedDate, setConvertedDate] = useState("");
  useEffect(() => {
    const newDate = date.split("T")
    setConvertedDate(`${newDate[0]} ${newDate[1].slice(0,8)}`);
  }, []);

  return {
    convertedDate,
  }
}

export default useConvertDate;
