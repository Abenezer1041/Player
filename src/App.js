 import React ,{useState,useRef} from "react";
import Palyer from "./components/Player";
import Song from "./components/Song";
import './styles/app.scss';
import data from "./data"
import Library from "./components/Library";
import Navs from "./components/Nav";

import { playSong } from "./util";
//import { library } from "@fortawesome/fontawesome-svg-core";

function App() {
  const audioRef= useRef(null)
  // state
const [songs, setSongs]= useState(data());
const [currentSong, setCurrentSong]= useState(songs[0]);
const [isPlaying, setIsPlaying]= useState(false);
const [libraryStat,setLibraryStat]= useState(false);
const [songInfo, setSondInfo]= useState({
  currentTime:0,
  duration: 0, 
  animationPercentage:0,
})

const timeHandeler=(e)=>{
  const current = e.target.currentTime;
  const duration = e.target.duration;

  const roundedCurrent= Math.round(current);
  const roundedDuration = Math.round(duration);
  const percentage = Math.round((roundedCurrent / roundedDuration) * 100);
  setSondInfo({
    ...songInfo, 
    currentTime:current,
    duration,
    animationPercentage: percentage,})
}

const songEndHandler = async () => {
  let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
  await setCurrentSong(songs[(currentIndex + 1) % songs.length]);

  if (isPlaying) {
    setTimeout(() => {
      audioRef.current.play();
    }, 100);
  }
};

  return (
    <div className={`app ${libraryStat ? 'library-active':""}`}>
       <Navs 
       libraryStat ={libraryStat}
       setLibraryStat={setLibraryStat}/>
      <Song currentSong={currentSong}/>
      <Palyer 
      isPlaying={isPlaying} 
      setIsPlaying={setIsPlaying} 
      currentSong={currentSong}
      audioRef={audioRef}
      setSondInfo={setSondInfo}
      songInfo={songInfo}
      songs={songs}
      setCurrentSong={setCurrentSong}
      setSongs={setSongs}/>
      <Library 
      songs={songs} 
      currentSong={currentSong} 
      setCurrentSong={setCurrentSong}
      audioRef={audioRef}
      isPlaying={isPlaying}
      libraryStat={libraryStat}
      setSongs={setSongs}
       />
      <audio 
            onTimeUpdate={timeHandeler}
            onLoadedMetadata={timeHandeler}
             ref={audioRef} 
             src={currentSong.audio}
             onEnded={songEndHandler}
             ></audio>
             
    </div>
  );
}

export default App;
