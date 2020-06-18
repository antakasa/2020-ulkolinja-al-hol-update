import {createContext} from "react"

const AudioContext = createContext({
audioOnOff: false,
toggleAudio: () => null
});
export default AudioContext;