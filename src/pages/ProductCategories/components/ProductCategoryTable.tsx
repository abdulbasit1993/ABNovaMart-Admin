import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import Badge from "../../../components/ui/badge/Badge";
import moment from "moment";
import { Eye, Trash2, SquarePen } from "lucide-react";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

export default function ProductCategoryTable(props) {
  const { data, onDelete } = props;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  console.log("data (ProductCategoryTable) ===>> ", data);

  const openDeleteModal = (category) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedCategory(null);
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (selectedCategory && onDelete) {
      onDelete(selectedCategory);
    }
    closeDeleteModal();
  };

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
                Name
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Slug
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Sub Category
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Created At
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
            {data?.map((cat, index) => (
              <TableRow key={cat.id}>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {cat.name}
                </TableCell>

                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {cat.slug}
                </TableCell>

                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {cat.parent !== null ? cat.parent.name : "-"}
                </TableCell>

                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {moment(cat.created_at).format("DD-MM-YYYY hh:mm a")}
                </TableCell>

                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <div className="flex space-x-3 flex-row">
                    {/* View Button */}
                    <div className="relative flex flex-col items-center group">
                      <button className="p-1">
                        <Eye className="hover:text-gray-900 dark:hover:text-white" />
                      </button>
                      <div className="absolute top-full mt-2 hidden group-hover:flex flex-col items-center z-50">
                        <div className="w-3 h-3 -mb-2 rotate-45 bg-gray-800"></div>
                        <span className="relative p-2 text-xs leading-none text-white whitespace-no-wrap bg-gray-800 shadow-lg rounded-md">
                          View Details
                        </span>
                      </div>
                    </div>

                    {/* Edit Button */}
                    <div className="relative flex flex-col items-center group">
                      <button className="p-1">
                        <SquarePen className="hover:text-gray-900 dark:hover:text-white" />
                      </button>
                      <div className="absolute top-full mt-2 hidden group-hover:flex flex-col items-center z-50">
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
                          openDeleteModal(cat);
                        }}
                      >
                        <Trash2 className="hover:text-gray-900 dark:hover:text-white" />
                      </button>
                      <div className="absolute top-full mt-2 hidden group-hover:flex flex-col items-center z-50">
                        <div className="w-3 h-3 -mb-2 rotate-45 bg-gray-800"></div>
                        <span className="relative p-2 text-xs leading-none text-white whitespace-no-wrap bg-gray-800 shadow-lg rounded-md">
                          Delete
                        </span>
                      </div>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
