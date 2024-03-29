import LinkBtn from "../../ui/LinkBtn";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart } from "./cartSlice";
import EmptyCart from "./EmptyCart";

function Cart() {
  const userName = useSelector((state) => state.user.userName);
  const cart = useSelector(getCart);
  const dispatch = useDispatch();

  return (
    <>
      {!cart.length ? (
        <EmptyCart />
      ) : (
        <div className="px-4 py-3">
          <LinkBtn to="/menu">&larr; Back to menu</LinkBtn>
          <h2 className="mt-7 text-xl font-semibold">Your cart, {userName}</h2>
          <ul className="mt-3 divide-y divide-stone-200 border-b">
            {cart.map((item) => (
              <CartItem item={item} key={item.id} />
            ))}
          </ul>
          <div className="mt-6 space-x-2">
            <Button type="primary" to="/order/new">
              Order pizzas
            </Button>
            <Button type="secondary" onClick={() => dispatch(clearCart())}>
              Clear cart
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
