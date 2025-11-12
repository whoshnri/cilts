import { FC, ReactNode, useMemo } from "react";

interface PinterestGridProps {
  children: ReactNode;
}

const PinterestGrid: FC<PinterestGridProps> = ({ children }) => {
  return (
    <div
      className="
        px-4
        grid
        grid-cols-2
        lg:grid-cols-3
        gap-2
        md:gap-4
        md:grid-auto-rows-[15px]
        grid-auto-rows-[8px]
      "
    >
      {children}
    </div>
  );
};

export default PinterestGrid;

interface GridItemProps {
  children: ReactNode;
}

const GridItem: FC<GridItemProps> = ({ children }) => {
  // Only generate once — stays stable until the component unmounts
  const randomSpan = useMemo(() => Math.floor(Math.random() * 11) + 20, []);

  return (
    <div
      className="overflow-hidden rounded-xl bg-gray-200"
      style={{ gridRowEnd: `span ${randomSpan}` }}
    >
      {children}
    </div>
  );
};

export { GridItem };
