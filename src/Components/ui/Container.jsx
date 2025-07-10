/* eslint-disable react/prop-types */

const Container = ({ children }) => {
  return (
    <div className="max-w-[90%] md:max-w-[50%] xl:max-w-[32%] mx-auto ">
      {children}
    </div>
  );
};

export default Container;
