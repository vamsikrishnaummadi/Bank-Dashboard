import { apple, creditCardYellow, google, lockPin } from "./cardIcons";

const settingsData = [
  {
    icon: creditCardYellow,
    subject: "Block Card",
    description: "Instantly block your card",
  },
  {
    icon: lockPin,
    subject: "Change Pin Code",
    description: "Choose another pin Code",
  },
  {
    icon: google,
    subject: "Add to Google Pay",
    description: "Withdraw without any card",
  },
  {
    icon: apple,
    subject: "Add to Apple Pay",
    description: "Withdraw without any card",
  },
  {
    icon: apple,
    subject: "Add to Apple Store",
    description: "Withdraw without any card",
  },
];

const CardSetting = () => {
  return (
    <div className="w-full lg:w-1/3">
      <div className="lg:ml-3 mb-3">
        <h2 className="text-sm sm:text-base lg:text-lg text-[#343C6A] font-semibold ml-1 mb-2">
          Card Setting
        </h2>
        <ul className="bg-white border rounded-2xl lg:rounded-3xl flex flex-col justify-between py-4 w-4/5 sm:w-1/2 lg:w-full sm:m-auto">
          {settingsData.map((each, index) => (
            <li
              className="flex flex-row m-3 justify-start gap-6 px-1"
              key={index}
            >
              <div>
                <img
                  src={each.icon}
                  alt="transaction icon"
                  className="w-10 h-10"
                />
              </div>
              <div className="text-left">
                <p className="text-sm lg:text-md font-medium">{each.subject}</p>
                <p className="text-xs lg:text-sm font-normal">
                  {each.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CardSetting;
