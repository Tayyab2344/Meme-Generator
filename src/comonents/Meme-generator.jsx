import React, { useState, useEffect } from 'react';

function MemeGenerator() {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [allMemeImgs, setAllMemeImgs] = useState([]);
  const [randomImg, setRandomImg] = useState('');

  // Fetching data from the API using useEffect
  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
      .then(response => response.json())
      .then(content => setAllMemeImgs(content.data.memes));
  }, []);

  // Method to handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    name === 'topText' ? setTopText(value) : setBottomText(value);
  };

  // Method to submit form and create meme
  const handleSubmit = (event) => {
    event.preventDefault();
    const rand = allMemeImgs[Math.floor(Math.random() * allMemeImgs.length)].url;
    setRandomImg(rand);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-700">
      <form className=" mb-6" onSubmit={handleSubmit}>
        <input
          placeholder="Enter Top Text"
          type="text"
          value={topText}
          name="topText"
          onChange={handleChange}
          className="w-full p-2 mb-2 bg-slate-900 text-white rounded"
        />
        <input
          placeholder="Enter Bottom Text"
          type="text"
          value={bottomText}
          name="bottomText"
          onChange={handleChange}
          className="w-full p-2 mb-2 bg-slate-900 text-white rounded"
        />
        <button className="w-full p-2 mt-2 text-white bg-slate-900  hover:bg-slate-900">
          Generate Meme
        </button>
      </form>
      <div className="relative w-full max-w-md max-h-md">
        {randomImg && (
          <img src={randomImg} alt="meme" className="w-full h-auto object-cover" />
        )}
        {randomImg && (
          <>
            <h2 className="absolute w-full text-center top-2 left-1/2 transform -translate-x-1/2 text-white uppercase font-bold text-xl tracking-wide drop-shadow-lg">
              {topText}
            </h2>
            <h2 className="absolute w-full text-center bottom-2 left-1/2 transform -translate-x-1/2 text-white uppercase font-bold text-xl tracking-wide drop-shadow-lg">
              {bottomText}
            </h2>
          </>
        )}
      </div>
    </div>
  );
}

export default MemeGenerator;
