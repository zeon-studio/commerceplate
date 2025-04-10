"use client";

import { CartItem } from "@/lib/shopify/types";
import { removeItem } from "@/lib/utils/cartActions";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { FaXmark } from "react-icons/fa6";
import LoadingDots from "../loadings/LoadingDots";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
        if (pending) e.preventDefault();
      }}
      aria-label="Remove cart item"
      aria-disabled={pending}
      className={`ease flex h-[17px] w-[17px] items-center justify-center rounded-full bg-neutral-500 transition-all duration-200 ${pending ? "cursor-not-allowed px-0" : ""
        }`}
    >
      {pending ? (
        <LoadingDots className="bg-white" />
      ) : (
        <FaXmark className="hover:text-accent-3 mx-[1px] h-4 w-4 text-white dark:text-black" />
      )}
    </button>
  );
}

export function DeleteItemButton({ item }: { item: CartItem }) {
  const [message, formAction] = useActionState(removeItem, null);
  const itemId = item.id;
  const actionWithVariant = formAction.bind(null, itemId);

  return (
    <form action={actionWithVariant}>
      <SubmitButton />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
