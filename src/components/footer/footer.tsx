import Logo from "../logo/logo";

export default function Footer() {
  return (
    <footer className="bg-white mt-16 shadow-top shadow-2xl flex justify-between items-center z-50 relative bottom-0 w-full px-12 py-12">
      <div>
        <Logo></Logo>
      </div>
    </footer>
  );
}
