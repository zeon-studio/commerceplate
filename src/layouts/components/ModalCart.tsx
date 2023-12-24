"use client";

import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";

interface ModalFilterProps {
  isVisible: boolean;
  onClose: () => void;
}

const ModalCart: React.FC<ModalFilterProps> = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      e.target &&
      e.target instanceof HTMLDivElement &&
      e.target.id === "wrapper"
    ) {
      onClose();
    }
  };

  return (
    <>
      <div className="modalCart" id="wrapper" onClick={handleClose}>
        <div className="modalCart-header">
          <p className="text-dark dark:text-darkmode-dark text-2xl font-medium">
            Your Cart
          </p>
          <button className="modalCart-close" onClick={() => onClose()}>
            X
          </button>
        </div>

        <div className="modalCart-content">
          <div className="flex flex-col justify-center items-center space-y-6">
            <div>
              <FaShoppingCart size={76} />
            </div>
            <p>Your shopping bag is empty</p>
            <Link href={"/product"} className="btn btn-primary w-full">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalCart;
