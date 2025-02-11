import style from "./productDetail.module.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProduct } from "../../store/actions/productThunk";
import greenAzn from "../../assets/images/greenazn.svg";
import redAzn from "../../assets/images/redazn.svg";
import cartIcon from "../../assets/images/cart.svg";
import star from "../../assets/images/star.svg";
import emptyStar from "../../assets/images/emptyStar.svg";
import Gallery from "../../components/Gallery";
import { addItemToCart } from "../../store/actions/cartThunk";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../components/Loading";

const ProductDetail = () => {
  const params = useParams();

  const [colorObj, setColorObj] = useState(undefined);
  const [selectedColor, setSelectedColor] = useState(undefined);
  const [selectedStorage, setSelectedStorage] = useState(undefined);
  const [price, setPrice] = useState(0);
  const [count, setCount] = useState(1);
  const [selectedSize, setSelectedSize] = useState(undefined);

  const [isComments, setIsComments] = useState(true);

  const { singleProduct } = useSelector((state) => state.product);
  const { cart } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getProduct({ id: params.id }));
  }, [params.id]);

  useEffect(() => {
    if (singleProduct.product.variant_groups?.length > 1) {
      if (
        singleProduct.product.variant_groups?.some(
          (variant) => variant.name == "Yaddaş"
        )
      ) {
        singleProduct.product.variant_groups?.map((variant) => {
          if (variant.name == "Yaddaş") {
            setPrice(
              variant.options[0].price.raw + singleProduct.product.price.raw
            );
            setSelectedStorage(variant.options[0].id);
          }
          if (variant.name == "Rəng") {
            setColorObj(variant.options[0]);
            setSelectedColor(variant.options[0].id);
          }
        });
      } else if (
        singleProduct.product.variant_groups?.some(
          (variant) => variant.name == "Ölçü"
        )
      ) {
        singleProduct.product.variant_groups?.map((variant) => {
          if (variant.name == "Ölçü") {
            setPrice(
              variant.options[0].price.raw + singleProduct.product.price.raw
            );
            setSelectedSize(variant.options[0].id);
          }
          if (variant.name == "Rəng") {
            setColorObj(variant.options[0]);
            setSelectedColor(variant.options[0].id);
          }
        });
      }
    } else if (singleProduct.product.variant_groups?.length == 1) {
      if (
        singleProduct.product.variant_groups?.some(
          (variant) => variant.name == "Rəng"
        )
      ) {
        setPrice(singleProduct.product.price.raw);
        setColorObj(singleProduct.product.variant_groups[0].options[0]);
        setSelectedColor(singleProduct.product.variant_groups[0].options[0].id);
      }
    }
  }, [singleProduct]);

  if (singleProduct?.status == "loading") {
    return <Loading />;
  }

  const handleColor = (id) => {
    setSelectedColor(id);
    setColorObj(
      singleProduct.product.variant_groups
        ?.filter((variant) => variant.name == "Rəng")[0]
        .options.filter((color) => color.id == id)[0]
    );
  };

  const handleStorage = (id) => {
    setSelectedStorage(id);
    setPrice(
      singleProduct.product.variant_groups
        .find((variant) => variant.name == "Yaddaş")
        .options.find((option) => option.id == id).price.raw +
        singleProduct.product.price.raw
    );
  };
  const handleSize = (id) => {
    setSelectedSize(id);
    setPrice(
      singleProduct.product.variant_groups
        .find((variant) => variant.name == "Ölçü")
        .options.find((option) => option.id == id).price.raw +
        singleProduct.product.price.raw
    );
  };

  const minusCount = () => {
    if (count > 1) {
      setCount((prev) => prev - 1);
    }
  };
  const plusCount = () => {
    setCount((prev) => prev + 1);
  };

  const addToBasket = () => {
    let options = {};
    const colorgroupId = singleProduct.product.variant_groups.find(
      (variant) => variant.name == "Rəng"
    ).id;
    options[colorgroupId] = selectedColor;
    let storagegroupId = null;
    let sizegroupId = null;
    if (
      singleProduct.product.variant_groups?.some(
        (variant) => variant.name == "Yaddaş"
      )
    ) {
      storagegroupId = singleProduct.product.variant_groups.find(
        (variant) => variant.name == "Yaddaş"
      ).id;
      options[storagegroupId] = selectedStorage;
    } else if (
      singleProduct.product.variant_groups?.some(
        (variant) => variant.name == "Ölçü"
      )
    ) {
      sizegroupId = singleProduct.product.variant_groups.find(
        (variant) => variant.name == "Ölçü"
      ).id;
      options[sizegroupId] = selectedSize;
    }
    toast.promise(
      dispatch(
        addItemToCart({
          cartId: cart.id,
          productId: singleProduct.product.id,
          quantity: count,
          options: options,
        })
      ),
      {
        pending: "Səbətə əlavə edilir.",
        success: "Səbətə əlavə olundu.",
        error: "Səbətə əlavə olunmadı.",
      }
    );
  };

  return (
    <div className={style.productContainer}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className={style.breadCrumb}>
        <Link to={"/"}>Ana səhifə</Link>
        <img src="/next.svg" alt="In" />
        <Link to="/products">Məhsullar</Link>
        <img src="/next.svg" alt="In" />
        <Link to={"/product/" + singleProduct?.product?.name}>
          {singleProduct?.product?.name}
        </Link>
      </div>
      <div className={style.topPart}>
        <div className={style.imageGallery}>
          <Gallery
            images={singleProduct.product.assets
              ?.filter((image) => colorObj?.assets?.includes(image.id))
              .map((img) => img.url)}
          />
        </div>
        <div className={style.rightPart}>
          <h2>{singleProduct.product?.name}</h2>
          <div className={style.topRating}>
            <div className={style.stars}>
              <img src={star} alt="Rating" />
              <img src={star} alt="Rating" />
              <img src={star} alt="Rating" />
              <img src={star} alt="Rating" />
              <img src={emptyStar} alt="Rating" />
            </div>
            <span>(226)</span>
            <div className={style.divider}></div>
            <p className={style.ratings}>57 rəy</p>
          </div>
          <div className={style.price}>
            <p>
              {price}
              <img src={greenAzn} className={style.greenAzn} alt="AZN" />
              <img src={redAzn} className={style.redAzn} alt="AZN" />
            </p>
            <button className={style.cart} onClick={addToBasket}>
              <img src={cartIcon} alt="Cart" />
              Səbətə at
            </button>
          </div>
          <div className={style.static}>
            {singleProduct.product.variant_groups?.some(
              (variant) => variant.name == "Rəng"
            ) ? (
              <div className={style.options}>
                <p>Rəng:</p>
                {singleProduct.product?.variant_groups
                  ?.find((variant) => variant.name == "Rəng")
                  .options?.map((option) => {
                    return (
                      <div
                        className={`${style.color} ${
                          selectedColor && selectedColor == option.id
                            ? style.selected
                            : ""
                        }`}
                        key={option.id}
                        style={{ backgroundColor: option.name }}
                        onClick={() => handleColor(option.id)}
                      ></div>
                    );
                  })}
              </div>
            ) : (
              ""
            )}

            {singleProduct.product.variant_groups?.some(
              (variant) => variant.name == "Yaddaş"
            ) && (
              <div className={`${style.options} ${style.storages}`}>
                <p>Yaddaş:</p>
                {singleProduct.product?.variant_groups
                  ?.find((variant) => variant.name == "Yaddaş")
                  .options?.map((option) => {
                    return (
                      <div
                        className={`${style.storage} ${
                          selectedStorage == option.id ? style.selected : ""
                        }`}
                        key={option.id}
                        onClick={() => handleStorage(option.id)}
                      >
                        {option.name}
                      </div>
                    );
                  })}
              </div>
            )}
            {singleProduct.product.variant_groups?.some(
              (variant) => variant.name == "Ölçü"
            ) && (
              <div className={`${style.options} ${style.storages}`}>
                <p>Ölçü:</p>
                {singleProduct.product?.variant_groups
                  ?.find((variant) => variant.name == "Ölçü")
                  .options?.map((option) => {
                    return (
                      <div
                        className={`${style.storage} ${
                          selectedSize == option.id ? style.selected : ""
                        }`}
                        key={option.id}
                        onClick={() => handleSize(option.id)}
                      >
                        {option.name}
                      </div>
                    );
                  })}
              </div>
            )}

            <div className={`${style.options} ${style.count}`}>
              <p>Miqdar:</p>
              <button onClick={minusCount}>-</button>
              <span>{count}</span>
              <button onClick={plusCount}>+</button>
            </div>
          </div>
          <button className={style.cart} onClick={addToBasket}>
            <img src={cartIcon} alt="Cart" />
            Səbətə at
          </button>
        </div>
      </div>
      <div className={style.about}>
        <h2>Məhsul haqqında</h2>
        <div
          dangerouslySetInnerHTML={{
            __html: singleProduct.product?.description,
          }}
        />
      </div>
      <div className={style.moreInfo}>
        <div className={style.tabs}>
          <button
            className={`${style.tablinks} ${isComments && style.active}`}
            onClick={() => setIsComments(true)}
          >
            Texniki xüsusiyyətləri
          </button>
          <button
            className={`${style.tablinks} ${
              isComments == false && style.active
            }`}
            onClick={() => setIsComments(false)}
          >
            Rəylər
          </button>
        </div>
        <div className={style.tabContents}>
          <div
            className={`${style.tabContent} ${style.technic} ${
              isComments == false && style.hidden
            }`}
          >
            <div className={style.tabLeft}>
              <div className={style.addInfo}>
                <h2>Əsas göstəricilər</h2>
                <ul>
                  <li>
                    <p>İstehsalçı</p>
                    <p>Apple</p>
                  </li>
                  <li>
                    <p>İstehsalçı</p>
                    <p>Apple</p>
                  </li>
                  <li>
                    <p>İstehsalçı</p>
                    <p>Apple</p>
                  </li>
                  <li>
                    <p>İstehsalçı</p>
                    <p>Apple</p>
                  </li>
                </ul>
              </div>
              <div className={style.addInfo}>
                <h2>Əlavə göstəricilər</h2>
                <ul>
                  <li>
                    <p>İstehsalçı</p>
                    <p>Apple</p>
                  </li>
                  <li>
                    <p>İstehsalçı</p>
                    <p>Apple</p>
                  </li>
                  <li>
                    <p>İstehsalçı</p>
                    <p>Apple</p>
                  </li>
                  <li>
                    <p>İstehsalçı</p>
                    <p>Apple</p>
                  </li>
                </ul>
              </div>
              <div className={style.addInfo}>
                <h2>Üstünlüklər</h2>
                <ul>
                  <li>
                    <p>İstehsalçı</p>
                    <p>Apple</p>
                  </li>
                  <li>
                    <p>İstehsalçı</p>
                    <p>Apple</p>
                  </li>
                  <li>
                    <p>İstehsalçı</p>
                    <p>Apple</p>
                  </li>
                  <li>
                    <p>İstehsalçı</p>
                    <p>Apple</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className={style.tabRight}>
              <div className={style.about}>
                <h2>Məhsul haqqında</h2>
                <div
                  dangerouslySetInnerHTML={{
                    __html: singleProduct.product?.description,
                  }}
                />
              </div>
            </div>
          </div>
          <div className={`${style.tabContent} ${isComments && style.hidden}`}>
            <div className={style.rating}>
              <div className={style.leftPart}>
                <h2>4</h2>
                <div className={style.rate}>
                  <img src={star} alt="Rating" />
                  <img src={star} alt="Rating" />
                  <img src={star} alt="Rating" />
                  <img src={star} alt="Rating" />
                  <img src={emptyStar} alt="Rating" />
                </div>
              </div>
              <div className={style.rightPart}>
                <div className={style.topRight}>
                  <h3>Gunel Mammadova</h3>
                  <span>5 gün əvvəl</span>
                </div>
                <p className={style.aboutProduct}>Yaddaş - 64, Rəng - Qara</p>
                <p className={style.ratingDesc}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                  mattis viverra lacus ut et, etiam. Vel ut in nunc nunc ut sit
                  nibh tortor sit. Consectetur sit auctor odio quis suspendisse
                  tincidunt quis. Et tristique amet aenean nibh porttitor quis
                  aliquam integer. Consectetur lacus, volutpat malesuada libero.
                  Sollicitudin libero pharetra a.
                </p>
              </div>
            </div>
            <div className={style.rating}>
              <div className={style.leftPart}>
                <h2>4</h2>
                <div className={style.rate}>
                  <img src={star} alt="Rating" />
                  <img src={star} alt="Rating" />
                  <img src={star} alt="Rating" />
                  <img src={star} alt="Rating" />
                  <img src={emptyStar} alt="Rating" />
                </div>
              </div>
              <div className={style.rightPart}>
                <div className={style.topRight}>
                  <h3>Gunel Mammadova</h3>
                  <span>5 gün əvvəl</span>
                </div>
                <p className={style.aboutProduct}>Yaddaş - 64, Rəng - Qara</p>
                <p className={style.ratingDesc}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                  mattis viverra lacus ut et, etiam. Vel ut in nunc nunc ut sit
                  nibh tortor sit. Consectetur sit auctor odio quis suspendisse
                  tincidunt quis. Et tristique amet aenean nibh porttitor quis
                  aliquam integer. Consectetur lacus, volutpat malesuada libero.
                  Sollicitudin libero pharetra a.
                </p>
              </div>
            </div>
            <form>
              <h2>Rəy Bildir</h2>
              <div className={style.rateForm}>
                <div className={style.input}>
                  <label>Ad</label>
                  <input
                    type="text"
                    placeholder="Adınızı daxil edin"
                    required
                  />
                </div>
                <div className={style.input}>
                  <label>Soyad</label>
                  <input
                    type="text"
                    placeholder="Adınızı daxil edin"
                    required
                  />
                </div>
                <div className={style.input}>
                  <label>Rəy bildirdiyiniz məhsulu seçin</label>
                  <select>
                    <option>Məhsulu seçin</option>
                    <option>Məhsul</option>
                    <option>Məhsul</option>
                    <option>Məhsul</option>
                    <option>Məhsul</option>
                  </select>
                </div>
                <div className={style.input}>
                  <label>Rəyinizi yazın</label>
                  <textarea
                    placeholder="Rəyinizi buraya yazın"
                    rows={6}
                  ></textarea>
                </div>
                <button>Rəyini bildir</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
