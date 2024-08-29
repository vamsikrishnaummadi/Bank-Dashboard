import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useState } from "react";

const CustomSelect = (props: any) => {
  const { field, form, options } = props;
  const [selected, setSelected] = useState({
    label: "select",
    value: "",
    imgSrc: "",
  });

  const handleSelect = (option: any) => {
    setSelected(option);
    form.setFieldValue(field.name, option.value);
  };

  return (
    <div className="w-52 bg-white">
      <Listbox value={selected}>
        <ListboxButton
          className={clsx(
            "relative block rounded-xl w-full bg-white/5 py-1.5 pr-8 pl-3 text-left text-sm/6 text-black border border-gray-300 shadow-sm",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 rounded-t-xl"
          )}
        >
          {selected.label}
          <ChevronDownIcon
            className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-indigo-600"
            aria-hidden="true"
          />
        </ListboxButton>
        <ListboxOptions
          anchor="bottom"
          transition
          className={clsx(
            "w-[var(--button-width)] border border-white/5 bg-white p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none",
            "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0 h-36 scrollbar-thin"
          )}
        >
          {options.map((option: any) => (
            <ListboxOption
              key={option.value}
              onClick={() => handleSelect(option)}
              value={option.value}
              className="py-2"
            >
              <img
                src={option.imgSrc}
                alt={option.label}
                className="w-8 h-8 rounded-full hover:border-2 hover:border-indigo-700 object-cover inline-block mr-2"
              />
              {option.label}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
};

export default CustomSelect;
