import React from "react";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";

function ConfirmModal({ isOpen, onClose, onSubmit }: any) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[700px] m-4">
      <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Confirm Logout
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            Are you sure you want to log out?
          </p>
        </div>

        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
          <Button size="sm" onClick={onSubmit}>
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

export default ConfirmModal;
