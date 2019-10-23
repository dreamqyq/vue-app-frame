((doc, win) => {
  const docEl = doc.documentElement;
  const resizeEvt =
    "orientationchange" in window ? "orientationchange" : "resize";
  const recalc = () => {
    const clientWidth = docEl.clientWidth;
    if (!clientWidth) {
      return;
    }
    docEl.style.fontSize = clientWidth * (50 / 375) + "px";
  };
  if (!doc.addEventListener) {
    return;
  }
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener("DOMContentLoaded", recalc, false);
})(document, window);
