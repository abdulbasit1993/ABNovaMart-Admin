import { useState, useEffect } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import UsersTable from "./components/UsersTable";
import apiClient from "../../api/axiosInstance";
import AddProductModal from "../Products/components/AddProductModal";
import { toast } from "react-toastify";

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

export interface User {
  id: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  phone: string;
  isVerified: boolean;
  created_at: string;
  updated_at: string;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const getUserList = async () => {
    setLoading(true);
    try {
      const resp = await apiClient.get("/user");

      console.log("response data Users ===>>> ", resp);

      // Extract users from response
      const usersData = resp?.data?.users || [];

      console.log("usersData ===>>> ", usersData);

      // Map users data to User interface
      const mappedUsers = Array.isArray(usersData)
        ? usersData.map((user: any) => ({
            id: user._id,
            email: user.email,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            isVerified: user.isVerified,
            created_at: user.created_at,
            updated_at: user.updated_at,
          }))
        : [];

      setUsers(mappedUsers);
    } catch (error) {
      console.log("Error getting users list: ", error);
    } finally {
      setLoading(false);
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
        getUserList();
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

  const handleDeleteProduct = async (user: User) => {
    try {
      const response = await apiClient.delete(`/user/${user.id}`);

      if (response?.status === 200 || response?.status === 201) {
        toast.success("User deleted successfully");
        getUserList();
      } else {
        toast.error("Failed to delete user");
      }
    } catch (error: any) {
      console.error("Error deleting user:", error);
      toast.error(
        error?.response?.data?.message ||
          "An error occurred while deleting user",
      );
    }
  };

  const handleEditProduct = (user: User) => {
    console.log("Edit user:", user);
    // TODO: Implement edit functionality
  };

  useEffect(() => {
    getUserList();
  }, []);

  return (
    <div>
      <PageMeta
        title="ABNovaMart Admin Dashboard"
        description="This is React.js Blank Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Users" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        {/* <div className="flex items-center justify-end mb-8">
          <Button
            size="sm"
            onClick={() => {
              setShowAddProductModal(true);
            }}
          >
            Add Product
          </Button>
        </div> */}

        <UsersTable
          data={users}
          loading={loading}
          onDelete={handleDeleteProduct}
          onEdit={handleEditProduct}
        />
      </div>

      <AddProductModal
        isOpen={showAddProductModal}
        closeModal={() => setShowAddProductModal(false)}
        onSubmit={handleAddProduct}
        categories={[]}
      />
    </div>
  );
}
