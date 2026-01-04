import React, { useState } from "react";
import { Modal } from "../../../components/ui/modal";
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import TextArea from "../../../components/form/input/TextArea";
import Button from "../../../components/ui/button/Button";
import Select from "../../../components/form/Select";
import { Category } from "..";
import { toast } from "react-toastify";

interface AddProductModalProps {
  isOpen: boolean;
  closeModal: () => void;
  onSubmit: (data: any) => void;
  categories: Category[];
}

function AddProductModal({
  isOpen,
  closeModal,
  onSubmit,
  categories,
}: AddProductModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [sku, setSku] = useState("");
  const [stock, setStock] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [images, setImages] = useState<File[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !price || !parentCategoryId || images.length === 0) {
      toast.error("Please fill all required fields and select at least one image");
      return;
    }

    onSubmit({
      name,
      description,
      price,
      sku,
      stock,
      categoryId: parentCategoryId,
      images,
    });
    setName("");
    setDescription("");
    setPrice("");
    setSku("");
    setStock("");
    setParentCategoryId("");
    setImages([]);
    closeModal();
  };

  const categoryOptions = Array.isArray(categories)
    ? categories.map((cat: Category) => ({
      value: cat.id || cat._id || "",
      label: cat.parent ? `${cat.parent.name} > ${cat.name}` : cat.name,
    }))
    : [];

  return (
    <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
      <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Add Product
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            Add a new product using the form below
          </p>
        </div>
        <form className="flex flex-col" onSubmit={handleAdd}>
          <div className="custom-scrollbar h-[350px] overflow-y-auto px-2 pb-3">
            <div className="mt-7">
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div className="col-span-2">
                  <Label>Name <span className="text-red-500">*</span></Label>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter product name"
                  />
                </div>

                <div className="col-span-2">
                  <Label>Description</Label>
                  <TextArea
                    value={description}
                    rows={5}
                    onChange={setDescription}
                    placeholder="Enter product description"
                  />
                </div>

                <div className="col-span-2">
                  <Label>Price <span className="text-red-500">*</span></Label>
                  <Input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Enter product price"
                  />
                </div>

                <div className="col-span-2">
                  <Label>SKU</Label>
                  <Input
                    type="text"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    placeholder="Enter product sku"
                  />
                </div>

                <div className="col-span-2">
                  <Label>Stock</Label>
                  <Input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    placeholder="Enter product stock quantity"
                  />
                </div>

                <div className="col-span-2">
                  <Label>Product Images <span className="text-red-500">*</span></Label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => setImages(Array.from(e.target.files || []))}
                    className="w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs focus:outline-hidden focus:ring-3 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
                  />
                  {images.length > 0 && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{images.length} file(s) selected</p>}
                </div>

                <div className="col-span-2">
                  <Label>Select Product Category <span className="text-red-500">*</span></Label>
                  <Select
                    options={categoryOptions}
                    placeholder="Select Product Category"
                    onChange={setParentCategoryId}
                  />
                </div>

              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <Button
              size="sm"
              className="w-full"
              variant="primary"
              type="submit"
            >
              Add Product
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default AddProductModal;

