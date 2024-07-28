import { useContext } from "react";
import { soundContext } from "./soundContext";

function useSoundContext() {
  return useContext(soundContext);
}
export default useSoundContext;
