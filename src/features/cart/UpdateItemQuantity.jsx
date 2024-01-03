/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import {
  decreaseItemQty,
  getCurrentQuantityById,
  increaseItemQty,
} from "./cartSlice";

const UpdateItemQuantity = ({ pizzaId }) => {
  const dispatch = useDispatch();
  const currentQty = useSelector(getCurrentQuantityById(pizzaId));

  return (
    <div className="flex items-center gap-1 md:gap-3">
      <Button type={"round"} onClick={() => dispatch(decreaseItemQty(pizzaId))}>
        -
      </Button>
      <span className="text-sm font-medium">{currentQty}</span>
      <Button type={"round"} onClick={() => dispatch(increaseItemQty(pizzaId))}>
        +
      </Button>
    </div>
  );
};

export default UpdateItemQuantity;
