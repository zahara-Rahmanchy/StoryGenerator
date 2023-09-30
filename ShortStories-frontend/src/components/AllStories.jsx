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
        const response = await fetch(`http://localhost:3000/sharedStories`);

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
          `http://localhost:3000/upvote/${id}`
        );
        if (response.status === 200) {
          alert(response.data);
        }
        setUpvoted(true); // Mark as upvoted
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
      <h1 className="text-2xl text-center font-semibold mt-10 italic text-sky-200">
        {" "}
        Read, enjoy, and upvote your favorites to showcase the best tales."
      </h1>

      <div className="grid lg:grid-cols-2 grid-cols-1 place-items-center pb-32 pt-16 max-w-7xl gap-y-16 gap-x-10 w-full ">
        {loading && <span className="loading loading-ring loading-lg"></span>}
        {stories &&
          stories.map(story => (
            <div
              className="card w-[500px] shadow-xl bg-gradient-to-r  from-teal-300 via-base-600 to-teal-500"
              key={story.id}
            >
              <div className="card-body">
                <h2 className="card-title uppercase">{story.prompt}</h2>
                <div className=" overflow-y-scroll">
                  <p>{story.fullstory}</p>
                </div>
                <div className="card-actions justify-end">
                  <p className="text-lg text-blue-800 font-bold">
                    {story.upvotes}{" "}
                    <span className="text-xs  text-gray-800">Upvotes</span>
                  </p>
                  <button
                    onClick={() => {
                      handleUpvote(story.storyId);
                    }}
                    className=" btn text-white   flex flex-row bg-gradient-to-r  from-teal-500 via-base-600 to-blue-950"
                  >
                    <BiSolidUpvote className="text-lg" />
                    Upvote
                  </button>

                  <button
                    onClick={() => handleReadStory(story)}
                    className="btn  bg-blue-950 text-white"
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

export default AllStories;
