import { useCallback, useEffect, useLayoutEffect, useState } from 'react';

// Функция для изменения цвета текста
export const toggleTextColor = (buttonId, shouldBeWhite) => {
    const button = document.getElementById(buttonId);
    if (button) {
        const span = button.querySelector('span.font-semibold');
        const isMobile = window.innerWidth <= 1023;
        if (span) {
            if (shouldBeWhite) {
                span.classList.add('text-white');
                if (isMobile) {
                    button.classList.add('bg-black');
                }
            } else {
                span.classList.remove('text-white');
                button.classList.remove('bg-black');
            }
        }
    }
};

// Функция для анимации фона
export const slideBackground = (buttonId, parentRef) => {
    const background = document.getElementById('sliding-bg');
    const button = document.getElementById(buttonId);
    
    if (!background || !button || !parentRef?.current) return;

    const parentRect = parentRef.current.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    
    if (parentRect.width === 0 || buttonRect.width === 0) {
        requestAnimationFrame(() => {
            slideBackground(buttonId, parentRef);
        });
        return;
    }
    
    const allButtonIds = ['btn-first', 'btn-second', 'btn-third', 'btn-fourth'];
    allButtonIds.forEach(id => toggleTextColor(id, false));
    
    toggleTextColor(buttonId, true);
    
    const translateX = buttonRect.left - parentRect.left;

    background.style.width = `${buttonRect.width}px`;
    background.style.transform = `translateX(${translateX}px)`;
};

export const useSliderAnimation = (parentRef, activeButtonId) => {
    const [isReady, setIsReady] = useState(false);

    const slideBackgroundCallback = useCallback((buttonId) => {
        slideBackground(buttonId, parentRef);
    }, [parentRef]);

    const resetBackground = useCallback(() => {
        slideBackgroundCallback(activeButtonId);
    }, [slideBackgroundCallback, activeButtonId]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsReady(true);
        }, 100);
        
        return () => clearTimeout(timer);
    }, []);

    useLayoutEffect(() => {
        if (!isReady) return;
        
        requestAnimationFrame(() => {
            slideBackgroundCallback(activeButtonId);
        });
        
        window.addEventListener('resize', resetBackground);
        
        return () => {
            window.removeEventListener('resize', resetBackground);
        };
    }, [activeButtonId, isReady, slideBackgroundCallback, resetBackground]);

    useEffect(() => {
        if (!parentRef.current || !isReady) return;
        
        const resizeObserver = new ResizeObserver(() => {
            requestAnimationFrame(() => {
                slideBackgroundCallback(activeButtonId);
            });
        });
        
        resizeObserver.observe(parentRef.current);
        
        return () => {
            resizeObserver.disconnect();
        };
    }, [activeButtonId, isReady, parentRef, slideBackgroundCallback]);

    return {
        slideBackground: slideBackgroundCallback,
        resetBackground,
        isReady
    };
};