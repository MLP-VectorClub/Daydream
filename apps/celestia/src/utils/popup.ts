// http://stackoverflow.com/a/16861050
export const popupCalcCenter = (w: number, h: number) => {
  const dualScreenLeft = typeof window.screenLeft !== 'undefined' ? window.screenLeft : (screen as unknown as { left: number }).left;
  const dualScreenTop = typeof window.screenTop !== 'undefined' ? window.screenTop : (screen as unknown as { top: number }).top;
  const width = window.innerWidth || document.documentElement.clientWidth || screen.width;
  const height = window.innerHeight || document.documentElement.clientHeight || screen.height;
  const left = width / 2 - w / 2 + dualScreenLeft;
  const top = height / 2 - h / 2 + dualScreenTop;

  return { top, left };
};

export const popupOpenCenter = (url: string, title: string, w: number, h: number) => {
  const calcPos = popupCalcCenter(w, h);
  const newWindow = window.open(url, title, `scrollbars=yes,width=${w},height=${h},top=${calcPos.top},left=${calcPos.left}`);

  try {
    if (newWindow !== null) newWindow.focus();
  } catch (e) {
    /* ignore */
  }

  return newWindow;
};

export const popupMoveCenter = (popup: Window, w: number, h: number) => {
  const newPos = popupCalcCenter(w, h);
  popup.resizeTo(w, h);
  popup.moveTo(newPos.left, newPos.top);
};
