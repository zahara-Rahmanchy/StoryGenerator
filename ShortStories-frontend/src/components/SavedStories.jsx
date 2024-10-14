import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../firebase/AuthProvider";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const SavedStories = () => {
  const {user} = useContext(AuthContext);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getSavedStory = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://y-seven-ecru.vercel.app/saved/${user?.email}`
        );

        if (response.status === 200) {
          const data = await response.json();
          setStories(data);
          //   console.log(...stories);
          setLoading(false);
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
    <div>
      <h1 className="text-3xl text-center text-gray-600"> Your Stories</h1>
      <div className="grid lg:grid-cols-2 grid-cols-1 place-items-center pb-32 pt-16 max-w-7xl gap-y-16 w-full">
        {loading && <span className="loading loading-ring loading-lg"></span>}
        {stories &&
          stories.map(story => (
            <div
              className="card md:w-[500px] mx-3 bg-amber-100 shadow-md"
              key={story.id}
            >
              <div className="card-body">
                <h2 className="card-title">{story.prompt.toUpperCase()}</h2>
                <div className=" overflow-y-scroll">
                  <p>{story.fullstory}</p>
                </div>
                <div className="card-actions justify-end">
                  <button
                    className="btn bg-amber-200 border-0"
                    onClick={() => handleReadStory(story)}
                  >
                    Read
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SavedStories;
