import { DependencyList, useEffect, useRef } from 'react';

const sePreventMountEffect = (
  func: () => void,
  deps: DependencyList | undefined
) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, deps);
};

export default sePreventMountEffect;
