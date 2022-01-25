// @ts-ignore
function createLineElement(x, y, length, angle) {
    var line = document.createElement("div");
    line.className = 'line';
    var styles = 'border: 1px solid #f76732; '
        + 'width: ' + length + 'px; '
        + 'height: 0px; '
        + '-moz-transform: rotate(' + angle + 'rad); '
        + '-webkit-transform: rotate(' + angle + 'rad); '
        + '-o-transform: rotate(' + angle + 'rad); '
        + '-ms-transform: rotate(' + angle + 'rad); '
        + 'position: absolute; '
        + 'top: ' + y + 'px; '
        + 'left: ' + x + 'px; ';
    line.setAttribute('style', styles);
    return line;
}

const linesMap = {};

export function createLine(prefix, x1, y1, x2, y2) {
    y1 = scrollY + y1;
    y2 = scrollY + y2;

    var a = x1 - x2,
        b = y1 - y2,
        c = Math.sqrt(a * a + b * b);

    var sx = (x1 + x2) / 2,
        sy = (y1 + y2) / 2;

    var x = sx - c / 2,
        y = sy;

    var alpha = Math.PI - Math.atan2(-b, a);

    setTimeout(() => {
        const key = `${prefix}-${x1}-${y1}-${x2}-${y2}`;

        if (linesMap[key]) {
            linesMap[key].parentNode.removeChild(linesMap[key]);
        }

        const element = createLineElement(x, y, c, alpha);
        linesMap[key] = element;

        document.body.appendChild(element);
    }, 100);
}

