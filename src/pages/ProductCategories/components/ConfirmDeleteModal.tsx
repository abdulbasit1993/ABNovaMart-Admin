import { Modal } from "../../../components/ui/modal";
import Button from "../../../components/ui/button/Button";

function ConfirmDeleteModal({ isOpen, onClose, onConfirm }: any) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-[700px] m-4">
            <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <div className="px-2 pr-14">
                    <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                        Confirm Delete
                    </h4>
                    <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                        Are you sure you want to delete this category?
                    </p>
                </div>

                <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                    <Button size="sm" onClick={onConfirm}>
                        Yes
                    </Button>
                    <Button size="sm" variant="outline" onClick={onClose}>
                        No
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

export default ConfirmDeleteModal;
