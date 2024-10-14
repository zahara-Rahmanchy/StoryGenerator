import React, {useId, useState} from "react";
import {PiPaperPlaneRightFill} from "react-icons/pi";
import axios from "axios";
import StoryContainer from "./StoryContainer";
import {v4 as uuid} from "uuid";
//  http://localhost:3000
const GenerateStory = () => {
  const [generatedStory, setGeneratedStory] = useState("");
  const [storyId, setStoryId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isInput, setInput] = useState(false);
  const [Prompt, setPrompt] = useState("");

  const handleInput = e => {
    if (e.target.value !== "") {
      setInput(true);
    }
  };

  const handleGenerateStory = async e => {
    e.preventDefault();
    const prompt = e.target.story.value;
    console.log(prompt);

    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://y-seven-ecru.vercel.app/chat",
        {prompt}
      );
      setGeneratedStory(response.data);
      setPrompt(prompt);
      setInput(false);
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
    <section className=" w-full h-screen z-10  mx-auto px-auto">
      <form
        onSubmit={handleGenerateStory}
        id="form"
        className="flex flex-row bg-tranparent justify-around items-center   w-full mx-auto"
      >
        <input
          type="textarea"
          className="rounded-lg md:text-center px-2 w-full ms-10 md:ms-20 md:w-4/5 h-14 my-2 border-2 border-gray-500 shadow shadow-amber-200"
          placeholder="e.g(Once Upon a time)"
          onChange={handleInput}
          name="story"
          required
        />

        <button
          type="submit"
          className="relative right-[9%] bg-transparent border-0 text-center btn-circle "
          disabled={isInput === false || isLoading}
        >
          {isLoading && (
            <span className="absolute bottom-0 md:right-[29.5%] right-[10%] loading loading-ring w-[3rem]"></span>
          )}
          <PiPaperPlaneRightFill
            className={`rotate-90 text-xl ${
              isInput === false || isLoading ? "text-gray-300" : "text-blue-950"
            }`}
          />
        </button>
      </form>
      {generatedStory && (
        <StoryContainer props={{Prompt, generatedStory, storyId}} />
      )}
    </section>
  );
};

export default GenerateStory;
