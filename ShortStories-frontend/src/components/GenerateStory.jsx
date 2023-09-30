import React, {useState} from "react";
import {PiPaperPlaneRightFill} from "react-icons/pi";
import axios from "axios";
import StoryContainer from "./StoryContainer";
const GenerateStory = () => {
  //   const [description, setDescription] = useState("");
  const [generatedStory, setGeneratedStory] = useState("");
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
      console.log(response);
      form.reset();
    } catch (error) {
      console.error("Error generating story:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="bg-blue-200 w-full mt-32">
      <form
        onSubmit={handleGenerateStory}
        id="form"
        className="flex flex-row bg-red-300 justify-between items-center"
      >
        <input
          type="textarea"
          className="rounded-lg text-center  w-4/5 mx-auto h-12 my-2"
          placeholder="Enter a description to generate story"
          name="story"
        />
        <button
          type="submit"
          className=" bg-transparent border-0 text-center btn absolute left-[89%]"
        >
          {isLoading && (
            <span className="absolute loading loading-ring loading-lg"></span>
          )}
          <PiPaperPlaneRightFill className=" rotate-90 text-md " />
        </button>
      </form>
      {generatedStory && <StoryContainer props={{Prompt, generatedStory}} />}
    </section>
  );
};

export default GenerateStory;
