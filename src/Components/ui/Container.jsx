/* eslint-disable react/prop-types */

const Container = ({ children, className }) => {
  return <div className={`max-w-[560px] mx-auto ${className}`}>{children}</div>;
};

export default Container;
