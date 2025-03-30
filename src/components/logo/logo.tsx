import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex gap-4 items-center">
      <div className="relative w-[40px] h-[40px] lg:w-[50px] lg:h-[50px]">
        <Image
          alt={""}
          fill
          className="object-contain"
          src="/assets/images/logo3.png"
        ></Image>
      </div>
      <h1 className="orbitron-text lg:text-[2.5rem] text-xl">Omni news</h1>
    </div>
  );
}
