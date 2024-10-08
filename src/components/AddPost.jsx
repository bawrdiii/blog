import { useState } from "react";
import API from "../request/API";
import Posts from "./Posts";
import BackButton from "./BackButton";

export default function AddPost() {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [id, setId] = useState(0);
  const [data, setData] = useState([]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const body = formData.get("body");
    if (title.trim() !== "" && body.trim() !== "") {
      const option = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: 2,
          title,
          body,
        }),
      };
      const { status, data: newPost } = await API("/posts", option);
      console.log(status, newPost);
      if (status === 200 || status === 201) {
        let { id } = newPost;
        setSuccess(true);
        setData(() => [...[newPost]]);
        setId(id);
      } else {
        setError(true);
      }
    } else {
      setError(true);
    }
    setTimeout(() => {
      setError(false);
      setSuccess(false);
    }, 2000);
  };

  const deletePost = () => {
    setData(data.shift());
    console.log(data);
  };

  return (
    <>
      <BackButton />
      <section className="p-4 w-11/12 mx-auto">
        <div className="w-1/2 mx-auto min-h-72 p-3 rounded-lg bg-gray-700">
          <form
            className="flex flex-col gap-2 w-11/12 mx-auto min-h-72 max-h-full"
            onSubmit={submitHandler}
          >
            <label htmlFor="title" className="hover:cursor-pointer w-fit">
              Add title
            </label>

            <input
              type="text"
              name="title"
              id="title"
              placeholder="Title..."
              className="input 
            "
            />
            <label
              htmlFor="body"
              className="hover:cursor-pointer w-fit
            "
            >
              Add Body
            </label>

            <textarea
              type="text"
              name="body"
              id="body"
              placeholder="Lorem Ipsum..."
              className="input"
            />
            {error && (
              <small className="text-sm self-center text-red-500">
                Body oder Title darf nicht leer sein!
              </small>
            )}
            <button
              className="submit-button
            "
            >
              Submit
            </button>
            {success && (
              <small className="text-sm self-center text-green-500">
                Dein Blog wurde erfolgreich erstellt!
              </small>
            )}
          </form>
        </div>
        {data.length > 0 && (
          <div className="mt-6 mx-auto w-1/2">
            <Posts data={data} deletePost={deletePost} einzeln={true} />
          </div>
        )}
      </section>
    </>
  );
}
