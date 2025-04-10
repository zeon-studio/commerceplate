"use client";

import { CartItem } from "@/lib/shopify/types";
import { updateItemQuantity } from "@/lib/utils/cartActions";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { FaMinus, FaPlus } from "react-icons/fa6";
import LoadingDots from "../loadings/LoadingDots";

function SubmitButton({ type }: { type: "plus" | "minus" }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
        if (pending) e.preventDefault();
      }}
      aria-label={
        type === "plus" ? "Increase item quantity" : "Reduce item quantity"
      }
      aria-disabled={pending}
      className={`ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full px-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80 ${pending ? "cursor-not-allowed" : ""
        } ${type === "minus" ? "ml-auto" : ""}`}
    >
      {pending ? (
        <LoadingDots className="bg-black dark:bg-white" />
      ) : type === "plus" ? (
        <FaPlus className="h-4 w-4 dark:text-neutral-500" />
      ) : (
        <FaMinus className="h-4 w-4 dark:text-neutral-500" />
      )}
    </button>
  );
}

export function EditItemQuantityButton({
  item,
  type,
}: {
  item: CartItem;
  type: "plus" | "minus";
}) {
  const [message, formAction] = useActionState(updateItemQuantity, null);
  const payload = {
    lineId: item.id,
    variantId: item.merchandise.id,
    quantity: type === "plus" ? item.quantity + 1 : item.quantity - 1,
  };
  const actionWithVariant = formAction.bind(null, payload);

  return (
    <form action={actionWithVariant}>
      <SubmitButton type={type} />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
