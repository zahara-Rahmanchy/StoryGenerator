import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const LeaderBoard = () => {
  const [loading, setLoading] = useState(false);
  const [stories, setStories] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getSavedStory = async () => {
      try {
        const response = await fetch(
          `https://y-seven-ecru.vercel.app/leaderboard`
        );

        if (response.status === 200) {
          const data = await response.json();
          setStories(data);
          console.log(...stories);
        } else {
          console.error("Failed to fetch data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getSavedStory();
  }, []);

  const handleReadStory = story => {
    navigate("/story", {state: {story: story}});
  };
  return (
    <>
      <div className=" place-items-center pb-32 pt-7 max-w-7xl gap-y-16 w-full">
        <h1 className="text-3xl text-center font-semibold mb-10 italic text-gray-600">
          {" "}
          Most-loved Stories
        </h1>
        {loading && <span className="loading loading-ring loading-lg"></span>}
        {stories &&
          stories.map((story, index) => (
            <div className="" key={index}>
              <div className="card-body border-2 rounded-lg w-[90%] mx-auto mb-10 text-amber-100 bg-black bg-opacity-80">
                <h2 className="card-title text-white">
                  {story.prompt.toUpperCase()}
                </h2>
                <div className="">
                  {story.fullstory.length > 400
                    ? `${story.fullstory.slice(0, 400)}...`
                    : story.fullstory}
                </div>
                <hr />
                <div className="card-actions justify-end ">
                  <p className="text-xl font-bold text-blue-200">
                    {story.upvotes}{" "}
                    <span className="text-xs text-white">Upvotes</span>
                  </p>
                  <button
                    onClick={() => handleReadStory(story)}
                    className="btn bg-amber-200"
                  >
                    Read
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default LeaderBoard;
