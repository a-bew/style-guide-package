import React from "react";
import { useRef, useEffect, type ReactNode, type Dispatch } from "react";

interface GetOffsetProps {
  children?: ReactNode;
  setTotalOffset: Dispatch<number>;
  ref?: any;
  style?: any;

}

function useGetOffset({ ref, setTotalOffset }: GetOffsetProps) {
  const top = ref.current?.getBoundingClientRect().top
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    // function updateDistanceValue(event: { target: any; }) {
    if (!isNaN(top)) {
      // alert("You clicked outside of me!");
      //get the distance scrolled on body (by default can be changed)
      var distanceScrolled = document.body.scrollTop;
      //add them together
      var totalOffset = distanceScrolled + top;
      setTotalOffset(totalOffset);
    }
  }, [setTotalOffset, top]);
}

/**
 * Component that alerts if you click outside of it
 */

const DistanceFromTop = React.memo(({ children, setTotalOffset, ...rest }: GetOffsetProps) => {
  const wrapperRef = useRef(null);
  useGetOffset({ ref: wrapperRef, setTotalOffset: setTotalOffset });
  return <div ref={wrapperRef} {...rest}>{children}</div>;
})

export default DistanceFromTop;