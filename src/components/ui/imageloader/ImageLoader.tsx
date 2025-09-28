import { useCallback, useEffect, useState, useTransition, type CSSProperties, type ReactEventHandler, type RefObject, memo } from "react";
import ReactIcon from "@/assets/react.svg";
import { loadImg } from "@/utils/functions";
import s from './imageloader.module.scss';

interface SpinnerProps {
  type?: 'small' | 'large',
  style?: any;
  onClick?:()=>void;
  refresh?: boolean;
}

export const Spinner = memo(({type='small', style, onClick, refresh = false}: SpinnerProps)=> {
  const [isHovered, setIsHovered] = useState(false)

  return (<div className = {s[`icontainer-${type}`]} style = {{...style}}
    onMouseEnter = {()=>setIsHovered(true)} 
    onMouseLeave = {()=>setIsHovered(false)}       
  >
    <div className={s[`spinner-${type}`]} 
    
      >
      </div>
      {isHovered && refresh && <div 
        className={s['refresh-loader']} 
        onClick = {onClick}
      >Refresh</div>}
      {type  === 'large' && <span className={s['logo']} ><img src = {ReactIcon} onClick = {()=>{}} /></span>}
    </div>);
})

interface Slide {
  image: string;
  tag?: string;
  id?: string;
}

interface ImageLoaderProps {
  slide: Slide;
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: CSSProperties;
  onLoad?: () => void;
  onClick?: ReactEventHandler<HTMLImageElement>;
  imageRef?: RefObject<HTMLImageElement> | null;
  crossOrigin?: any;
}

const ImageLoader: React.FC<ImageLoaderProps> = memo(({

  slide,
  width = 'auto',
  height,
  className,
  style,
  onLoad,
  onClick,
  crossOrigin,
  imageRef,
}) => {
  const { image, tag, id } =  slide;

  const [src, setSrc] = useState("");
  const [isPending, startTransition] = useTransition();
  const load = useCallback(
     () => {
      startTransition(()=>{
        //   "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Chess_Large.JPG/800px-Chess_Large.JPG"
         loadImg(image).then((src) => {
          if (src === "error") {
            // Handle the error gracefully, if needed
          } else {
            // Image loaded successfully, continue with your logic
             setSrc(src);
             onLoad && onLoad();
          }
        });
      })
    },
    [image, onLoad],
  )

  // Execute the created function directly
  useEffect(() => {
    let mounted = false;
    if (!mounted) {
      load();
      mounted = true;
    }
  }, [load]);
  
  return src ? <img 
                src={image} 
                height = {height} 
                width = {width} 
                style={{
                  opacity: src ? 1 : 0,
                  transition: "opacity 0.3s",
                  ...style
                }}
                alt = "" 
                className = {`${className} ${'main-img'}`}
                onClick = {onClick}
                ref = {imageRef}
                crossOrigin = {crossOrigin}
              /> 
              :<Spinner style={style} onClick  = {()=>load()} refresh = { true } />
})


export default ImageLoader;