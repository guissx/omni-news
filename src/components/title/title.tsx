import { TitleProps } from "./titleInterface";

export default function Title({ title }: TitleProps) {
  return (
    <div>
      <h2 className="relative z-30 text-2xl md:text-4xl text-center mt-16 mb-8 text-black border-b-2 border-red-600">
        {title}
      </h2>
    </div>
  );
}
