import React, { useState, useEffect } from "react";
import { Modal } from "../../../components/ui/modal";
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import Button from "../../../components/ui/button/Button";
import Checkbox from "../../../components/form/input/Checkbox";
import Select from "../../../components/form/Select";

function EditProductCategoryModal({
  isOpen,
  closeModal,
  onSubmit,
  categories,
  data,
}: any) {
  const [name, setName] = useState(data?.name || "");
  const [slug, setSlug] = useState(data?.slug || "");
  const [isSubcategory, setIsSubcategory] = useState(data?.parent ? true : false);
  const [parentCategoryId, setParentCategoryId] = useState(data?.parent?.id || data?.parent?._id || "");

  console.log("data (EditProductCategoryModal) ===>> ", data);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      slug,
      isSubcategory,
      parentCategory: isSubcategory ? parentCategoryId : null,
    });
    closeModal();
  };

  const categoryOptions = Array.isArray(categories)
    ? categories.map((cat: any) => ({
      value: cat.id || cat._id,
      label: cat.parent ? `${cat.parent.name} > ${cat.name}` : cat.name,
    }))
    : [];

  useEffect(() => {
    if (data) {
      setName(data.name || "");
      setSlug(data.slug || "");
      setIsSubcategory(data.parent ? true : false);
      setParentCategoryId(data.parent?.id || data.parent?._id || "");
    }
  }, [data]);

  return (
    <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
      <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Edit Product Category
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            Edit product category using the form below
          </p>
        </div>
        <form className="flex flex-col" onSubmit={handleUpdate}>
          <div className="custom-scrollbar h-[350px] overflow-y-auto px-2 pb-3">
            <div className="mt-7">
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div className="col-span-2">
                  <Label>Name</Label>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter category name"
                  />
                </div>

                <div className="col-span-2">
                  <Label>Slug</Label>
                  <Input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="enter-category-slug"
                  />
                </div>

                <div className="col-span-2 mt-2">
                  <Checkbox
                    checked={isSubcategory}
                    onChange={setIsSubcategory}
                    label="Is Subcategory?"
                  />
                </div>

                {isSubcategory && (
                  <div className="col-span-2">
                    <Label>Parent Category</Label>
                    <Select
                      options={categoryOptions}
                      placeholder="Select Parent Category"
                      value={parentCategoryId}
                      onChange={setParentCategoryId}
                    />
                  </div>
                )}
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
              Submit
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default EditProductCategoryModal;

