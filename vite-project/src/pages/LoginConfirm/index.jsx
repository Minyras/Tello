import style from "./loginConfirm.module.css";
import mailsent from "../../assets/images/mail-sent.svg";

const LoginConfirm = () => {
  return (
    <div className={style.confirmation}>
      <img src={mailsent} alt="Mail sent" />
      <p>
        E - poçt ünvanınızı yoxlayın. Göndərilmiş linkə keçid edib, hesabınıza
        daxil olun!
      </p>
    </div>
  );
};

export default LoginConfirm;
