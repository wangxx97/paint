var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');  //获取二次元上下文
var lineWidth = 5

autocanvasSize(yyy)

//1********************************
listenToUser(yyy)

//2********************************
var eraserEnabled = false

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
pen.onclick = function () {
    eraserEnabled = false
    pen.classList.add('active')  //pen添加一个active
    eraser.classList.remove('active')  //eraser消掉一个active
}
eraser.onclick = function () {
    eraserEnabled = true
    eraser.classList.add('active')
    pen.classList.remove('active')  //pen添加一个active
}
clear.onclick = function () {
    context.clearRect(0, 0, yyy.width, yyy.height);
//    画提个大的正方形，这个正方形和canvas一般大
}
download.onclick = function () {
    var url = yyy.toDataURL("image/png")
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = '我的画'
    a.target = '_blank'
    a.click()
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
red.onclick = function () {
    context.fillStyle = 'red'
    context.strokeStyle = 'red'
    red.classList.add('active')
    green.classList.remove('active')
    yellow.classList.remove('active')
    pink.classList.remove('active')
    blue.classList.remove('active')
    purple.classList.remove('active')
    black.classList.remove('active')
}
green.onclick = function () {
    context.fillStyle = 'green'
    context.strokeStyle = 'green'
    green.classList.add('active')
    red.classList.remove('active')
    yellow.classList.remove('active')
    pink.classList.remove('active')
    blue.classList.remove('active')
    purple.classList.remove('active')
    black.classList.remove('active')
}
yellow.onclick = function () {
    context.fillStyle = 'yellow'
    context.strokeStyle = 'yellow'
    yellow.classList.add('active')
    red.classList.remove('active')
    green.classList.remove('active')
    pink.classList.remove('active')
    blue.classList.remove('active')
    purple.classList.remove('active')
    black.classList.remove('active')
}
pink.onclick = function () {
    context.fillStyle = 'pink'
    context.strokeStyle = 'pink'
    pink.classList.add('active')
    red.classList.remove('active')
    green.classList.remove('active')
    yellow.classList.remove('active')
    blue.classList.remove('active')
    purple.classList.remove('active')
    black.classList.remove('active')
}
blue.onclick = function () {
    context.fillStyle = 'blue'
    context.strokeStyle = 'blue'
    blue.classList.add('active')
    red.classList.remove('active')
    green.classList.remove('active')
    yellow.classList.remove('active')
    pink.classList.remove('active')
    purple.classList.remove('active')
    black.classList.remove('active')
}
purple.onclick = function () {
    context.fillStyle = 'purple'
    context.strokeStyle = 'purple'
    purple.classList.add('active')
    red.classList.remove('active')
    green.classList.remove('active')
    yellow.classList.remove('active')
    pink.classList.remove('active')
    blue.classList.remove('active')
    black.classList.remove('active')
}
black.onclick = function () {
    context.fillStyle = 'black'
    context.strokeStyle = 'black'
    black.classList.add('active')
    red.classList.remove('active')
    green.classList.remove('active')
    yellow.classList.remove('active')
    pink.classList.remove('active')
    blue.classList.remove('active')
    purple.classList.remove('active')
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
thin.onclick = function () {
    lineWidth = 5
}
thick.onclick = function () {
    lineWidth = 10
}


//3*******************************
function autocanvasSize(canvas) {
    setCanvasSize()

    window.onresize = function () {
        setCanvasSize()
    }

    function setCanvasSize() {
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight

        canvas.width = pageWidth
        canvas.height = pageHeight
    }
}

//画一个圆形
function drawCircle(x, y, radius) {
    context.beginPath()
    // context.fillStyle = 'black'
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill()
}

function drawLine(x1, y1, x2, y2) {
    context.beginPath();   //开始划线
    //context.strokeStyle = 'black'   //线的颜色
    context.moveTo(x1, y1);    //把鼠标滑动到0,0   起点
    context.lineWidth = lineWidth   //线的粗细是5
    context.lineTo(x2, y2);  //横着画到200,0    终点
    context.stroke()     //描边
    context.closePath()   //关闭
}

/**********************************/
function listenToUser(canvas) {

    var using = false
    var lastPoint = {
        x: undefined,
        y: undefined
    }
    //特性检测
    if (document.body.ontouchstart !== undefined) {
        //触屏设备
        canvas.ontouchstart = function (aaa) {
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY
            console.log(x, y)
            using = true
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = {
                    "x": x,
                    "y": y
                }
            }
        }

        canvas.ontouchmove = function (aaa) {
            console.log('边摸边动')
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY
            if (!using) {
                return
            }
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                var newPoint = {
                    "x": x,
                    "y": y
                }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }

        canvas.ontouchend = function () {
            console.log('摸完了')
            using = false

        }

    } else {
        //非触屏设备
        canvas.onmousedown = function (aaa) {
            var x = aaa.clientX
            var y = aaa.clientY
            using = true
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = {
                    "x": x,
                    "y": y
                }
            }
        }
        canvas.onmousemove = function (aaa) {
            var x = aaa.clientX
            var y = aaa.clientY

            if (!using) {
                return
            }
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                var newPoint = {
                    "x": x,
                    "y": y
                }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }
        canvas.onmouseup = function (aaa) {
            using = false
        }
    }
}


