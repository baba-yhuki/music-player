import { Pause, Play, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { useRef, useState } from "react";
import { Slider } from "./components/ui/slider";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";

const songs = [
  {
    id: 1,
    title: "2:23 AM",
    artist: "しゃろう",
    cover_url: "/2_23_AM.jpg",
    music_url: "/2_23_AM.mp3",
  },
  {
    id: 2,
    title: "しゅわしゅわハニーレモン350ml",
    artist: "しゃろう",
    cover_url: "/Shuwa_shuwa_hani_remon_350ml.jpg",
    music_url: "/Shuwa_shuwa_hani_remon_350ml.mp3",
  },
  {
    id: 3,
    title: "You and Me",
    artist: "しゃろう",
    cover_url: "/You_and_Me.jpg",
    music_url: "/You_and_Me.mp3",
  },
  {
    id: 4,
    title: "サンタは中央線でやってくる",
    artist: "しゃろう",
    cover_url: "/Santa_wa_chuo-sen_de_yatte_kuru.jpg",
    music_url: "/Santa_wa_chuo-sen_de_yatte_kuru.mp3",
  },
  {
    id: 5,
    title: "10℃ ",
    artist: "しゃろう",
    cover_url: "/10℃.jpg",
    music_url: "/10℃.mp3",
  },
];

function App() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const audioRef = useRef<HTMLAudioElement>(null);
  const currentSong = songs[currentSongIndex];

  const handlePrevious = () => {
    setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
    setIsPlaying(false);
  };

  const handleNext = () => {
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
    setIsPlaying(false);
  };

  const togglePlayPause = () => {
    if (!audioRef.current) {
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    if (audioRef.current) {
      audioRef.current.volume = value[0] / 100;
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-gray-900">
        <Card className="w-full max-w-md bg-gradient-to-br from-gray-900 to-gray-900 text-white shadow-xl">
          <CardContent className="p-6">
            <div className="relative aspect-square mb-6 overflow-hidden rounded-ld shadow-2xl">
              <img
                src={currentSong.cover_url}
                alt="cover"
                className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-110"
              />
            </div>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-1">
                {currentSong.title}
              </h2>
              <p className="text-gray-400">{currentSong.artist}</p>
            </div>
            <div className="flex justify-between items-center mb-6">
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePrevious}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <SkipBack className="h-6 w-6" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={togglePlayPause}
                className="text-white hover:text-gray-300 transition-colors"
              >
                {isPlaying ? (
                  <Pause className="h-8 w-8" />
                ) : (
                  <Play className="h-8 w-8" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleNext}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <SkipForward className="h-6 w-6" />
              </Button>
            </div>
            <div className="mt-6 flex items-center">
              <Volume2 className="h-4 w-4 text-gray-400" />
              <Slider
                value={[volume]}
                max={100}
                step={1}
                className="w-full"
                onValueChange={handleVolumeChange}
              />
              <audio
                ref={audioRef}
                src={currentSong.music_url}
                onEnded={handleNext}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default App;
