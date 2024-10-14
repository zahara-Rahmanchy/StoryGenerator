import {useLocation, useNavigate} from "react-router-dom";

const Story = () => {
  const location = useLocation();
  console.log(location);
  const storyData = location.state.story;
  const {prompt, fullstory} = storyData;

  console.log(storyData);
  const navigate = useNavigate();
  return (
    <div className="relative card-body border-2 rounded-lg w-[90%] mx-auto my-10 text-gray-700 bg-black bg-opacity-90">
      <button
        className="btn-sm bg-amber-300 w-[5%]"
        onClick={() => navigate(-1)}
      >
        X
      </button>
      <h2 className="card-title text-white">{prompt.toUpperCase()}</h2>
      <div className="h-[450px] overflow-y-scroll text-amber-100">
        <p>{fullstory}</p>
      </div>
    </div>
  );
};

export default Story;
