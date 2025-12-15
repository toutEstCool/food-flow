import {
    type ImgHTMLAttributes,
    useState,
    type ReactElement,
    forwardRef,
} from "react";
import { cn } from "@/shared/lib/utils";


export interface ImgProps extends ImgHTMLAttributes<HTMLImageElement> {
    /**
     * Fallback content to show if image fails to load.
     * Can be a URL string or a React Element.
     */
    fallback?: string | ReactElement;

    /**
     * Component to show while loading.
     */
    skeleton?: ReactElement;

    /**
     * If true, uses a simple skeleton pulse animation by default if no skeleton prop is provided.
     * @default true
     */
    useDefaultSkeleton?: boolean;
}

/**
 * Production-ready Image component with error handling, loading states, and smooth transitions.
 * Supports fallbacks and custom skeletons.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Img src="https://example.com/image.jpg" alt="Description" />
 *
 * // With fallback
 * <Img
 *   src="https://invalid-url.com/image.jpg"
 *   fallback="/default-avatar.png" // or <FallbackComponent />
 *   alt="Avatar"
 * />
 *
 * // With custom skeleton
 * <Img
 *   src={src}
 *   skeleton={<Skeleton className="h-full w-full" />}
 *   className="h-64 w-64 rounded-lg"
 * />
 * ```
 */
export const Img = forwardRef<HTMLImageElement, ImgProps>(
    (
        {
            className,
            src,
            alt,
            fallback,
            skeleton,
            useDefaultSkeleton = true,
            onLoad,
            onError,
            ...otherProps
        },
        ref
    ) => {
        const [isLoading, setIsLoading] = useState(true);
        const [hasError, setHasError] = useState(false);

        const [lastSrc, setLastSrc] = useState(src);

        if (src !== lastSrc) {
            setLastSrc(src);
            setIsLoading(true);
            setHasError(false);
        }

        const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
            setIsLoading(false);
            onLoad?.(e);
        };

        const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
            setIsLoading(false);
            setHasError(true);
            onError?.(e);
        };

        if (hasError && fallback) {
            if (typeof fallback === "string") {
                return (
                    <img
                        src={fallback}
                        alt={alt}
                        className={className}
                        ref={ref}
                        {...otherProps}
                    />
                );
            }
            return fallback;
        }

        return (
            <div className={cn("relative overflow-hidden", className)}>
                {isLoading && (
                    <>
                        {skeleton ? (
                            skeleton
                        ) : useDefaultSkeleton ? (
                            <div className="absolute inset-0 animate-pulse bg-muted" />
                        ) : null}
                    </>
                )}

                <img
                    src={src}
                    alt={alt}
                    className={cn(
                        "h-full w-full object-cover transition-opacity duration-300",
                        isLoading ? "opacity-0" : "opacity-100"
                    )}
                    onLoad={handleLoad}
                    onError={handleError}
                    ref={ref}
                    {...otherProps}
                />
            </div>
        );
    }
);

Img.displayName = "Img";
