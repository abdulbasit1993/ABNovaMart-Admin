import { Eye, SquarePen, Trash2 } from "lucide-react";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import Badge from "../../../components/ui/badge/Badge";
import { User } from "..";
import Loader from "../../../components/ui/loader";
import ConfirmDeleteModal from "../../ProductCategories/components/ConfirmDeleteModal";
import UserDetailModal from "./UserDetailModal";

interface UsersTableProps {
  data: User[];
  onDelete: (user: User) => void;
  onEdit?: (user: User) => void;
  loading?: boolean;
}

export default function UsersTable(props: UsersTableProps) {
  const { data, onDelete, onEdit, loading = false } = props;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<User | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  console.log("UsersTable data: ", data);

  const openDeleteModal = (user: User) => {
    setSelectedProduct(user);
    setIsDeleteModalOpen(true);
  };

  const openDetailModal = (user: User) => {
    setSelectedUser(user);
    setIsDetailModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedProduct(null);
    setIsDeleteModalOpen(false);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (selectedProduct && onDelete) {
      onDelete(selectedProduct);
    }
    closeDeleteModal();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader />
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                First Name
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Last Name
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Email
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Phone
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Role
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {data?.map((user) => {
              const { firstName, lastName, email, phone, role, isVerified } =
                user;

              return (
                <TableRow key={user.id}>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {firstName}
                  </TableCell>

                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {lastName}
                  </TableCell>

                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {email}
                  </TableCell>

                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {phone}
                  </TableCell>

                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {role}
                  </TableCell>

                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge size="sm" color={isVerified ? "success" : "warning"}>
                      {isVerified ? "Verified" : "Not Verified"}
                    </Badge>
                  </TableCell>

                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 overflow-visible">
                    <div className="flex space-x-3 flex-row">
                      {/* View Button */}
                      <div className="relative flex flex-col items-center group">
                        <button
                          className="p-1"
                          onClick={() => {
                            openDetailModal(user);
                          }}
                        >
                          <Eye className="hover:text-gray-900 dark:hover:text-white" />
                        </button>
                        <div className="fixed hidden group-hover:flex flex-col items-center z-50 mt-8">
                          <div className="w-3 h-3 -mb-2 rotate-45 bg-gray-800"></div>
                          <span className="relative p-2 text-xs leading-none text-white whitespace-no-wrap bg-gray-800 shadow-lg rounded-md">
                            View Details
                          </span>
                        </div>
                      </div>

                      {/* Edit Button */}
                      <div className="relative flex flex-col items-center group">
                        <button
                          className="p-1"
                          onClick={() => {
                            if (onEdit) {
                              onEdit(user);
                            }
                          }}
                        >
                          <SquarePen className="hover:text-gray-900 dark:hover:text-white" />
                        </button>
                        <div className="fixed hidden group-hover:flex flex-col items-center z-50 mt-8">
                          <div className="w-3 h-3 -mb-2 rotate-45 bg-gray-800"></div>
                          <span className="relative p-2 text-xs leading-none text-white whitespace-no-wrap bg-gray-800 shadow-lg rounded-md">
                            Edit
                          </span>
                        </div>
                      </div>

                      {/* Delete Button */}
                      <div className="relative flex flex-col items-center group">
                        <button
                          className="p-1"
                          onClick={() => {
                            openDeleteModal(user);
                          }}
                        >
                          <Trash2 className="hover:text-gray-900 dark:hover:text-white" />
                        </button>
                        <div className="fixed hidden group-hover:flex flex-col items-center z-50 mt-8">
                          <div className="w-3 h-3 -mb-2 rotate-45 bg-gray-800"></div>
                          <span className="relative p-2 text-xs leading-none text-white whitespace-no-wrap bg-gray-800 shadow-lg rounded-md">
                            Delete
                          </span>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
            {/* {tableData.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 overflow-hidden rounded-full">
                      <img
                        width={40}
                        height={40}
                        src={order.user.image}
                        alt={order.user.name}
                      />
                    </div>
                    <div>
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {order.user.name}
                      </span>
                      <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                        {order.user.role}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {order.projectName}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <div className="flex -space-x-2">
                    {order.team.images.map((teamImage, index) => (
                      <div
                        key={index}
                        className="w-6 h-6 overflow-hidden border-2 border-white rounded-full dark:border-gray-900"
                      >
                        <img
                          width={24}
                          height={24}
                          src={teamImage}
                          alt={`Team member ${index + 1}`}
                          className="w-full size-6"
                        />
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      order.status === "Active"
                        ? "success"
                        : order.status === "Pending"
                        ? "warning"
                        : "error"
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {order.budget}
                </TableCell>
              </TableRow>
            ))} */}
          </TableBody>
        </Table>
      </div>

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Confirm Delete"
        message="Are you sure you want to delete this user?"
      />

      <UserDetailModal
        isOpen={isDetailModalOpen}
        onClose={closeDetailModal}
        user={selectedUser}
      />
    </div>
  );
}
