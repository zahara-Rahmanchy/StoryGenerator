import React, {useContext} from "react";
import {BsFillShareFill} from "react-icons/bs";
import {CiSaveUp2} from "react-icons/ci";
import {AuthContext} from "../firebase/AuthProvider";
import axios from "axios";
// import "tailwind-scrollbar";

const StoryContainer = ({props}) => {
  const {user} = useContext(AuthContext);

  const handleSaveStories = async () => {
    if (!user) {
      alert("Please log in to save the story.");
      return;
    }
    const story = {
      creator: user.name,
      email: user.email,
      prompt: props.Prompt,
      fullstory: props.generatedStory,
      storyId: props.storyId,
    };
    try {
      const response = await axios.post(
        "https://y-seven-ecru.vercel.app/stories",
        story
      );
      if (response.status == 200) {
        alert("Saved!");
      }
      console.log(response);
    } catch (error) {
      console.error("Error generating story:", error);
    }
  };

  //   share
  const hadnleShareStory = async () => {
    if (!user) {
      alert("Please log in to save the story.");
      return;
    }
    const story = {
      creator: user.name,
      email: user.email,
      prompt: props.Prompt,
      fullstory: props.generatedStory,
      storyId: props.storyId,
      shared: true,
      upvotes: 0,
    };
    try {
      const response = await axios.post(
        "https://y-seven-ecru.vercel.app/stories",
        story
      );
      if (response.status == 200) {
        alert("Story Shared with Everyone!");
      }
      console.log(response);
    } catch (error) {
      console.error("Error generating story:", error);
    }
  };

  console.log(props);
  return (
    <div className="z-10 absolute lg:right-auto right-[10%]  left-[10%] md:w-4/5   h-[450px] text-white flex flex-col justify-between  mt-1 mb-5 p-4  mx-auto overflow-y-scroll bg-stone-600 bg-opacity-80 rounded-md scrollbar scrollbar-thumb-blue-600 scrollbar-track-transparent">
      <h6 className=" text-center text-lg font-medium text-amber-300 my-2">
        {props.Prompt.toUpperCase()}
      </h6>
      <p className="text-md spa" style={{letterSpacing: "1.5px"}}>
        {props.generatedStory}
      </p>

      <div className="flex flex-row  space-x-4 me-5 justify-between mt-3">
        <button
          className=" btn bg-transparent shadow text-amber-300 hover:text-white hover:bg-amber-300 focus:text-white focus:bg-amber-300"
          onClick={handleSaveStories}
        >
          Save <CiSaveUp2 className="text-xl" />
        </button>
        <button
          className="btn bg-transparent shadow text-amber-300 hover:text-white hover:bg-amber-300 focus:text-white focus:bg-amber-300"
          onClick={hadnleShareStory}
        >
          Share <BsFillShareFill className="text-lg" />
        </button>
      </div>
    </div>
  );
};

export default StoryContainer;
