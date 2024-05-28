import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import AppAds from "../src/Components/Home/AppAds/AppAds";
import Banner from "../src/Components/Home/Banner/Banner";
import Category from "../src/Components/Home/Category/Category";
import DownloadApp from "../src/Components/Home/DownloadApp/DownloadApp";
import NewsLetter from "../src/Components/Home/NewsLetter/NewsLetter";
import PopularProducts from "../src/Components/Home/PopularProducts/PopularProducts";
import ProductSection from "../src/Components/ProductSection/ProductSection";
import CustomButtonLoading from "../src/Shared/CustomButtonLoading";
import ScrollButtons from "../src/Shared/ScrollButton/ScrollButtons";
import server_url, { server_url_v3 } from "../lib/config";
import GoogleMap from "../src/Shared/GoogleMap";
import Magazine from "../src/Components/MagazineSection/Magazine";
import CreateContext from "../src/Components/CreateContex";
export async function getStaticProps() {
  const bannerRes = await fetch(`${server_url}/banner?status=active&sort=position`);
  const bannerData = await bannerRes.json();

  const categoryRes = await fetch(`${server_url}/category?status=true`);
  const categoryData = await categoryRes.json();

  const productsRes = await fetch(`${server_url}/product?status=true`);
  const productsData = await productsRes.json();

  const magazineRes = await fetch(`${server_url_v3}/custom?modelName=Blog`);
  const magazinesData = await magazineRes.json();

  const noticeRes = await fetch(`${server_url_v3}/custom?modelName=Notice`);
  const noticeData = await noticeRes.json();

  const FeaturedRes = await fetch(`${server_url}/product?status=true&category=Featured`);
  const FeaturedData = await FeaturedRes.json();

  return {
    props: {
      banners: bannerData,
      category: categoryData,
      products: productsData,
      magazines: magazinesData,
      notices: noticeData,
      Featured: FeaturedData
    },
    revalidate: 15, // Regenerate every 15 seconds
  };
}
export default function Home({ banners, category, products, magazines, Featured,notices }) {
  const [bannerData, setBannerData] = useState(banners);
  const { categoryData, setCategoryData,setnoticesData } = useContext(CreateContext)
  const [productsData, setProductsData] = useState(products);
  const [magazinesData, setmagazinesData] = useState(magazines);
  const [featuredData, setFeaturedData] = useState(Featured);
 
  const [discountedProducts, setDiscountedProducts] = useState([]);
  const [newArrivalProducts, setNewArrivalProducts] = useState([]);

  useEffect(() => {
    setCategoryData(category)
    }, [category]);

  useEffect(() => {
    setnoticesData(notices)
    }, [notices]);
    
  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch(`${server_url}/banner?status=active&sort=position`);
      const newData = await res.json();
      setBannerData(newData);
    }, 15000); // 15 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch(`${server_url}/category?status=true`);
      const newData = await res.json();
      setCategoryData(newData);
    }, 15000); // 15 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch(`${server_url}/product?status=true`);
      const newData = await res.json();
      setProductsData(newData);
    }, 15000); // 15 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch(`${server_url_v3}/custom?modelName=Blog`);
      const newData = await res.json();
      setmagazinesData(newData);
    }, 15000); // 15 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch(`${server_url_v3}/custom?modelName=Notice`);
      const newData = await res.json();
      setnoticesData(newData);
    }, 15000); // 15 seconds

    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch(`${server_url}/product?status=true&category=Featured`);
      const newData = await res.json();
      setFeaturedData(newData);
    }, 15000); // 15 seconds

    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    if (productsData && productsData.data) {
      const products = productsData.data.products;
      // Sorting by createdAt for newArrivals
      const newArrivals = [...products].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      setNewArrivalProducts(newArrivals);

      // Sorting by discount for discounted products
      const discounted = [...products].sort((a, b) => b.discount - a.discount);
      setDiscountedProducts(discounted);
    }
  }, [productsData]);
  return (
    <>
      <Head>
        <title>Pixels</title>
        <meta name="description" content="Best e-commerce website" />
        <link rel="icon" href="/favicon.ico" />

        {/* <script>
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'GTM-NZS2HHNK');
         `}
        </script> */}
      </Head>
      <Banner data={bannerData} catagories={categoryData} />
      <Category catagories={categoryData} />
      {/* <PopularProducts /> */}
      <ProductSection
        // query={"&sort=-createdAt&limit=10"}
        heading={"New Drops"}
        subtitle={
          ""
        }
        data={newArrivalProducts}
      // viewQuery={"sort=-createdAt"}
      />
      {/* <ProductSection
        query={"&sort=-saleCount&limit=10"}
        heading={"Best Sales"}
        subtitle={
          "Hottest Products of the Season: Check Out Our Best-Selling Collection"
        }
        viewQuery={"sort=-saleCount"}
      /> */}
      <div className="">
        <ProductSection
          // query={"&sort=-discount&limit=10"}
          heading={"Bestselling"}
          subtitle={""}
          // viewQuery={"sort=-discount"}
          data={discountedProducts}
        />
      </div>
      <div className="">
        <ProductSection
          // query={"&sort=-discount&limit=10"}
          heading={"Featured"}
          subtitle={""}
          // viewQuery={"sort=-discount"}
          data={featuredData?.data?.products}
        />
      </div>
      {/* <div className="block md:hidden">
          <Category />
        </div> */}
      {/* <NewsLetter /> */}
      {/* <AppAds /> */}
      <Magazine data={magazinesData} />
      <GoogleMap />
      {/* <ScrollButtons /> */}

    </>
  );
}
