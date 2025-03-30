export const getCardStyle = (
  index: number,
  activeIndex: number,
  itemsLength: number
) => {
  const isActive = index === activeIndex;
  const isNext = index === (activeIndex + 1) % itemsLength;
  const isPrev = index === (activeIndex - 1 + itemsLength) % itemsLength;

  if (isActive) return "translate-x-0 opacity-100 z-10 scale-100";
  if (isNext) return "translate-x-full opacity-0 scale-90 z-0";
  if (isPrev) return "-translate-x-full opacity-0 scale-90 z-0";
  return "translate-x-0 opacity-0 scale-90 z-0";
};
