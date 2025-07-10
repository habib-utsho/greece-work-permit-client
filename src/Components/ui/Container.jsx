/* eslint-disable react/prop-types */

const Container = ({ children }) => {
  return (
    <div className="max-w-[90%] md:max-w-[65%] lg:max-w-[55%] xl:max-w-[40%] mx-auto ">
      {children}
    </div>
  );
};

export default Container;
