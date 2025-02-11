import style from "./register.module.css";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { registerCustomer } from "../../store/actions/customerThunk";
import { useRef } from "react";
import facebook from "../../assets/images/facebook-full.svg";
import google from "../../assets/images/google.svg";
import InputMask from "react-input-mask";
import formImg from "../../assets/images/formImg.svg";
const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    const phoneNumber = prefixRef.current.value + " " + data.phone;
    dispatch(
      registerCustomer({
        email: data.Email,
        phone: phoneNumber,
        firstname: data.NameSurname.split(" ")[0],
        lastname: data.NameSurname.split(" ")[1],
      })
    );
    navigate("/login");
  };
  const prefixRef = useRef();

  return (
    <div className={style.register}>
      <div className={style.leftpart}>
        <h2>Qeydiyyat</h2>
        <div className={style.loginButtons}>
          <button>
            <img src={facebook} alt="Facebook" className={style.facebook} />
            <p>Facebook ilə</p>
          </button>
          <button>
            <img src={google} alt="Google" className={style.google} />
            <p>Google ilə</p>
          </button>
        </div>
        <p className={style.or}>və ya</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={style.formGroup}>
            <label>Ad, Soyad</label>
            <input
              id="namesurname"
              type="text"
              placeholder="Ad və soyadınızı daxil edin"
              {...register("NameSurname", {
                pattern: {
                  value: /\w+\s\w+/g,
                  message: "Ad və soyadınızı düzgün daxil edin.",
                },
              })}
            />
            {errors.NameSurname && (
              <span className={style.errorMessage}>
                {errors.NameSurname.message}
              </span>
            )}
          </div>
          <div className={style.formGroup}>
            <label>E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="nümunə@gmail.com"
              {...register("Email", {
                required: "E-mail daxil edin.",
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: "E-mail yanlışdır.",
                },
              })}
            />
            {errors.Email && (
              <span className={style.errorMessage}>{errors.Email.message}</span>
            )}
          </div>
          <div className={`${style.formGroup} ${style.phoneGroup}`}>
            <label>Mobil nömrə</label>
            <select ref={prefixRef}>
              <option value="010">010</option>
              <option value="050">050</option>
              <option value="051">051</option>
              <option value="055">055</option>
              <option value="070">070</option>
              <option value="077">077</option>
              <option value="099">099</option>
            </select>
            <InputMask
              mask="999 - 99 - 99"
              placeholder="000 - 00 - 00"
              id="phone"
              {...register("phone")}
            />
          </div>
          <div className={`${style.formGroup} ${style.agreedGroup}`}>
            <label className={style.container}>
              <input
                type="checkbox"
                {...register("Agreed", {
                  required: "İstifadəçi şərtləri məcburidir.",
                })}
              />
              <span className={style.checkmark}></span>
              <Link to={"#"}>İstifadəçi şərtləri</Link> ilə razıyam
            </label>
            {errors.Agreed && (
              <span className={style.errorMessage}>
                {errors.Agreed?.message}
              </span>
            )}
          </div>
          <input type="submit" value="Qeydiyyat" />
        </form>
        <p className={style.linkTo}>
          Artıq hesabınız var? <Link to={"/login"}>Daxil olun </Link>
        </p>
      </div>
      <div className={style.rightPart}>
        <img src={formImg} alt="Form" />
        <p className={style.linkTo}>
          Artıq hesabınız var? <Link to={"/login"}>Daxil olun </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
