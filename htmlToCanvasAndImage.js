const root = document.querySelector('.root');
const elementToCanvas = document.querySelector('.element');
const createImage = document.querySelector('.create-image');
const createCanvas = document.querySelector('.create-canvas');

const HtmlToCanvas = (element) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const width = element.offsetWidth;
  const height = element.offsetHeight;

  canvas.width = width;
  canvas.height = height;
  canvas.style.width = `${width}`;
  canvas.style.height = `${height}`;

  const data = `
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <foreignObject width="100%" height="100%">
  ${element.innerHTML}
  </foreignObject>
  </svg>
  `;

  return { canvas, img: toImage(data, ctx) };
};

const toImage = (data, ctx) => {
  const DOMURL = window.URL || window.webkitURL || window;
  const img = new Image();
  const svg = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
  const url = DOMURL.createObjectURL(svg);
  img.onload = () => {
    ctx.drawImage(img, 0, 0);
    DOMURL.revokeObjectURL(url);
  };

  img.src = url;
  return img;
};

const create = (type) => {
  const { img, canvas } = HtmlToCanvas(elementToCanvas);
  switch (type) {
    case 'image':
      return root.appendChild(img);
    case 'canvas':
      return root.appendChild(canvas);
    default:
      return null;
  }
};

createImage.addEventListener('click', () => create('image'));
createCanvas.addEventListener('click', () => create('canvas'));
