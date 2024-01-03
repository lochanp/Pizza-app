/* eslint-disable react-refresh/only-export-components */

import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utilities/helpers";
import { useState } from "react";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const userName = useSelector((state) => state.user.userName);
  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const isSubmiting = navigation.state === "submitting";
  const formErrors = useActionData();
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  return (
    <>
      {!cart.length ? (
        <EmptyCart />
      ) : (
        <div className="px-4 py-6">
          <h2 className="mb-8 text-xl font-semibold">
            Ready to order? Let&apos;s go!
          </h2>

          <Form method="POST">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
              <label className="sm:basis-40">First Name</label>
              <input
                className="input grow"
                type="text"
                name="customer"
                defaultValue={userName}
                required
              />
            </div>

            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
              <label className="sm:basis-40">Phone number</label>
              <div className="grow">
                <input
                  className="input w-full"
                  type="tel"
                  name="phone"
                  required
                />
                {formErrors?.phone && (
                  <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                    {formErrors.phone}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
              <label className="sm:basis-40">Address</label>
              <div className="grow">
                <input
                  className="input w-full"
                  type="text"
                  name="address"
                  required
                />
              </div>
            </div>

            <div className="mb-12 flex items-center gap-5">
              <input
                className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
                type="checkbox"
                name="priority"
                id="priority"
                value={withPriority}
                onChange={(e) => setWithPriority(e.target.checked)}
              />
              <label htmlFor="priority" className="font-medium">
                Want to yo give your order priority?
              </label>
            </div>

            <div>
              <input value={JSON.stringify(cart)} type="hidden" name="cart" />
              <Button type="primary" disabled={isSubmiting}>
                {isSubmiting
                  ? "Placing your order..."
                  : `Order now ${formatCurrency(totalPrice)}`}
              </Button>
            </div>
          </Form>
        </div>
      )}
    </>
  );
}

export const createOrderAction = async ({ request }) => {
  const data = await request.formData();
  const formData = Object.fromEntries(data);

  const order = {
    ...formData,
    cart: JSON.parse(formData.cart),
    priority: formData.priority === "true",
  };

  const errors = {};

  if (!isValidPhone(order.phone)) {
    errors.phone =
      "Please enter a valid phone number. We may need it to contact you for delivery.";
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
};

export default CreateOrder;
