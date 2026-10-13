const pixels = document.getElementById('pixels');

const fillBackground = () => {
    pixels.innerHTML = '';
    pixels.style['width'] = '';

    const rect = pixels.getBoundingClientRect();
    const style = window.getComputedStyle(pixels);
    const padding = {
        left: parseFloat(style.paddingLeft),
        right: parseFloat(style.paddingRight),
        top: parseFloat(style.paddingTop),
        bottom: parseFloat(style.paddingBottom)
    };
    
    const availableWidth = rect.width - padding.left - padding.right;
    const availableHeight = rect.height - padding.top - padding.bottom;
    let cols = window.matchMedia("(max-width: 600px)").matches ? 15 : 50;
    let width = Math.floor(availableWidth / cols) * cols;
    let pixelSize = width / cols;
    let rows = Math.floor(availableHeight / pixelSize);

    pixels.style['width'] = `${width}px`;
    
    const fragment = document.createDocumentFragment();
    for (let r = 0; r < rows; r++) {
        for (let p = 0; p < cols; p++) {
            const pixel = document.createElement('div');
            pixel.classList.add('pixel');
            pixel.style.height = `${pixelSize}px`;
            pixel.style.width = `${pixelSize}px`;

            let prob = (1 - (r / rows)) * (p / cols);
            pixel.style.opacity = Math.random() < prob ? '1' : '0';
    
            fragment.appendChild(pixel);
        }
    }

    pixels.appendChild(fragment);
}

window.addEventListener('resize', fillBackground);
fillBackground();
