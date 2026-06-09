import { useEffect, useRef } from "react";
import "../styles/Cursor.css";

const Cursor = () => {
  const outerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cursorOuter = outerRef.current;
    const cursorInner = innerRef.current;
    const trailElements = trailRefs.current.filter(
      (element): element is HTMLDivElement => element !== null
    );

    if (!cursorOuter || !cursorInner) return;

    const pointer = { x: -100, y: -100 };
    const trailPositions = trailElements.map(() => ({ x: -100, y: -100 }));
    let trailAnimationFrame = 0;

    const handleMouseMove = (e: MouseEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;

      cursorOuter.style.left = `${pointer.x}px`;
      cursorOuter.style.top = `${pointer.y}px`;
      cursorInner.style.left = `${pointer.x}px`;
      cursorInner.style.top = `${pointer.y}px`;
    };

    const animateTrail = () => {
      let targetX = pointer.x;
      let targetY = pointer.y;

      trailElements.forEach((element, index) => {
        const position = trailPositions[index];
        const ease = 0.42 - index * 0.045;

        position.x += (targetX - position.x) * ease;
        position.y += (targetY - position.y) * ease;

        element.style.left = `${position.x}px`;
        element.style.top = `${position.y}px`;

        targetX = position.x;
        targetY = position.y;
      });

      trailAnimationFrame = requestAnimationFrame(animateTrail);
    };

    document.addEventListener("mousemove", handleMouseMove);
    trailAnimationFrame = requestAnimationFrame(animateTrail);

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
      cancelAnimationFrame(trailAnimationFrame);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <>
      {Array.from({ length: 4 }, (_, index) => (
        <div
          key={index}
          ref={(element) => {
            trailRefs.current[index] = element;
          }}
          className={`cursor-trail-dot cursor-trail-dot-${index + 1}`}
        />
      ))}
      <div ref={outerRef} className="cursor-outer" />
      <div ref={innerRef} className="cursor-inner" />
    </>
  );
};

export default Cursor;
