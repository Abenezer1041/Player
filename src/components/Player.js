import React,{useEffect} from "react";
import { playSong } from "../util";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faPlay,faAngleLeft, faAngleRight,faPause} from '@fortawesome/free-solid-svg-icons'
const Palyer = ({setSongs,currentSong,songs,isPlaying,setIsPlaying,audioRef,setSondInfo,songInfo,setCurrentSong}) =>{
    // reef
     
    // handler
    const playSongHandler=() =>{
        //console.log(audioRef)
        if (isPlaying){
            audioRef.current.pause();
            setIsPlaying(!isPlaying)
        }else{
        audioRef.current.play()
        setIsPlaying(!isPlaying)
        }
    }

     

    const activeLibraryHandler= (nextprev)=>{
      const newSongs = songs.map((song) => {
        if (song.id ===nextprev.id) {
          return {
            ...song,
            active: true,
          };
        } else {
          return {
            ...song,
            active: false,
          };
        }
      });
      setSongs(newSongs);
    //playSong(isPlaying,audioRef)

    }

    const drageHandler = (e)=>{
        //console.log(e.target.value)
        audioRef.current.currentTime =e.target.value;
        setSondInfo({ ...songInfo, currentTime:e.target.value});
    } 

    const getTime= (time)=>{
        return(Math.floor(time/60) + ":"+ ("0"+Math.floor(time %60)).slice(-2))
    }
    let currentIndext = songs.findIndex((state) => state.id === currentSong.id);
     
    
    const skipTrackHandler = async (direction) => {
      let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
  
      //Forward BAck
      if (direction === "skip-forward") {
        await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
        activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
      }
      if (direction === "skip-back") {
        if ((currentIndex - 1) % songs.length === -1) {
          await setCurrentSong(songs[songs.length - 1]);
          activeLibraryHandler(songs[songs.length - 1]);
          playSong(isPlaying, audioRef);
          return;
        }
        await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
        activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
      }
      if (isPlaying) audioRef.current.play();
    };
     
    const trackAnim = {
      transform: `translateX(${songInfo.animationPercentage}%)`,
    };
     
    return(
        <div className="player">
            <div className="time-control">
                <p> {getTime(songInfo.currentTime)} </p>
                <div  style={{
               background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`,
                }}className="track"> 
                <input
                min={0} 
                max={songInfo.duration ||0}
                value={songInfo.currentTime }
                onChange={drageHandler}
                type="range" />
                <div style ={trackAnim}className="animate-track"></div>
                </div>
                <p>{songInfo.duration ? getTime(songInfo.duration):"0:00"}</p>
            </div>
            <div className="play-control">
            <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft}
            onClick={()=>skipTrackHandler('skip-back')}/>
            <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={isPlaying ? faPause:faPlay}/>
            
            <FontAwesomeIcon className="forword" 
            size="2x" 
            icon={faAngleRight}
            onClick={()=>skipTrackHandler('skip-forward')}/>
            </div>
             
        </div>
    )
}


export default Palyer;