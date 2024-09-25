import { useEffect, useState } from "react";
import API from "../request/API";
import Posts from "./Posts";
export default function Home() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    retrieveData();
  }, []);

  const retrieveData = async () => {
    const { data, status } = await API("posts");
    let dataLimited = data.splice(0, 20);
    status !== 200 ? setError(true) : setData(dataLimited);
  };

  return (
    <>
      {error && (
        <div>
          Es ist ein Fehler aufgetreten! Bitte wenden Sie sich an einen
          Entwickler
        </div>
      )}
      <div className="m-2 mb-6 text-center">Welcome to Blog</div>
      <Posts data={data} />
    </>
  );
}
