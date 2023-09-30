import React, {useContext} from "react";
import {BsFillShareFill} from "react-icons/bs";
import {CiSaveUp2} from "react-icons/ci";
import {AuthContext} from "../firebase/AuthProvider";
import axios from "axios";

const StoryContainer = ({props}) => {
  const {user} = useContext(AuthContext);

  const handleSaveStories = async () => {
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
    <div className="md:w-4/5 w-[90%] h-[300px] text-white flex flex-col justify-between items-end mt-1 mb-5 p-4  mx-auto overflow-y-scroll bg-black bg-opacity-30 rounded-md">
      <p className="text-md spa" style={{letterSpacing: "1.5px"}}>
        {props.generatedStory}
      </p>

      <div className="flex flex-row  space-x-4 me-5  ">
        <button className="bg-transparent">
          <CiSaveUp2 className="text-2xl" onClick={handleSaveStories} />
        </button>
        <button onClick={hadnleShareStory}>
          <BsFillShareFill className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default StoryContainer;
