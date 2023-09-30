import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../firebase/AuthProvider";
import {BiSolidUpvote} from "react-icons/bi";
import axios from "axios";
const AllStories = () => {
  const {user} = useContext(AuthContext);
  const [stories, setStories] = useState([]);
  const [upvoted, setUpvoted] = useState(false);
  useEffect(() => {
    const getSavedStory = async () => {
      try {
        const response = await fetch(`http://localhost:3000/sharedStories`);

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
    <div className="grid lg:grid-cols-2 grid-cols-1 place-items-center py-32 max-w-7xl gap-y-16 w-full ">
      {stories &&
        stories.map(story => (
          <div className="card w-[500px] bg-base-100 shadow-xl" key={story.id}>
            <div className="card-body">
              <h2 className="card-title">{story.prompt}</h2>
              <div className=" overflow-y-scroll">
                <p>{story.fullstory}</p>
              </div>
              <div className="card-actions justify-end">
                <button
                  onClick={() => {
                    handleUpvote(story.storyId);
                  }}
                  className=" btn  btn-sm flex flex-row"
                >
                  <BiSolidUpvote className="text-lg" />
                  Upvote
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AllStories;
