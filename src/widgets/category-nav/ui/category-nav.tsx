import { Img } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
// @ts-ignore
import burgerImg from "@/assets/burger.png";
import colaImg from "@/assets/cola.png"

const CATEGORIES = [
    {
        id: 'restaurants',
        title: 'Еда',
        image: burgerImg,
        color: 'bg-[#1c1c1e]', // Dark gray from screenshot
    },
    {
        id: 'groceries',
        title: 'Напитки',
        // Using a placeholder that matches the 3D style nicely
        image: colaImg,
        color: 'bg-[#1c1c1e]',
    }
];

export const CategoryNav = () => {
    return (
        // grid grid-cols-2 gap-3 
        <div className="flex items-center justify-between gap-3 mt-6">
            {CATEGORIES.map((category) => (
                <button
                    key={category.id}
                    type="button"
                    className="flex-1 flex flex-col items-center gap-2 group cursor-pointer focus-visible:outline-none w-full max-h-[145px]"
                >
                    <div
                        className={cn(
                            "relative w-full aspect-square rounded-[20px] overflow-hidden transition-transform active:scale-95 duration-200",
                            category.color
                        )}
                    >
                        <Img
                            src={category.image}
                            alt={category.title}
                            className="w-full h-full object-cover p-2 transform group-hover:scale-110 transition-transform duration-300"
                            loading="lazy"
                        />
                    </div>
                    <span className="text-[13px] font-medium text-white/90">
                        {category.title}
                    </span>
                </button>
            ))}
        </div>
    );
};
