import { useState, useEffect } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import apiClient from "../../api/axiosInstance";
import Button from "../../components/ui/button/Button";
import AddProductCategoryModal from "./components/AddProductCategoryModal";
import ProductCategoryTable from "./components/ProductCategoryTable";
import EditProductCategoryModal from "./components/EditProductCategoryModal";
import ProductCategoryDetailModal from "./components/ProductCategoryDetailModal";
import { toast } from "react-toastify";

interface Category {
  id: string;
  name: string;
  slug: string;
  parent: { name: string } | null;
  created_at: string;
}

interface CategoryFormData {
  name: string;
  slug: string;
  isSubcategory: boolean;
  parentCategory: string | null;
}

export default function ProductCategories() {
  const [productCategories, setProductCategories] = useState<Category[]>([]);
  const [showAddProductCategoryModal, setShowAddProductCategoryModal] =
    useState(false);
  const [showEditProductCategoryModal, setShowEditProductCategoryModal] =
    useState(false);
   const [showProductCategoryDetailModal, setShowProductCategoryDetailModal] =
    useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [detailCategory, setDetailCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get("/product-categories");
      const data = response.data?.data || response.data || [];
      setProductCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setProductCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProductCategory = async (data: CategoryFormData) => {
    if (!data.name || !data.slug) {
      toast.error("Please fill all the required fields");
      return;
    }

    try {
      const payload: any = {
        name: data.name,
        slug: data.slug,
      };

      if (data.isSubcategory && data.parentCategory) {
        payload.parentId = data.parentCategory;
      }

      const response = await apiClient.post("/product-categories/add", payload);

      if (response?.data?.success) {
        toast.success(
          response?.data?.message || "Category added successfully."
        );
        setShowAddProductCategoryModal(false);
        fetchCategories();
      } else {
        toast.error(response?.data?.message || "Failed to add category.");
      }
    } catch (error: any) {
      console.error("Error adding product category:", error);
      toast.error(
        error?.response?.data?.message ||
        "An error occurred while adding the category."
      );
    }
  };

  const handleUpdateProductCategory = async (data: CategoryFormData) => {
    try {
      const payload: any = {
        name: data.name,
        slug: data.slug,
      }

      if (data.isSubcategory && data.parentCategory) {
        payload.parentId = data.parentCategory;
      }

      const response = await apiClient.put(
        `/product-categories/${editingCategory?.id}`,
        payload
      );

      if (response?.data?.success) {
        toast.success(
          response?.data?.message || "Category updated successfully."
        );
        setShowEditProductCategoryModal(false);
        fetchCategories();
      } else {
        toast.error(response?.data?.message || "Failed to update category.");
      }
    } catch (error: any) {

      console.error("Error updating product category:", error);
      toast.error(
        error?.response?.data?.message ||
        "An error occurred while updating the category."
      );
    }
  }

  const handleShowEditProductCategoryModal = (category: Category) => {
    setEditingCategory(category);
    setShowEditProductCategoryModal(true);
  }

  const handleShowProductCategoryDetailModal = (category: Category) => {
    setDetailCategory(category);
    setShowProductCategoryDetailModal(true);
  }

  const handleDelete = async (category: Category) => {
    try {
      const response = await apiClient.delete(
        `/product-categories/${category?.id}`
      );

      console.log("response data delete category ===>>> ", response.data);

      if (response?.data?.success) {
        toast.success(
          response?.data?.message || "Category deleted successfully."
        );
        fetchCategories();
      } else {
        toast.error(response?.data?.message || "Failed to delete category.");
      }
    } catch (error: any) {
      console.error("Error deleting product category:", error);
      toast.error(
        error?.response?.data?.message ||
        "An error occurred while deleting the category."
      );
    }
  };

  useEffect(() => {
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

        <ProductCategoryTable
          data={productCategories}
          onDelete={handleDelete}
          onEdit={handleShowEditProductCategoryModal}
          onViewDetail={handleShowProductCategoryDetailModal}
          loading={loading}
        />
      </div>

      <AddProductCategoryModal
        isOpen={showAddProductCategoryModal}
        closeModal={() => setShowAddProductCategoryModal(false)}
        onSubmit={handleAddProductCategory}
        categories={productCategories}
      />

      <EditProductCategoryModal
        isOpen={showEditProductCategoryModal}
        closeModal={() => setShowEditProductCategoryModal(false)}
        onSubmit={handleUpdateProductCategory}
        categories={productCategories}
        data={editingCategory}
      />

      <ProductCategoryDetailModal
        isOpen={showProductCategoryDetailModal}
        onClose={() => setShowProductCategoryDetailModal(false)}
        data={detailCategory}
      />
    </div>
  );
}
