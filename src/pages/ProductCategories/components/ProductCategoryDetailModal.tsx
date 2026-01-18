import { Modal } from "../../../components/ui/modal";

function ProductCategoryDetailModal({ isOpen, onClose, data }: any) {

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-[700px] m-4">
            <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <div className="px-2 pr-14">
                    <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                        Product Category Details
                    </h4>
                    
                    <div className="!mt-11 mb-4 flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-500 dark:text-gray-400">Name:</span>
                            <span className="font-medium text-gray-800 dark:text-white">{data?.name}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-500 dark:text-gray-400">Slug:</span>
                            <span className="font-medium text-gray-800 dark:text-white">{data?.slug}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-500 dark:text-gray-400">Parent Category:</span>
                            <span className="font-medium text-gray-800 dark:text-white">{data?.parent?.name || "None"}</span>
                        </div>
                        {data?.parent && (
                            <div className="flex items-center justify-between">
                                <span className="text-gray-500 dark:text-gray-400">Parent Slug:</span>
                                <span className="font-medium text-gray-800 dark:text-white">{data?.parent?.slug}</span>
                            </div>
                        )}
                        <div className="flex items-center justify-between">
                            <span className="text-gray-500 dark:text-gray-400">ID:</span>
                            <span className="font-medium text-gray-800 dark:text-white">{data?.id}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-500 dark:text-gray-400">Created At:</span>
                            <span className="font-medium text-gray-800 dark:text-white">{new Date(data?.created_at).toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-500 dark:text-gray-400">Updated At:</span>
                            <span className="font-medium text-gray-800 dark:text-white">{new Date(data?.updated_at).toLocaleString()}</span>
                        </div>
                    </div>

                    {data?.children && data.children.length > 0 && (
                        <div className="mt-6 mb-4">
                            <h5 className="mb-3 text-lg font-semibold text-gray-800 dark:text-white/90">Child Categories:</h5>
                            <div className="flex flex-col gap-2">
                                {data.children.map((child: any) => (
                                    <div key={child.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <div className="flex flex-col">
                                            <span className="font-medium text-gray-800 dark:text-white">{child.name}</span>
                                            <span className="text-sm text-gray-500 dark:text-gray-400">{child.slug}</span>
                                        </div>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">{child.id}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

               
            </div>
        </Modal>
    );
}

export default ProductCategoryDetailModal;
