import React, { useState, useEffect } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ProductsTable from "./components/ProductsTable";
import apiClient from "../../api/axiosInstance";

export default function Products() {
  const [products, setProducts] = useState([]);

  const getProductsList = async () => {
    try {
      const resp = await apiClient.get("/products");

      setProducts(resp?.data?.data);
    } catch (error) {
      console.log("Error getting products list: ", error);
    }
  };

  useEffect(() => {
    getProductsList();
  }, []);

  return (
    <div>
      <PageMeta
        title="ABNovaMart Admin Dashboard"
        description="This is React.js Blank Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Products" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        {/* <div className="mx-auto w-full max-w-[630px] text-center"> */}
        {/* <h3 className="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
            Card Title Here
          </h3> */}

        {/* <p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
            Start putting content on grids or panels, you can also use different
            combinations of grids.Please check out the dashboard and other pages
          </p> */}

        <ProductsTable data={products} />
        {/* </div> */}
      </div>
    </div>
  );
}
