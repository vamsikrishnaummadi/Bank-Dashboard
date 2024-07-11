import {
  Menu,
  MenuButton,
  MenuHeading,
  MenuItem,
  MenuItems,
  MenuSection,
} from "@headlessui/react";
import { BellIcon } from "@heroicons/react/24/outline";

const notifications = ["item 1", "item 2", "item 3"];

const Notifications = () => {
  return (
    <Menu>
      <MenuButton className="inline-flex items-center gap-2 rounded-md py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-slate-200 data-[open]:bg-slate-200 data-[focus]:outline-1 data-[focus]:outline-white">
        <BellIcon className="size-6 text-red-400" />
      </MenuButton>
      <MenuItems
        className={`w-52 origin-top-right rounded-xl border border-black/2 bg-white/5 p-1 text-sm/6 text-black transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0`}
        anchor="bottom end"
      >
        <MenuSection>
          <MenuHeading className="pl-3 text-left">
            <h3>Notifications</h3>
          </MenuHeading>
          {notifications.map((item) => (
            <MenuItem key={item}>
              <p>{item}</p>
            </MenuItem>
          ))}
        </MenuSection>
      </MenuItems>
    </Menu>
  );
};

export default Notifications;
