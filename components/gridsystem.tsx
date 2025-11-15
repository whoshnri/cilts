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
        grid-cols-1
        lg:grid-cols-3
        gap-4
        grid-auto-rows-[10px] 
      "
    >
      {children}
    </div>
  );
};

interface GridItemProps {
  children: ReactNode;
  span: number;
}

const GridItem: FC<GridItemProps> = ({ children, span }) => {
  return (
    <div className={`overflow-hidden rounded-xl sm:row-span-[${span}]`}>
      {children}
    </div>
  );
};

export { GridItem };

export default PinterestGrid;