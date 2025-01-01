function handleResize() {
    const pixels = document.getElementById('pixels');
    pixels.innerHTML = '';
    pixels.style['width'] = '';
    const fragment = document.createDocumentFragment();
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

    const grid = window.matchMedia("(max-width: 600px)").matches ? 25 : 80;

    let newWidth = Math.ceil(availableWidth / grid) * grid
    pixels.style['width'] = `${newWidth}px`;

    let pixelSize = newWidth / grid;
    let cols = newWidth / pixelSize;
    let rows = Math.floor(availableHeight / pixelSize);

    for (let r = 0; r < rows; r++) {
        for (let p = 0; p < cols; p++) {
            const pixelDiv = document.createElement('div');
            pixelDiv.classList.add('pixel');
            pixelDiv.style.height = `${pixelSize}px`;
            pixelDiv.style.width = `${pixelSize}px`;

            let randomNumber = Math.random()
            let prob = (1 - (r / rows)) * (p / grid);
            pixelDiv.style.opacity = randomNumber < prob ? '1' : '0';
    
            fragment.appendChild(pixelDiv);
        }
    }

    pixels.appendChild(fragment);

    console.log("resized");
}

onresize = (event) => { handleResize(); console.log(".") };
handleResize();