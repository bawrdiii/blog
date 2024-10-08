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

  const deletePost = async (id) => {
    const newData = data.filter((post) => id !== post.id);
    setData(newData);
  };

  return (
    <>
      {error && (
        <div>
          Es ist ein Fehler aufgetreten! Bitte wenden Sie sich an einen
          Entwickler
        </div>
      )}
      <section className="flex justify-center items-center m-2 mb-6">
        <div className="p-2">Welcome to Blog</div>
        <a className="p-2 add-btn" href="/add-post">
          Add Post
        </a>
      </section>
      <Posts data={data} deletePost={deletePost} />
    </>
  );
}
