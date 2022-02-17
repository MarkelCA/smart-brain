import { useState, useMemo } from "react";

const useFetchPost = (url, body) => {
  const [data, setData] = useState(null);
  useMemo(() => {
    fetch(url, {
        method : 'post',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify(body)
    }).then((res) => res.json())
      .then((data) => setData(data));
  });

  return [data];
};

export default useFetchPost;
