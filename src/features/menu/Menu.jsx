/* eslint-disable react-refresh/only-export-components */
import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

const Menu = () => {
  const menu = useLoaderData();
  console.log(menu);
  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
};
export const menuLoader = async () => {
  const menu = await getMenu();
  return menu;
};

export default Menu;
