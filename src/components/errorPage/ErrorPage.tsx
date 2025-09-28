import React from "react";
// import {
//   Button,
// } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import s from "./errorPage.module.scss";
import g from '../../globalStyles/globalStyles.module.scss';
import { Button } from "./Button";
import useWindowDimensions from "../../globalHooks/useWindowDimensions";
import useCurentTheme from'../../globalHooks/useCurentThem';

const ErrorPage = ({message = "Go to Booth Page"}:{message?: string})=> {

  const { width } = useWindowDimensions()
  const { color } = useCurentTheme();
  const navigate = useNavigate();
    return (
      <div className={s.pageContainer}>
        <div className={`${s.errorContainer} ${g.responsive_form}`}>
          <h1 className={`${s.errorCode}`} style = {{ color }} >404</h1>
          <p className={s.errorInfo}>
            This Page Isn't Available
          </p>
          <p className={s.errorHelp}>
            This link may be broken, or the page may have been removed. Check to see if the link you're trying to open is correct
          </p>

          <Button label={ message } size = "large" primary backgroundColor="#E5E5E5" color="black" width = {width > 650 ? '50%': '100%'} onClick={()=>navigate(-1)} />

          {/* <button  className={`${g.button} ${g.borderBtn} ${g.shadow_on_hover} `} style = {{width : width > 650 ? '50%': '100%', height: 40 }} >Go to Booth Page</button> */}

          <Link to="/">
            <span className={`${s.errorBtn}`} color="secondary-red">
              Back to Home
            </span>
          </Link>
          <Link to="/">
            <span className={`${s.errorBtn} r`} color="secondary-red">
              Visit Help Center
            </span>
          </Link>

        </div>
        {/* <div className={s.imageContainer}>
          <img className={s.errorImage} src={errorImage} alt="Error page" width="80" />
        </div> */}
        {/* <div className={s.footer}>
          <span className={s.footerLabel}>2021 &copy; Flatlogic. Hand-crafted & Made with</span>
        </div> */}
      </div>
    );
}

export default ErrorPage;
