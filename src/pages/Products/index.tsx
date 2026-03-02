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
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getProductsList = async () => {
    setLoading(true);
    try {
      const resp = await apiClient.get("/products");

      // Extract products from response.data.data.data
      const productsData = resp?.data?.data || [];

      // Map products to include category name
      const mappedProducts = Array.isArray(productsData)
        ? productsData.map((product: any) => ({
            id: product._id,
            name: product.name,
            price: product.price?.$numberDecimal || product.price,
            category: { name: "Category" }, // Placeholder - backend doesn't return category name
            stock: product.stock,
            isActive: product.isActive,
            images: product.images,
          }))
        : [];

      setProducts(mappedProducts);
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

      // Extract categories from response.data.data.categories
      const categories = data?.categories || data || [];

      // Map _id to id for consistency with the component
      const mappedCategories = Array.isArray(categories)
        ? categories.map((cat: any) => ({
            id: cat._id,
            name: cat.name,
            slug: cat.slug,
            parent: cat.parent || null,
            created_at: cat.created_at,
            updated_at: cat.updated_at,
          }))
        : [];

      setCategories(mappedCategories);
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
      const response = await apiClient.post("/products/add", formData, {
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
        error?.response?.data?.message ||
          "An error occurred while adding product",
      );
    }
  };

  const handleDeleteProduct = async (product: Product) => {
    try {
      const response = await apiClient.delete(`/products/${product.id}`);

      if (response?.status === 200 || response?.status === 201) {
        toast.success("Product deleted successfully");
        getProductsList();
      } else {
        toast.error("Failed to delete product");
      }
    } catch (error: any) {
      console.error("Error deleting product:", error);
      toast.error(
        error?.response?.data?.message ||
          "An error occurred while deleting product",
      );
    }
  };

  const handleEditProduct = (product: Product) => {
    console.log("Edit product:", product);
    // TODO: Implement edit functionality
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

        <ProductsTable
          data={products}
          loading={loading}
          onDelete={handleDeleteProduct}
          onEdit={handleEditProduct}
        />
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
