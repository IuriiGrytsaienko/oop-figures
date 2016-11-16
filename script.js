class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static random(from, to) {
        return new Point(getRandomArbitary(from, to), getRandomArbitary(from, to))
    }
}

class Line {
    constructor(point1, point2) {
        this.x1 = point1.x;
        this.y1 = point1.y;
        this.x2 = point2.x;
        this.y2 = point2.y;
    }

    get length() {
        const dx = this.x2 - this.x1;
        const dy = this.y2 - this.y1;
        return Math.sqrt(dx * dx + dy * dy);
    }
}

class Ellipse {
    constructor(rectangle) {
        this._majorAxis = (rectangle._right - rectangle._left) / 2;
        this._smallerAxis = (rectangle._top - rectangle._bottom) / 2;
        this._centerPoint = new Point(rectangle._left + this._majorAxis, rectangle._bottom + this._smallerAxis)
    }

    isCircle() {
        return this._smallerAxis === this._majorAxis
    };

    contains(point) {
        return (((point.x - this._centerPoint.x) ** 2) / this._majorAxis / this._majorAxis +
            ((point.y - this._centerPoint.y) ** 2) / this._smallerAxis / this._smallerAxis) < 1;
    }

    get area() {
        return 3.14 * this._smallerAxis * this._majorAxis;
    }
}

class Rectangle {
    constructor(point1, point2) {
        this._top = maxmin(point1.y, point2.y, 1);
        this._bottom = maxmin(point1.y, point2.y, -1);
        this._right = maxmin(point1.x, point2.x, 1);
        this._left = maxmin(point1.x, point2.x, -1);
        this._width = this._right - this._left;
        this._height = this._top - this._bottom;
    }

    isSquare() {
        return this._top - this._bottom === this._right - this._left
    }

    get area() {
        return this._width * this._height;
    }

    intersect(rectangle) {
        if (!((this.left >= rectangle.right) || (this.right <= rectangle.left) ||
            (this.top <= rectangle.bottom) || (this.bottom >= rectangle.top))) {
            var leftPoint = new Point(maxmin(this._left, rectangle._left, 1), maxmin(this._top, rectangle._top, -1));
            var rightPoint = new Point(maxmin(this._right, rectangle._right, -1), maxmin(this._bottom, rectangle._bottom, 1));
            return new Rectangle(leftPoint, rightPoint);
        }
    }
}

const getRandomArbitary = (min, max) => Math.floor(Math.random() * (max - min) + min);
const maxmin = (a, b, sign) => (a - b) * sign > 0 ? a : b;

let array = [];

let rectangle1 = new Rectangle(Point.random(0, 100), Point.random(0, 100));
let rectangle2 = new Rectangle(Point.random(0, 100), Point.random(0, 100));

let resultRectangle = rectangle1.intersect(rectangle2);
while (array.length < 10) {
    if (typeof(resultRectangle) !== 'undefined') {
        let ell = new Ellipse(resultRectangle);
        let testPoint = Point.random(0, 100);
        if (ell.contains(testPoint)) {
            array.push(testPoint);
        }
    }
}

for (var key in array) {
    console.log(array[key]);
};
