import React from "react";
import {BsFillShareFill} from "react-icons/bs";
import {CiSaveUp2} from "react-icons/ci";

const StoryContainer = ({props}) => {
  console.log(props);
  return (
    <div className="md:w-4/5 w-full h-[300px]  flex flex-col justify-between items-end mt-1 mb-5 p-4  mx-auto overflow-y-scroll bg-rose-300 rounded-md">
      <p className="text-md spa" style={{letterSpacing: "1.5px"}}>
        {props.generatedStory}
      </p>

      <div className="flex flex-row  space-x-4 me-5  ">
        <button className="bg-transparent">
          <CiSaveUp2 className="text-2xl" />
        </button>
        <button>
          <BsFillShareFill className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default StoryContainer;
