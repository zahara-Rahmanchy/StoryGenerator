import React, {useEffect, useState} from "react";

const LeaderBoard = () => {
  const [loading, setLoading] = useState(false);
  const [stories, setStories] = useState([]);
  useEffect(() => {
    const getSavedStory = async () => {
      try {
        const response = await fetch(`http://localhost:3000/leaderboard`);

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
  return (
    <>
      <h1 className="text-3xl text-center font-semibold mt-10 italic text-sky-200">
        {" "}
        Most-loved Stories
      </h1>
      <div className=" place-items-center pb-32 pt-16 max-w-7xl gap-y-16 w-full">
        {loading && <span className="loading loading-ring loading-lg"></span>}
        {stories &&
          stories.map((story, index) => (
            <div className="" key={index}>
              <div className="card-body border-2 rounded-lg w-[90%] mx-auto mb-10 text-cyan-100 bg-black bg-opacity-20">
                <h2 className="card-title text-white">{story.prompt}</h2>
                <div className=" overflow-y-scroll">
                  <p>{story.fullstory}</p>
                </div>
                <hr />
                <div className="card-actions justify-end ">
                  <p className="text-xl font-bold text-blue-200">
                    {story.upvotes}{" "}
                    <span className="text-xs text-white">Upvotes</span>
                  </p>
                  <button className="btn bg-gradient-to-r  from-teal-300 via-base-600 to-teal-500">
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
