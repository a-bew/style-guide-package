import { Link } from "react-router-dom";
import s from "./errorPage.module.scss";
import g from '../../globalStyles/globalStyles.module.scss';
import { Button } from "./Button";
import useWindowDimensions from "../../globalHooks/useWindowDimensions";
import useCurentTheme from '../../globalHooks/useCurentThem';
import { TbHomeCancel } from "react-icons/tb";

const SomethingWentWrong = ({ error, resetErrorBoundary }: { error: Error, resetErrorBoundary: () => void }) => {

  const { width } = useWindowDimensions()
  const { color } = useCurentTheme();

  return (
    <div className={s.pageContainer}>
      <div className={`${s.errorContainer} ${g.responsive_form}`}>
        <h1 className={`${s.errorCode}`} style={{ color }}><TbHomeCancel color={color} /></h1>

        <p className={s.errorInfo}>
          Something went wrong
        </p>
        <p className={s.errorHelp}>
          Something went wrong. Try clicking the refresh page button to reload the
          application.{' '}
        </p>

        <Button label={"Refresh page"} size="large" primary backgroundColor="#E5E5E5" color="black" width={width > 650 ? '50%' : '100%'} onClick={resetErrorBoundary} />

        <Link to="/" onClick={() => window.location.href = '/'}>
          <span className={`${s.errorBtn}`} color="secondary-red">
            Back to Home
          </span>

        </Link>
        <Link to="/" onClick={() => window.location.href = '/'}>
          <span className={`${s.errorBtn}`} color="secondary-red">
            Visit Help Center
          </span>
        </Link>

      </div>
    </div>
  );
}

export default SomethingWentWrong;
