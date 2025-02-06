// Menu.js
import MenuItem from "./MenuItem";

const Menu = ({ items }) => {
//   console.log(items);
  return (
    <div className="p-4">
      {items.map((item) => (
        <MenuItem key={item?.card?.info?.id} item={item} />
      ))}
    </div>
  );
};

export default Menu;
