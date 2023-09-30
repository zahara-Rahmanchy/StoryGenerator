import React from "react";
import {useLocation} from "react-router-dom";

const Story = () => {
  const location = useLocation();
  console.log(location);
  const storyData = location.state.story;
  const {prompt, fullstory} = storyData;

  console.log(storyData);

  return (
    <div className="card-body border-2 rounded-lg w-[90%] mx-auto my-10 text-cyan-100 bg-black bg-opacity-20">
      <h2 className="card-title text-white">{prompt}</h2>
      <div className="overflow-y-scroll">
        <p>{fullstory}</p>
      </div>
    </div>
  );
};

export default Story;
