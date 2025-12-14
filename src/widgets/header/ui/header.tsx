import { Img } from "@/shared/ui"

export const Header = () => {
    return (
        <header>
            <div>
                <div>
                    <Img src="https://i.pinimg.com/736x/8e/30/7e/8e307e7a0b98d50e1b840484b762922a.jpg"
                        alt="Restaurant cover"
                        loading="lazy"
                        decoding="async"
                    />
                </div>
                <div></div>
            </div>
        </header>
    )
}