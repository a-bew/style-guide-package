import { useEffect } from "react";

let listenerCallbacks = new WeakMap();

const handleIntersections = (entries:any) => {
  entries.forEach((entry:any) => {
    if (!listenerCallbacks.has(entry.target)) {
      return;
    }

    let callback = listenerCallbacks.get(entry.target);

    if (!entry.isIntersecting) {
      return;
    }

    observer.unobserve(entry.target);
    listenerCallbacks.delete(entry.target);
    callback();
  });
};

let observer = new IntersectionObserver(handleIntersections, {
  rootMargin: "0px",
  threshold: 0.15
});

const useIntersection = (ref:any, callback:any) => {
  useEffect(() => {
    listenerCallbacks.set(ref.current, callback);
    observer.observe(ref.current);

    return () => {
      listenerCallbacks.delete(ref.current);
      observer.unobserve(ref.current);
    };
  }, [ref, callback]);
};

export default useIntersection;