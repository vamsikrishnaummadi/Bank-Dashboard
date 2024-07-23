
const features = [
  {
    name: 'Life Insurance',
    caption: 'Unlimited Protection',
    imgSrc: '../src/assets/Ellipse 37.png',
    icon: '../src/assets/life.png',
  },
  {
    name: 'Shopping',
    caption: 'Buy Think Grow',
    imgSrc: 'path/to/shopping.jpg',
    icon: 'shopping-icon.svg',
  },
  {
    name: 'Safety',
    caption: 'We Are Your Allies',
    imgSrc: 'path/to/safety.jpg',
    icon: 'safety-icon.svg',
  },
];

const FeatureCircles = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around items-center space-y-8 sm:space-y-0 sm:space-x-8 my-8">
      {features.map((feature, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="flex items-center space-x-4">
            <div className="relative w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden shadow-lg">
              <img src={feature.imgSrc} alt={feature.name} className="w-full h-full object-cover" />
              <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                <img src={feature.icon} alt={`${feature.name} icon`} className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" />
              </div>
            </div>
            <div className="flex flex-col items-start">
              <h3 className="text-lg font-semibold mt-2">{feature.name}</h3>
              <p className="text-sm text-gray-600">{feature.caption}</p>
              
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureCircles;
