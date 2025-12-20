import { useEffect, useRef } from "react";
import "../styles/Cursor.css";

const Cursor = () => {
  const outerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cursorOuter = outerRef.current;
    const cursorInner = innerRef.current;

    if (!cursorOuter || !cursorInner) return;

    const handleMouseMove = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        cursorOuter.style.left = `${e.clientX}px`;
        cursorOuter.style.top = `${e.clientY}px`;

        cursorInner.style.left = `${e.clientX}px`;
        cursorInner.style.top = `${e.clientY}px`;
      });
    };

    document.addEventListener("mousemove", handleMouseMove);

    const handleMouseEnter = () => {
      cursorOuter.style.transform = "translate(-50%, -50%) scale(1.5)";
      cursorInner.style.transform = "translate(-50%, -50%) scale(0.5)";
    };

    const handleMouseLeave = () => {
      cursorOuter.style.transform = "translate(-50%, -50%) scale(1)";
      cursorInner.style.transform = "translate(-50%, -50%) scale(1)";
    };

    const addCursorEffects = () => {
      const interactiveElements =
        document.querySelectorAll<HTMLElement>(
          "a, button, input, textarea, select, .swiper-button-prev, .swiper-button-next, .swiper-pagination, .music-toggle"
        );

      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);

        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
      });
    };

    addCursorEffects();
    const t1 = setTimeout(addCursorEffects, 100);
    const t2 = setTimeout(addCursorEffects, 2500);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <>
      <div ref={outerRef} className="cursor-outer" />
      <div ref={innerRef} className="cursor-inner" />
    </>
  );
};

export default Cursor;
