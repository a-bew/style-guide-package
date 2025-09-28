import { useEffect, useState } from 'react';
import s from './tagcard.module.scss';
import g from '@/globalStyles/globalStyles.module.scss';
import { selectColor } from '@/utils/functions';

function TagCard({ children, text, id }: any) {

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, id * 1);
  }, [id]);

  return (
    <div className={`${s.container} ${g['horizontal-bottom-line']} ${isVisible ? s['fade-in visible'] : s['fade-in']}`} 
      style = {{background: selectColor(Math.floor(Math.random() * 10), 10)}} 
    >
      <span className={` ${s['tag-item']} ${s['tag-image']}`} >
        {children}
      </span>
      <span className={s['tag-item']}>
        {text}
      </span>
    </div>
  )
}

export default TagCard;