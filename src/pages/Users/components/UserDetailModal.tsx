import { Modal } from "../../../components/ui/modal";
import Button from "../../../components/ui/button/Button";
import moment from "moment";

interface UserDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
}

function UserDetailModal({ isOpen, onClose, user }: UserDetailModalProps) {
  if (!user) return null;

  console.log("user data ==>> ", user);

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[700px] m-4">
      <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
        <div className="pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            User Details
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            View all user information
          </p>
        </div>

        {/* User Details */}
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                First Name
              </p>
              <p className="mt-1 text-sm text-gray-800 dark:text-white/90">
                {user?.firstName}
              </p>
            </div>
            <div className="col-span-1">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Last Name
              </p>
              <p className="mt-1 text-sm text-gray-800 dark:text-white/90">
                {user?.lastName}
              </p>
            </div>
            <div className="col-span-1">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Status
              </p>
              <p className="mt-1 text-sm">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    user.isVerified
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                  }`}
                >
                  {user.isVerified ? "Verified" : "Not Verified"}
                </span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Created At
              </p>
              <p className="mt-1 text-xs text-gray-800 dark:text-white/90 break-all">
                {moment(user?.created_at).format("DD-MM-YYYY hh:mm a")}
              </p>
            </div>
            <div className="col-span-1">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Updated At
              </p>
              <p className="mt-1 text-xs text-gray-800 dark:text-white/90 break-all">
                {moment(user?.updated_at).format("DD-MM-YYYY hh:mm a")}
              </p>
            </div>
            <div className="col-span-1">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                ID
              </p>
              <p className="mt-1 text-xs text-gray-800 dark:text-white/90 break-all">
                {user.id}
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

export default UserDetailModal;
