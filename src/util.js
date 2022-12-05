export const playSong=(isPlaying, audioRef) =>{
    if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then((audio) => {
              audioRef.current.play();
            })
            .catch((error) => console.log(error));
        }
      }
}


//export const playSong=