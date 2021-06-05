let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

let x = aleatorio(500)
let y = aleatorio(500)

function gerarForma() {
    clear()
    let cores = ['white', 'orange', 'pink', 'red', 'blue', 'cyan', 'purple', 'green', 'yellow']
    let corStroke = aleatorio(cores.length)
    let corFill = aleatorio(cores.length)

    let numLinhas = aleatorio(11) + 2

    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.strokeStyle = cores[corStroke]
    ctx.fillStyle = cores[corFill]
    ctx.lineWidth = aleatorio(8)

    var forma = new construirForma(x, y, numLinhas, ctx.lineWidth, ctx.strokeStyle, ctx.fillStyle)

    console.log(forma)

    for (let i = 0; i < numLinhas; i++) {
        novaLinha()
    }

    ctx.closePath()
    ctx.fill()
    ctx.stroke()
    
}

function construirForma(x, y, numLinhas, lineWidth, strokeStyle, fillStyle) {
    this.xInicio = x,
    this.yInicio = y,
    this.numLinhas = numLinhas,
    this.lineWidth = lineWidth,
    this.strokeStyle = strokeStyle,
    this.fillStyle = fillStyle,
    this.vLinhas = novaLinha()
}

function aleatorio(valor) {
    let res = Math.floor(Math.random() * valor)
    return res
}

function novaLinha() {
    x = aleatorio(500)
    y = aleatorio(500)
    ctx.lineTo(x, y)
    return [x, y]
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}