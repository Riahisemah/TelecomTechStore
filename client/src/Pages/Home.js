import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import * as productAction from '../Actions/productAction';
import Product from '../Components/Product/Product';
import Filter from '../Components/Filter/Filter';
import ErrorMessage from '../Components/Message/errorMessage';
import HomeLoader from '../Components/Loader/HomeLoader';
import Meta from '../Components/Meta/Meta';
import * as routes from '../Constants/routes';

const Home = () => {
  const [sort, setSort] = useState([]);
  const [priceRange, setPriceRange] = useState('');
  const [ltORgt, setLtORgt] = useState('');
  const [filters, setFilters] = useState({});

  const [initialLoading, setInitialLoading] = useState(true);

  const productList = useSelector((state) => state.productList);

  const { loading, products, count, error, success } = productList;

  const queryParams = new URLSearchParams(window.location.search);
  const searchProductKey = queryParams.get('search') ? queryParams.get('search').trim() : '';

  const dispatch = useDispatch();

  const handleFilters = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  useEffect(() => {
    if (success && initialLoading) {
      setInitialLoading(false);
    } else {
      fetchProductList();
    }
    // eslint-disable-next-line
  }, [dispatch, filters, success]);

  useEffect(() => {
    handleFilters('keyWord', searchProductKey);
    // eslint-disable-next-line
  }, [searchProductKey]);

  useEffect(() => {
    handleFilters('sort', sort.join(','));
    // eslint-disable-next-line
  }, [sort]);

  const fetchProductList = () => {
    dispatch(
      productAction.productList(
        {
          ...filters,
        },
        initialLoading
      )
    );
  };

  const handleSort = (value) => {
    sort.includes(value) ? setSort(sort.filter((s) => s !== value)) : setSort((preState) => [...preState, value]);
  };

  const handlePriceRange = () => {
    if ([priceRange, ltORgt].includes('')) {
      return;
    }
    filterPrevPrice();
    handleFilters(`price[${ltORgt}]`, priceRange);
  };

  const filterPrevPrice = () => {
    const filterprice = Object.keys(filters).filter((price) => ['price[lt]', 'price[gte]'].includes(price));
    filterprice.forEach((price) => {
      if (filters[price]) {
        delete filters[price];
      }
    });
  };

  return (
    <>
      <Meta />
      {loading ? (
        <HomeLoader />
      ) : error ? (
        <ErrorMessage header="Something went wrong" message={error} />
      ) : (
        <>
          {searchProductKey ? (
            <>
              <Link to={routes.HOME} className="btn btn-light">
                Retourner{' '}
              </Link>
              <h1>
                Rechercher un produit pour {searchProductKey}({count})
              </h1>
            </>
          ) : (
            <div className="clearfix">
              <span className="float-left">
                <h1>Dernier produit ({count})</h1>
              </span>
              <span className="float-right">
                {' '}
                <Filter
                  sort={sort}
                  handleSort={handleSort}
                  setPriceRange={setPriceRange}
                  setLtORgt={setLtORgt}
                  ltORgt={ltORgt}
                  handlePriceRange={handlePriceRange}
                  handleFilters={handleFilters}
                  filters={filters}
                />
              </span>
            </div>
          )}
          {!products.length && <h4>Aucune Produit</h4>}
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};
export default Home;
