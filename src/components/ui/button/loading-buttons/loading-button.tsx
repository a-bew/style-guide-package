import s from './loading-button.module.scss';
import g from '@/globalStyles/globalStyles.module.scss'
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  style?: React.CSSProperties;
  text: string;
  isLoading?: boolean;
  textLoading?: string
}

const LoadingButton = (
  { onClick, isLoading, style, text, textLoading = "SIGNING IN...", ...props }: LoadingButtonProps
  // { onClick?: () => void; isLoading: boolean, style?: React.CSSProperties, text?: string, textLoading?: string }
) => {
    return (
      <button
        className={`${g.button} ${s.btn} ${g.borderBtn} ${g.shadow_on_hover} ${props.className} ${isLoading ? s.loading_btn : ''}`}
        style={style}
        onClick={onClick}
        disabled={isLoading}
      >
        {isLoading ? (
          <div className={s.loading_container}>
            <AiOutlineLoading3Quarters className={s.spinner} />
            <span>{
              textLoading
              }</span>
          </div>
        ) : (
          text
        )}
      </button>
    );
  };


  export default LoadingButton;