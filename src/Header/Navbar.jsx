import Container from "../Components/ui/Container";
import logoLeft from "../assets/LOGO_GGPS_new.png";
import logoRight from "../assets/logo_el.png";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between gap-6 p-3 flex-wrap">
      <img
        className="h-auto w-[200px] "
        src={logoLeft}
        alt="greece-work-permit"
      />
      <img
        className="h-auto w-[200px]"
        src={logoRight}
        alt="greece-work-permit"
      />
    </div>
  );
};

export default Navbar;
