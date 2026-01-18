import { useState, useEffect } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ProductsTable from "./components/ProductsTable";
import apiClient from "../../api/axiosInstance";
import Button from "../../components/ui/button/Button";
import AddProductModal from "./components/AddProductModal";
import { toast } from "react-toastify";

export interface Category {
  id?: string;
  _id?: string;
  name: string;
  parent?: {
    name: string;
  };
}

export interface Product {
  id: string | number;
  name: string;
  price: string | number;
  category: {
    name: string;
  };
  stock: string | number;
  isActive: boolean;
  images?: string[];
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showAddProductModal, setShowAddProductModal] =
    useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getProductsList = async () => {
    setLoading(true);
    try {
      const resp = await apiClient.get("/products");

      setProducts(resp?.data?.data);
    } catch (error) {
      console.log("Error getting products list: ", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await apiClient.get("/product-categories");
      const data = response.data?.data || response.data || [];
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    }
  };
  const handleAddProduct = async (_data: any) => {
    const formData = new FormData();

    // Append text fields with fallbacks
    formData.append("name", _data.name || "");
    formData.append("description", _data.description || "");
    formData.append("price", _data.price || "0");
    formData.append("sku", _data.sku || "");
    formData.append("stock", _data.stock || "0");
    formData.append("categoryId", _data.categoryId || "");

    // Robust image handling: Only append if it's a non-empty array
    if (Array.isArray(_data.images) && _data.images.length > 0) {
      _data.images.forEach((image: File) => {
        formData.append("images", image);
      });
    }

    try {
      const response = await apiClient.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response?.status === 201 || response?.status === 200) {
        toast.success("Product added successfully");
        setShowAddProductModal(false);
        getProductsList();
      } else {
        toast.error("Failed to add product");
      }
    } catch (error: any) {
      console.error("Error adding product:", error);
      toast.error(
        error?.response?.data?.message || "An error occurred while adding product"
      );
    }
  };

  useEffect(() => {
    getProductsList();
    fetchCategories();
  }, []);

  return (
    <div>
      <PageMeta
        title="ABNovaMart Admin Dashboard"
        description="This is React.js Blank Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Products" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">

        <div className="flex items-center justify-end mb-8">
          <Button
            size="sm"
            onClick={() => {
              setShowAddProductModal(true);
            }}
          >
            Add Product
          </Button>
        </div>

        <ProductsTable data={products} loading={loading} />
      </div>

      <AddProductModal
        isOpen={showAddProductModal}
        closeModal={() => setShowAddProductModal(false)}
        onSubmit={handleAddProduct}
        categories={categories}
      />
    </div>
  );
}
