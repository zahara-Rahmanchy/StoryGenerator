import React, {useId, useState} from "react";
import {PiPaperPlaneRightFill} from "react-icons/pi";
import axios from "axios";
import StoryContainer from "./StoryContainer";
import {v4 as uuid} from "uuid";

const GenerateStory = () => {
  const [generatedStory, setGeneratedStory] = useState("");
  const [storyId, setStoryId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [Prompt, setPrompt] = useState("");
  const handleGenerateStory = async e => {
    e.preventDefault();
    const prompt = e.target.story.value;
    console.log(prompt);

    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/chat", {prompt});
      setGeneratedStory(response.data);
      setPrompt(prompt);
      const id = uuid().slice(0, 8);
      setStoryId(id);
      console.log(response);
      form.reset();
    } catch (error) {
      console.error("Error generating story:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className=" w-full ">
      <form
        onSubmit={handleGenerateStory}
        id="form"
        className="flex flex-row bg-tranparent justify-between items-center"
      >
        <input
          type="textarea"
          className="rounded-lg text-center  w-4/5 mx-auto h-14 my-2 border-2 border-cyan-800 shadow-sm shadow-cyan-300"
          placeholder="Enter a description to generate story"
          name="story"
        />
        <button
          type="submit"
          className=" bg-transparent border-0 text-center btn absolute left-[87%]"
        >
          {isLoading && (
            <span className="absolute loading loading-ring loading-lg"></span>
          )}
          <PiPaperPlaneRightFill className=" rotate-90 text-md " />
        </button>
      </form>
      {generatedStory && (
        <StoryContainer props={{Prompt, generatedStory, storyId}} />
      )}
    </section>
  );
};

export default GenerateStory;
