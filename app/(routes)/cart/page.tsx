"use client";

import Image from "next/image";
import { useAppDispatch, useAppState } from "../../context/context";
import Container from "../../components/container/Container";
import Link from "next/link";
import { Product } from "@/app/utils/types";

const Cart = () => {
  const { cartItems } = useAppState();
  const appDispatch = useAppDispatch();

  const total = cartItems.reduce((total, item) => total + item.price, 0);

  const handleRemoveItem = (id: string) => {
    appDispatch({ type: "REMOVE_ITEM", id });

    const storage = localStorage.getItem("cartItems");
    if (storage) {
      const items = JSON.parse(storage) as Product[];
      const newItems = items.filter((item) => item.id !== id);
      localStorage.setItem("cartItems", JSON.stringify(newItems));
    }
  };

  const proceedToCheckout = async () => {
    const response = await fetch("api/checkout", {
      method: "POST",
      body: JSON.stringify({ cartItems }),
      headers: {
        "Content-type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Something went wrong. Try again later");
    }
    const checkoutUrl = await response.json();
    window.location.assign(checkoutUrl);
  };

  return (
    <Container classes="mb-20">
      <div className="">
        {cartItems.length > 0 ? (
          <h4 className="py-4 text-3xl font-thin sm:py-8">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in
            your cart.
          </h4>
        ) : (
          <h4 className="py-4 text-3xl font-thin sm:py-8">
            No items in your cart yet.
          </h4>
        )}
        {cartItems.length > 0 ? (
          <div className="flex flex-col  justify-between gap-10 lg:flex-row ">
            <div className="flex flex-col gap-8">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className=" max-w-[600px] rounded-xl border border-neutral-300 p-2 shadow-cart sm:p-3"
                >
                  <div className="flex w-full gap-2  sm:gap-6">
                    <div className="relative h-32 w-36 shrink-0 overflow-hidden rounded-xl sm:h-52  sm:w-60 sm:shrink ">
                      <Image
                        src={item.images[0]}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-between">
                      <div>
                        <div className="text-neutral-700">
                          <Link
                            href={`/products/${item.id}`}
                            className="text-neutral-600"
                          >
                            {item.name}
                          </Link>
                        </div>
                        <div className="">€ {item.price}.00</div>
                      </div>
                      <div className="mb-4 flex gap-4 md:mb-0">
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="block w-min rounded-full bg-white  text-sm font-medium duration-200 ease-in-out hover:bg-neutral-100"
                        >
                          Remove
                        </button>
                        <button className="block w-min whitespace-nowrap rounded-full bg-white text-sm  font-medium duration-200 ease-in-out hover:bg-neutral-100">
                          Save for later
                        </button>
                      </div>
                      <div className="hidden items-start gap-2 sm:flex">
                        <input
                          type="checkbox"
                          id="gift"
                          className="mt-1.5 block bg-red-500"
                          onChange={(e) =>
                            appDispatch({
                              type: "SET_IS_GIFT",
                              isGift: e.target.checked,
                            })
                          }
                        />
                        <label htmlFor="gift" className="flex flex-col">
                          <span>This package is a gift</span>
                          <span className="text-sm">
                            Prices will not be show in the package slip
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 flex items-start gap-2 sm:hidden">
                    <input type="checkbox" id="gift" className="mt-1.5 block" />
                    <label htmlFor="gift" className="flex flex-col">
                      <span>This package is a gift</span>
                      <span className="text-sm">
                        Prices will not be show in the package slip
                      </span>
                    </label>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex w-full max-w-[400px] flex-col  items-center p-4 sm:mt-0 md:px-0 ">
              <div className="flex w-full flex-col gap-6 px-2">
                <div className="flex justify-between">
                  <div className="font-medium tracking-wide">
                    Item&#40;s&#41; total
                  </div>
                  <div className="">€ {total}</div>
                </div>
                <div className="flex justify-between border-b border-neutral-200 pb-2">
                  <div className="tracking-wide">Shipping</div>
                  <div className="">€ 3.00</div>
                </div>
                <div className="flex justify-between">
                  <div className="font-medium tracking-wide">
                    Total &#40;{cartItems.length}item&#41;
                  </div>
                  <div className="">€ {total + 3}</div>
                </div>
              </div>
              <button
                onClick={proceedToCheckout}
                className="mt-14 block w-full whitespace-nowrap rounded-full bg-neutral-800 px-5 py-2 text-center text-sm tracking-wider text-white duration-200 ease-out hover:scale-105"
              >
                Proceed to checkout
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </Container>
  );
};
export default Cart;
