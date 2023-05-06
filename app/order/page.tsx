"use client";

import { useState } from "react";
import Fieldset from "./components/Fieldset";
import Container from "../components/Container";
import { useAppDispatch, useAppState } from "../context";
import { redirect } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const DetailsSchema = z.object({
  email: z.string().email(),
  fullName: z.string().min(1, { message: "Full name is required" }),
  street: z.string().min(1, { message: "Street address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  postalCode: z.string().min(1, { message: "Postal code is required" }),
});

export type Details = z.infer<typeof DetailsSchema>;

const Order = () => {
  const dispatch = useAppDispatch();

  const [details, setDetails] = useState({
    email: "",
    fullName: "",
    street: "",
    postalCode: "",
    city: "",
  });

  const { cartItems } = useAppState();
  if (cartItems.length === 0) {
    redirect("/products");
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Details>({
    resolver: zodResolver(DetailsSchema),
  });

  const submit = (data: Details) => {
    dispatch({ type: "SET_ORDER_DETAILS", orderDetails: data });
  };

  return (
    <Container classes="pt-20 mx-auto">
      <div className="mx-auto w-1/2">
        <h4 className="pb-8 text-3xl">Choose your shipping address</h4>
        <form>
          <Fieldset
            id="email"
            label="Email*"
            value={details.email}
            handleInputChange={handleInputChange}
            register={register}
          />
          {errors.email ? (
            <span className="text-xs text-red-400">{errors.email.message}</span>
          ) : (
            <span className="p-3"></span>
          )}
          <Fieldset
            id="fullName"
            label="Full name*"
            value={details.fullName}
            handleInputChange={handleInputChange}
            register={register}
          />
          {errors.fullName ? (
            <span className="text-xs text-red-400">
              {errors.fullName.message}
            </span>
          ) : (
            <span className="p-3"></span>
          )}
          <Fieldset
            id="street"
            label="Street address*"
            value={details.street}
            handleInputChange={handleInputChange}
            register={register}
          />
          {errors.street ? (
            <span className="text-xs text-red-400">
              {errors.street.message}
            </span>
          ) : (
            <span className="p-3"></span>
          )}
          <Fieldset
            id="postalCode"
            label="Postal code*"
            value={details.postalCode}
            handleInputChange={handleInputChange}
            register={register}
          />
          {errors.postalCode ? (
            <span className="text-xs text-red-400">
              {errors.postalCode.message}
            </span>
          ) : (
            <span className="p-3"></span>
          )}
          <Fieldset
            id="city"
            label="City*"
            value={details.city}
            handleInputChange={handleInputChange}
            register={register}
          />
          {errors.city ? (
            <span className="text-sm text-red-400">{errors.city.message}</span>
          ) : (
            <span className="p-3"></span>
          )}
          <button
            type="button"
            onClick={handleSubmit(submit)}
            className="my-4 block w-full rounded-full bg-black py-3 text-white duration-100 ease-in-out hover:opacity-80"
          >
            submit
          </button>
        </form>
      </div>
    </Container>
  );
};
export default Order;
