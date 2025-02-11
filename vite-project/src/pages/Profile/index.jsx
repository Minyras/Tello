import { useForm } from "react-hook-form";
import style from "./profile.module.css";
import InputMask from "react-input-mask";
import editIcon from "../../assets/images/profil-edit.svg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { updateCustomerInfo } from "../../store/actions/customerThunk";

const Profile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const { customer, updateStatus } = useSelector((state) => state.customer);

  const dispatch = useDispatch();

  const [name, setName] = useState(customer.firstname);
  const [lastname, setLastname] = useState(customer.lastname);
  const [email, setEmail] = useState(customer.email);
  const [phone, setPhone] = useState(customer.phone.slice(4));
  const prefixRef = useRef();

  useEffect(() => {
    prefixRef.current.value = customer.phone.split(" ")[0];
  }, [customer]);
  const onSubmit = (data) => {
    const phoneNumber = prefixRef.current.value + " " + data.phone;
    dispatch(
      updateCustomerInfo({
        customerId: customer.id,
        firstname: data.Name,
        lastname: data.Surname,
        email: data.Email,
        phone: phoneNumber,
      })
    );
  };

  return (
    <div className={style.profile}>
      <h2>Şəxsi məlumatlar</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={style.formGroup}>
          <label>Ad</label>
          <input
            id="name"
            type="text"
            placeholder="Adınızı daxil edin"
            value={name}
            {...register("Name", {
              minLength: {
                value: 3,
                message: "Ad ən azı 3 hərfdən ibarət olmalıdır.",
              },
              onChange: (e) => {
                setName(e.target.value);
              },
            })}
          />
          <span className={errors.Name && style.errorMessage}>
            {errors?.Name?.message}
          </span>
        </div>
        <div className={style.formGroup}>
          <label>Soyad</label>
          <input
            id="surname"
            type="text"
            placeholder="Soyadınızı daxil edin"
            value={lastname}
            {...register("Surname", {
              minLength: {
                value: 3,
                message: "Soyad ən azı 3 hərfdən ibarət olmalıdır.",
              },
              onChange: (e) => {
                setLastname(e.target.value);
              },
            })}
          />
          <span className={errors.Surname && style.errorMessage}>
            {errors?.Surname?.message}
          </span>
        </div>
        <div className={style.formGroup}>
          <label>E-mail</label>
          <input
            id="email"
            type="email"
            placeholder="nümunə@gmail.com"
            value={email}
            {...register("Email", {
              required: "E-mailinizi daxil edin.",
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: "E-mailiniz yanlışdır.",
              },
              onChange: (e) => {
                setEmail(e.target.value);
              },
            })}
          />
          <span className={errors.Email && style.errorMessage}>
            {errors?.Email?.message}
          </span>
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
            value={phone}
            {...register("phone", {
              onChange: (e) => {
                setPhone(e.target.value);
              },
            })}
          />
        </div>
        <span className={updateStatus == "error" ? style.errorMessage : ""}>
          Bu e-maildən artıq istifadə olunub.
        </span>
        <button>
          <img src={editIcon} alt="Edit" /> Məlumatları yenilə
        </button>
      </form>
    </div>
  );
};

export default Profile;
