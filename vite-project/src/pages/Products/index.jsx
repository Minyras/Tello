import { Link, useParams } from "react-router-dom";
import style from "./products.module.css";
import Filtering from "../../components/Filtering";
import Card from "../../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { getPageProducts } from "../../store/actions/productThunk";
import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import Loading from "../../components/Loading";

let PageSize = 9;

const Products = () => {
  const params = useParams();
  const [sortBy, setSortBy] = useState(null);
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [priceAbove, setPriceAbove] = useState(0);
  const [priceBelow, setPriceBelow] = useState(0);

  const { pageProducts } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  let sorting = sortBy?.split(".");
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(
      getPageProducts({
        sortBy: sorting != undefined ? sorting[0] : null,
        sortOrder: sorting?.length == 2 ? sorting[1] : null,
        category: params.category_slug,
        query: params.query,
      })
    );
  }, [sortBy, params]);

  let filteredProducts = pageProducts?.products?.filter((item) => {
    if (priceAbove != 0 && priceBelow != 0) {
      return item.price.raw > priceAbove && item.price.raw < priceBelow;
    } else if (priceAbove != 0 && priceBelow == 0) {
      return item.price.raw > priceAbove;
    } else if (priceAbove == 0 && priceBelow != 0) {
      return item.price.raw < priceBelow;
    }
    return item;
  });

  filteredProducts = filteredProducts
    ?.map((product) => {
      if (categories.length != 0) {
        for (let category of categories) {
          let res = false;
          product.categories.forEach((pCategory) => {
            if (pCategory.name == category) {
              res = true;
              return product;
            }
          });
          if (res) {
            return product;
          }
        }
      } else {
        return product;
      }
    })
    .filter(Boolean);
  filteredProducts = filteredProducts
    ?.map((product) => {
      if (colors.length != 0) {
        for (let color of colors) {
          let res = false;
          product.variant_groups
            .filter((variant) => variant.name === "Rəng")[0]
            .options.forEach((pColor) => {
              if (pColor.name == color) {
                res = true;
                return product;
              }
            });
          if (res) {
            return product;
          }
        }
      } else {
        return product;
      }
    })
    .filter(Boolean);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  const firstPageIndex = (currentPage - 1) * PageSize;
  const lastPageIndex = firstPageIndex + PageSize;

  const currentPageData = filteredProducts?.slice(
    firstPageIndex,
    lastPageIndex
  );

  if (
    pageProducts?.product?.status == "loading" ||
    pageProducts?.products?.length == 0
  ) {
    return <Loading />;
  }

  return (
    <div className={style.productsContainer}>
      <div className={style.breadCrumb}>
        <Link to={"/"}>Ana səhifə</Link>

        <img src="/next.svg" alt="In" />
        <Link to="/products">Məhsullar</Link>
        {params.category_slug && (
          <>
            <img src="/next.svg" alt="In" />
            <Link to={"/products/" + params.category_slug}>
              {params.category_slug.charAt(0).toUpperCase() +
                params.category_slug.slice(1)}
            </Link>
          </>
        )}
        {params.subcategory == undefined ? (
          ""
        ) : (
          <>
            <img src="/next.svg" alt="In" />
            <Link to={`/products/${params.category}/${params.subcategory}`}>
              {params.subcategory.charAt(0).toUpperCase() +
                params.subcategory.slice(1)}
            </Link>
          </>
        )}
      </div>
      <div className={style.filterProducts}>
        <Filtering
          setSortBy={setSortBy}
          setCategories={setCategories}
          setPriceAbove={setPriceAbove}
          setPriceBelow={setPriceBelow}
          setColors={setColors}
          count={filteredProducts?.length}
        />
        <div className={style.cards}>
          {pageProducts?.status == "fulfilled" ? (
            currentPageData?.map((product) => {
              return (
                <Card
                  key={product.id}
                  id={product.id}
                  price={product.price.formatted}
                  name={product.name}
                  image={product.image.url}
                />
              );
            })
          ) : (
            <>
              <Loading />
            </>
          )}
          <Pagination
            currentPage={currentPage}
            totalCount={
              filteredProducts?.length == undefined
                ? ""
                : filteredProducts?.length
            }
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
