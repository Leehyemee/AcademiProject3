import { useEffect, useState } from "react";

export const useHeaderLayout = () => {
    const [isFullWidth, setIsFullWidth] = useState(false);
    const [isOffcanvasActive, setIsOffcanvasActive] = useState(false);

    useEffect(() => {
        const width = window.innerWidth;
        if (width < 1025) {
            setIsOffcanvasActive(true);
            document.body.classList.add('offcanvas-active');
        } else {
            document.body.classList.add('layout-default');
        }
    }, []);

    const handleToggleFullWidth = () => {
        const body = document.body;
        const isCurrentlyFullWidth = body.classList.contains("layout-fullwidth");

        if (isCurrentlyFullWidth) {
            body.classList.remove("layout-fullwidth");
            body.classList.add("layout-default");
        } else {
            body.classList.add("layout-fullwidth");
            body.classList.remove("layout-default");
        }

        if (window.innerWidth < 1025) {
            setIsOffcanvasActive(prev => {
                const toggled = !prev;
                toggled ? body.classList.add("offcanvas-active") : body.classList.remove("offcanvas-active");
                return toggled;
            });
        }

        setIsFullWidth(!isCurrentlyFullWidth);
    };

    return { isFullWidth, handleToggleFullWidth };
};
