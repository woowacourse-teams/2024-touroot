import { useEffect } from "react";
import { BlockerFunction, useBlocker } from "react-router-dom";

const usePrompt = ({ when, message }: { when: boolean | BlockerFunction; message: string }) => {
  const blocker = useBlocker(when);

  useEffect(() => {
    if (blocker.state === "blocked") {
      const proceed = window.confirm(message);
      if (proceed) {
        setTimeout(blocker.proceed, 0);
      } else {
        blocker.reset();
      }
    }
  }, [blocker, message]);

  useEffect(() => {
    if (blocker.state === "blocked" && !when) {
      blocker.reset();
    }
  }, [blocker, when]);
};

export default usePrompt;
