interface PopupProps {
  isOpen: boolean;
  title: string;
  description: string;
  onClose: () => void;
  onConfirm: () => void;
  isPending: boolean;
}

const Popup = ({ isOpen, title, description, onClose, onConfirm, isPending }: PopupProps) => {
  return (
    <>
      {isOpen && (
        <div className='popup-container'>
          <div className="popup-box bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto flex flex-col items-center">
            <h5 className="text-xl font-semibold mb-2">{title}</h5>
            <div className="text-gray-700 mb-4 text-center">{description}</div>
            <div className="flex gap-3">
              <button
                className="px-4 py-2 rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 transition"
                onClick={onClose}
                disabled={isPending}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
                onClick={onConfirm}
                disabled={isPending}
              >
                {isPending ? 'Processing...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
