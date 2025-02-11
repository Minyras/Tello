import loading from "../../assets/images/loading.gif";
import style from "./loading.module.css";
const Loading = () => {
  return (
    <div className={style.container}>
      <img src={loading} alt="" />
    </div>
  );
};

export default Loading;
