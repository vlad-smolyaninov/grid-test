const { useState, useEffect, useCallback } = require("react");

function useAnimation() {
  const [colorReset, setColorReset] = useState(true);
  const [shouldTransition, setShouldTransition] = useState(true);

  const resetAnimation = useCallback(() => {
    setShouldTransition(false);
    setColorReset(false);
  }, []);

  useEffect(() => {
    if (!colorReset) {
      setShouldTransition(true);
      setColorReset(true);
    }
  }, [colorReset]);

  return {
    resetAnimation,
    shouldTransition,
    colorReset,
  };

}

export default useAnimation;