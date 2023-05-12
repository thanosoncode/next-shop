"use client";

import Image from "next/image";
import { useAppDispatch, useAppState } from "../context";
import Container from "../components/Container";
import Link from "next/link";

const Cart = () => {
  const { cartItems } = useAppState();
  const appDispatch = useAppDispatch();

  const total = cartItems.reduce((total, item) => total + item.price, 0);

  const handleRemoveItem = (id: string) =>
    appDispatch({ type: "REMOVE_ITEM", id });

  const handleSaveForLater = () => {};

  return (
    <Container classes="lg:px-8 lg:w-full xl:max-w-[1400px] md:w-full md:px-8 w-full px-2">
      <div className="sm:2/5 mx-auto lg:w-3/4">
        {cartItems.length > 0 ? (
          <h4 className="pt-8 pb-10 text-3xl font-thin">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in
            your cart.
          </h4>
        ) : (
          <h4 className="py-8 text-3xl font-thin">
            No items in your cart yet.
          </h4>
        )}
        {cartItems.length > 0 ? (
          <div className="flex flex-col items-center justify-between sm:flex-row sm:items-start">
            <div className="flex flex-col gap-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-2 rounded-xl border border-neutral-300 p-3 shadow-xl"
                >
                  <div className="relative h-32 w-40 overflow-hidden rounded-xl">
                    <Image
                      src={item.images[0]}
                      alt={item.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div>
                    <div className="mb-4 pl-2.5 font-medium">
                      <Link href={`/products/${item.id}`}>{item.name}</Link>
                    </div>
                    <div className="mb-4 pl-2.5">€ {item.price}.00</div>
                    <div className="flex gap-4">
                      <button
                        onClick={handleSaveForLater}
                        className="block rounded-full bg-white px-2.5 py-1 text-sm  duration-200 ease-in-out hover:bg-neutral-100"
                      >
                        Save it for later
                      </button>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="block rounded-full bg-white px-2.5 py-1 text-sm  duration-200 ease-in-out hover:bg-neutral-100"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-16 flex w-1/2 flex-col items-center sm:mt-0 sm:w-fit">
              <div className="flex w-full flex-col gap-2 px-2">
                <div className="flex justify-between">
                  <div className="font-medium">Item total</div>
                  <div className="">€{total}</div>
                </div>
                <div className="flex justify-between border-b border-neutral-200 pb-2">
                  <div className="font-medium">Shipping</div>
                  <div className="">€3.00</div>
                </div>
                <div className="flex justify-between">
                  <div className="font-medium">Total</div>
                  <div className="">€{total + 3}</div>
                </div>
              </div>
              <Link
                href="/order"
                className="mt-14 block w-min whitespace-nowrap rounded-full bg-neutral-800 px-5 py-2 text-center text-sm tracking-wider text-white duration-200 ease-out hover:scale-105"
              >
                Proceed to checkout
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </Container>
  );
};
export default Cart;
