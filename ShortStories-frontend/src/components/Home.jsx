import React, {useContext} from "react";
import {Player} from "@lottiefiles/react-lottie-player";
import GenerateStory from "./GenerateStory";
import {AuthContext} from "../firebase/AuthProvider";
import Login from "../components/Login";

const Home = () => {
  const {user} = useContext(AuthContext);
  return (
    <div
      className="w-full  h-full"
      style={{
        background:
          "linear-gradient(45deg, rgba(44,169,191,1) 0%, rgba(6,34,61,1) 50%,  rgba(1,4,14,1) 100%)",
      }}
    >
      {!user ? (
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 grid-cols-1 place-items-center h-full">
          <div className="flex flex-col justify-center items-center my-10 space-y-10 gap-0">
            <h1 className="text-white text-2xl font-bold italic w-4/5">
              Log in now to utilize the power of AI storytelling and create your
              own unique tales!
            </h1>
            <Player
              src="/animation.json"
              className="player m-0 md:w-[400px] md:h-[300px] w-[100px] align-top "
              loop
              autoplay
            />
          </div>
          <Login />
        </div>
      ) : (
        <div className="max-w-6xl mx-auto">
          <div className="flex lg:flex-row flex-col justify-center items-center  mx-5 my-10 space-x-0 gap-0">
            <h1 className="text-white md:text-2xl text-xl font-bold italic text-center mb-2">
              Write unique story title, and watch as our AI weaves it into a
              captivating tale.
            </h1>
            <Player
              src="/animation.json"
              className="player m-0 md:w-[150px] md:h-[100px] w-[100px] align-top "
              loop
              autoplay
            />
          </div>
          <GenerateStory />
        </div>
      )}
    </div>
  );
};

export default Home;
