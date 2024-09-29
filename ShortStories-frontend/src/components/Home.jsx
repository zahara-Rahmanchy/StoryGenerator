// import {useContext} from "react";
import {Player} from "@lottiefiles/react-lottie-player";
import GenerateStory from "./GenerateStory";
// import {AuthContext} from "../firebase/AuthProvider";
// import Login from "../components/Login";

const Home = () => {
  // const {user} = useContext(AuthContext);
  return (
    <div
      className="w-full  h-full  bg-amber-50"
      // style={{
      //   background:
      //     "linear-gradient(45deg, rgba(44,169,191,1) 0%, rgba(6,34,61,1) 50%,  rgba(1,4,14,1) 100%)",
      // }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex lg:flex-row flex-col justify-center items-center  mx-5 mt-12 mb-5 space-x-0 gap-0">
          <h1 className="text-gray-600 md:text-xl text-xl font-semibold italic text-center mb-2">
            Write unique story title, and watch as our AI weaves it into a
            captivating tale.
          </h1>
        </div>
        <div className="relative">
          <GenerateStory />
          <div className="z-0  absolute top-[25%] left-[25%] right-[25%] bottom-[25%] ">
            {" "}
            <Player
              src="/animation.json"
              className="player m-0 md:w-[400px] md:h-[300px] w-[150px] align-top "
              loop
              autoplay
            />
          </div>
          {/* <Player
              src="/animation.json"
              className="absolute player m-0 md:w-[150px] md:h-[100px] w-[100px] align-top "
              loop
              autoplay
            />{" "} */}
        </div>
      </div>
    </div>
  );
};

export default Home;
