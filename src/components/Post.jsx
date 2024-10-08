import { useEffect, useState } from "react";
import { Hourglass } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import API from "../request/API";
import Mapper from "./Mapper";
import BackButton from "./BackButton";

export default function Post() {
  const [data, setData] = useState(true);
  const [postData, setPostData] = useState();
  const [commentData, setCommentData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    retrieveData();
  }, []);

  const retrieveData = async () => {
    const { data: postData, status: postStatus } = await API(`posts/${id}`);
    const { data: commentData, status: commentStatus } = await API(
      `comments?postId=${id}`
    );
    commentStatus === 200 && postStatus === 200 && setData(false);
    setPostData(postData);
    setCommentData(commentData);
  };

  return (
    <>
      <BackButton />
      {data ? (
        <section className="loading-container">
          <Hourglass
            height="80"
            width="80"
            ariaLabel="Loading data"
            colors={["#306cce", "#72a1ed"]}
            visible={data}
          />
        </section>
      ) : (
        <>
          <section className="post-container">
            <div className="w-11/12 flex flex-col justify-center mb-4">
              <h2>Title: {postData.title}</h2>
              <p className="text-base">Body: {postData.body}</p>
            </div>
            <div className="">
              <Mapper data={commentData} isForPost={false} />
            </div>
          </section>
        </>
      )}
    </>
  );
}
