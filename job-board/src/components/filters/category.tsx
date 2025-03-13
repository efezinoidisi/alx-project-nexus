import useToggle from "@/hooks/use-toggle";
import { cn } from "@/utils";
import { ChevronDown } from "lucide-react";
import React from "react";

interface CategoryProps {
  selectedCategory: string;
  handleChange: (value: string) => void;
  categories: Array<string>;
}

const Category: React.FC<CategoryProps> = ({
  selectedCategory,
  categories,
  handleChange,
}) => {
  // const { isLoading, isError, data } = useFetch("/category/");

  const [showDropdown, toggleDropdown] = useToggle();

  const handleCategoryClick = (value: string) => {
    handleChange(value);
    toggleDropdown();
  };
  return (
    <div className='space-y-1'>
      <h4 className='font-medium text-lg'>Category</h4>
      <div className='relative'>
        <button
          onClick={toggleDropdown}
          className='border border-foreground/10 w-full flex items-center justify-between py-2 px-4 rounded-lg capitalize'
        >
          {selectedCategory || "select category"}
          <ChevronDown
            size={20}
            className={cn("transition-all duration-200 ease-linear", {
              "rotate-180": showDropdown,
            })}
          />
        </button>

        {showDropdown && (
          <div className='flex flex-col bg-light border border-grey md:absolute top-full mt-1 z-50 w-full rounded-lg items-start p-3 gap-1'>
            <button
              onClick={() => handleCategoryClick("")}
              className={cn(
                "text-nowrap py-1 px-2.5 rounded-lg capitalize w-fit text-left",
                {
                  "text-accent bg-accent/10": selectedCategory === "",
                  "": selectedCategory !== "",
                }
              )}
            >
              select category
            </button>
            {categories.map((category) => {
              const isSelectedCategory = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={cn(
                    "text-nowrap py-1 px-2.5 rounded-lg w-full text-left",
                    {
                      "text-accent bg-accent/10": isSelectedCategory,
                      "": !isSelectedCategory,
                    }
                  )}
                >
                  {category}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
