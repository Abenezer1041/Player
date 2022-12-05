import React,{} from "react";
import LibraraySong from "./LibraraySong";

const  Library= ({libraryStat,songs, currentSong,setCurrentSong,audioRef,isPlaying,setSongs}) =>{
    return(
        <div className={`library ${libraryStat ? 'active-library' :''}`}>
            <h2>Libraray</h2>
            <div className="library-songs">
                {songs.map((song)=>(
                    <LibraraySong
                     songs={songs} 
                     song={song} 
                     currentSong={currentSong} 
                     setCurrentSong={setCurrentSong}
                     id={song.id}
                     key={song.id}
                     audioRef={audioRef}
                     isPlaying={isPlaying}
                     setSongs={setSongs}/>
                ))}
                 
            </div>
         

        </div>
    )
}


export default Library;