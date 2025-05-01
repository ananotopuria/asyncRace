export const SPEED_FACTOR = 100;
export function animateCar(id: number, time: number) {
    const el = document.getElementById(`car-${id}`);
    if (!el) return;
  
    el.style.transition = "";
    el.style.transform = "translateX(0)";
    void el.offsetWidth;
  
    const trackWidth = el.parentElement?.getBoundingClientRect().width ?? 0;
    const adjustedTime = time / SPEED_FACTOR;
    el.style.transition = `transform ${adjustedTime}s linear`;
    el.style.transform = `translateX(${trackWidth}px)`;
  }
  
  export function resetCarPosition(id: number) {
    const el = document.getElementById(`car-${id}`);
    if (!el) return;
    el.style.transition = "";
    el.style.transform = "translateX(0)";
  }
  
  export function stopCarAnimation(id: number) {
    const el = document.getElementById(`car-${id}`);
    if (!el) return;
    el.style.transition = "none";
  }