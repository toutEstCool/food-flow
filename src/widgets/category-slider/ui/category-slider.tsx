import { Img } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import burgerIcon from '@/assets/burger-icon.png'
import sushiIcon from '@/assets/sushi-icon.png'
import pizzaIcon from '@/assets/pizza-icon.png'
import chickenIcon from '@/assets/chicken-icon.png'

export interface CategoryItem {
    id: string;
    title: string;
    imageUrl: string;
    type?: 'default' | 'action';
}

interface CategorySliderProps {
    title?: string;
    items?: CategoryItem[];
    className?: string;
}

const DEFAULT_ITEMS: CategoryItem[] = [
    {
        id: 'burgers',
        title: 'Бургеры',
        imageUrl: burgerIcon,
    },
    {
        id: 'sushi',
        title: 'Суши',
        imageUrl: sushiIcon,
    },
    {
        id: 'pizza',
        title: 'Пицца',
        imageUrl: pizzaIcon,
    },
    {
        id: 'chicken',
        title: 'Курица',
        imageUrl: chickenIcon,
    }
];

export const CategorySlider = ({
    title = "Что заказать",
    items = DEFAULT_ITEMS,
    className
}: CategorySliderProps) => {
    return (
        <section className={cn("flex flex-col gap-4 select-none mt-6", className)}>
            <div className="flex items-center justify-between">
                <h2 className="text-[20px] font-bold tracking-tight text-foreground">
                    {title}
                </h2>
            </div>

            <div className="relative w-full">
                {/* Scroll Container */}
                <div
                    className="flex overflow-x-auto gap-4 px-4 pb-4 hide-scrollbar snap-x snap-mandatory scroll-smooth touch-pan-x"
                    style={{ WebkitOverflowScrolling: 'touch' }}
                >
                    {/* Action Button (fixed as first item if needed, or separate) 
              Based on screenshot, it might be separate. 
              Let's include it as a special item if we want, or just a separate button.
              For now, adhering to the list style. 
          */}

                    {items.map((item) => (
                        <button
                            key={item.id}
                            type="button"
                            className="group flex flex-col items-center gap-2 min-w-[80px] snap-start focus:outline-none"
                        >
                            <div className="relative w-20 h-20 sm:w-24 sm:h-24 transition-transform duration-300 ease-out group-active:scale-90 group-hover:scale-105">
                                {/*
                   Using a radial gradient background similar to the screenshot's subtle glow or just transparent.
                   Screenshot items looked like floating 3D objects.
                */}
                                {/*
                   Using native img to avoid clipping and force object-contain
                   for 3D floating effect which looks better than object-cover.
                */}
                                <Img
                                    src={item.imageUrl}
                                    alt={item.title}
                                    className="w-full h-full object-contain drop-shadow-xl transition-transform duration-300 group-hover:scale-110"
                                    loading="lazy"
                                />
                            </div>
                            <span className="text-[13px] font-medium text-foreground/90 text-center leading-none">
                                {item.title}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};
