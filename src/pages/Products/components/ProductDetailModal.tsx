import { Modal } from "../../../components/ui/modal";
import Button from "../../../components/ui/button/Button";
import { Product } from "..";

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

function ProductDetailModal({
  isOpen,
  onClose,
  product,
}: ProductDetailModalProps) {
  if (!product) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[700px] m-4">
      <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
        <div className="pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Product Details
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            View all product information
          </p>
        </div>

        {/* Product Images */}
        <div className="mb-6">
          <h5 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
            Images
          </h5>
          <div className="flex flex-wrap gap-3">
            {product.images && product.images.length > 0 ? (
              product.images.map((image, index) => (
                <div
                  key={index}
                  className="w-40 h-40 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <img
                    src={image}
                    alt={`${product.name} - Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))
            ) : (
              <div className="w-40 h-40 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                <span className="text-xs text-gray-500">No image</span>
              </div>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Name
              </p>
              <p className="mt-1 text-sm text-gray-800 dark:text-white/90">
                {product.name}
              </p>
            </div>
            <div className="col-span-1">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Price
              </p>
              <p className="mt-1 text-sm text-gray-800 dark:text-white/90">
                ${product.price}
              </p>
            </div>
            <div className="col-span-1">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Stock
              </p>
              <p className="mt-1 text-sm text-gray-800 dark:text-white/90">
                {product.stock}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Category
              </p>
              <p className="mt-1 text-sm text-gray-800 dark:text-white/90">
                {product.category?.name || "N/A"}
              </p>
            </div>
            <div className="col-span-1">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Status
              </p>
              <p className="mt-1 text-sm">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    product.isActive
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                  }`}
                >
                  {product.isActive ? "Active" : "Inactive"}
                </span>
              </p>
            </div>
            <div className="col-span-1">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                ID
              </p>
              <p className="mt-1 text-xs text-gray-800 dark:text-white/90 break-all">
                {product.id}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 px-2 mt-8 lg:justify-end">
          <Button size="sm" variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default ProductDetailModal;
