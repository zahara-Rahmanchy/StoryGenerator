import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../firebase/AuthProvider";
import {BiSolidUpvote} from "react-icons/bi";
import axios from "axios";
import {useNavigate} from "react-router-dom";
const AllStories = () => {
  const {user} = useContext(AuthContext);
  const [stories, setStories] = useState([]);
  const [upvoted, setUpvoted] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const getSavedStory = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://y-seven-ecru.vercel.app/sharedStories`
        );

        if (response.status === 200) {
          const data = await response.json();
          setStories(data);
          console.log(...stories);
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

  const handleUpvote = async id => {
    try {
      if (!upvoted) {
        // Make a PATCH request to upvote the story
        const response = await axios.patch(
          `https://y-seven-ecru.vercel.app/upvote/${id}`
        );
        if (response.status === 200) {
          alert(response.data);
        }
        setUpvoted(true); // Mark as upvoted
        navigate("/stories");
      } else {
        // Handle the case where the user has already upvoted (optional)
        alert("You have already upvoted this story.");
      }
    } catch (error) {
      console.error("Error upvoting story:", error);
    }
  };
  return (
    <div>
      <h1 className="text-2xl text-center font-semibold mt-10 italic text-gray-600">
        {" "}
        Read, enjoy, and upvote your favorites to showcase the best tales.
      </h1>

      <div className="grid lg:grid-cols-2 grid-cols-1 place-items-center pb-32 pt-16 max-w-7xl gap-y-16 gap-x-10 w-full ">
        {/* {loading && <span className="loading loading-ring loading-lg"></span>} */}
        {stories &&
          stories.map(story => (
            <div
              className="card  w-[400px] shadow-xl bg-stone-500  bg-opacity-20 "
              key={story.id}
            >
              <div className="card-body h-[350px]">
                <h2 className="card-title uppercase">{story.prompt}</h2>
                <div className=" ">
                  {story.fullstory.length > 300
                    ? `${story.fullstory.slice(0, 350)}...`
                    : story.fullstory}
                </div>
                <div className="card-actions justify-end mt-3">
                  <p className="text-lg text-blue-800 font-bold">
                    {story.upvotes}{" "}
                    <span className="text-xs  text-gray-800">Upvotes</span>
                  </p>

                  <button
                    onClick={() => handleReadStory(story)}
                    className="btn-sm bg-amber-300 rounded-2xl text-black"
                  >
                    Read More
                  </button>
                  <button
                    onClick={() => {
                      handleUpvote(story.storyId);
                    }}
                    className="btn-sm bg-amber-300 rounded-2xl text-black "
                  >
                    <span className="text-md flex justify-between items-center">
                      <BiSolidUpvote className="mt-[2px] me-1" />
                      Upvote
                    </span>
                    {/* Upvote */}
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllStories;
