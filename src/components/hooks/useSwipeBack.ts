import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const useSwipeBack = () => {
    const navigate = useNavigate();

    useEffect(() => {
        let touchStartX = 0;
        let validSwipe = false;

        const handleTouchStart = (e: TouchEvent) => {
            touchStartX = e.touches[0].clientX;
            validSwipe = touchStartX < 10; // свайп только с левого края
        };

        const handleTouchEnd = (e: TouchEvent) => {
            if (!validSwipe) return;
            const touchEndX = e.changedTouches[0].clientX;
            if (touchEndX - touchStartX > 150) {
                navigate(-1);
            }
        };

        window.addEventListener("touchstart", handleTouchStart);
        window.addEventListener("touchend", handleTouchEnd);

        return () => {
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchend", handleTouchEnd);
        };
    }, [navigate]);

    return null;
};

export default useSwipeBack;
