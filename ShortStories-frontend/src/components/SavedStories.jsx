import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../firebase/AuthProvider";
import axios from "axios";

const SavedStories = () => {
  const {user} = useContext(AuthContext);
  const [stories, setStories] = useState([]);
  useEffect(() => {
    const getSavedStory = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/saved/${user?.email}`
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

  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 place-items-center py-32 max-w-7xl gap-y-16 w-full">
      {stories &&
        stories.map(story => (
          <div className="card w-[500px] bg-base-100 shadow-xl" key={story.id}>
            <div className="card-body">
              <h2 className="card-title">{story.prompt}</h2>
              <div className=" overflow-y-scroll">
                <p>{story.fullstory}</p>
              </div>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Read</button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SavedStories;
