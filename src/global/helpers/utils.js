export const scrollDown = (element) => {
  setTimeout(() => {
    const height = element.scrollHeight;
    element.scrollTop = height;
  }, 0);
};

export const autoHeight = (element) => {
  setTimeout(() => {
    element.style.height = "auto";
    element.style.height = element.scrollHeight + "px";
  }, 0);
};
