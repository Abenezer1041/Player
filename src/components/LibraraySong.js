import React,{} from "react";
import { playSong } from "../util";

const  LibrarySong= ({song,songs,currentSong,setCurrentSong,id,audioRef,isPlaying,setSongs,playAudio}) =>{

    const songSelectHandler = async() => {
        const selectedSong = songs.filter((state) => state.id === id);
       await setCurrentSong({ ...selectedSong[0] });
        //Set Active in library
        const newSongs = songs.map((song) => {
          if (song.id === id) {
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
    
        //Play audio
        playSong(isPlaying, audioRef);
      };
    return(
        <div className={`library-song ${song.active ? 'selected':""}`} onClick={songSelectHandler}>
         <img 
         alt={song.name} 
         src={song.cover}
          ></img>
         <div className="song-description"> 
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>    
         
         </div>
         

        </div>
    )
}


export default LibrarySong;