import { FC, ReactNode } from "react";

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
        md:grid-auto-rows-[10px]
        grid-auto-rows-[6px]
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
  return (
    // style sets "grid-row-end: span <n>"
    <div
      className="overflow-hidden rounded-xl bg-black"
      style={{ gridRowEnd: `span ${Math.ceil(1 / 2)}` }}
    >
      {children}
    </div>
  );
};

export { GridItem };
