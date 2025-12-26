import React, { useState, useEffect } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";
// import ProductsTable from "./components/ProductsTable";
import apiClient from "../../api/axiosInstance";
import Button from "../../components/ui/button/Button";
import AddProductCategoryModal from "./components/AddProductCategoryModal";
import ProductCategoryTable from "./components/ProductCategoryTable";

export default function ProductCategories() {
  const [productCategories, setProductCategories] = useState([]);
  const [showAddProductCategoryModal, setShowAddProductCategoryModal] =
    useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiClient.get("/product-categories");
        // Handle the case where the data might be nested in response.data.data
        const data = response.data?.data || response.data || [];
        setProductCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setProductCategories([]);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div>
      <PageMeta
        title="ABNovaMart Admin Dashboard"
        description="This is React.js Dashboard page for ABNovaMart ecommerce web application."
      />
      <PageBreadcrumb pageTitle="Product Categories" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        {/* <div className="mx-auto w-full max-w-[630px] text-center"> */}
        {/* <h3 className="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
            Card Title Here
          </h3> */}

        {/* <p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
            Start putting content on grids or panels, you can also use different
            combinations of grids.Please check out the dashboard and other pages
          </p> */}

        {/* <ProductsTable data={products} /> */}
        {/* </div> */}

        <div className="flex items-center justify-end mb-8">
          <Button
            size="sm"
            onClick={() => {
              setShowAddProductCategoryModal(true);
            }}
          >
            Add Product Category
          </Button>
        </div>

        <ProductCategoryTable data={productCategories} />
      </div>

      <AddProductCategoryModal
        isOpen={showAddProductCategoryModal}
        closeModal={() => setShowAddProductCategoryModal(false)}
        onSubmit={(data) => {
          console.log("add product category data ===>> ", data);
        }}
      />
    </div>
  );
}
