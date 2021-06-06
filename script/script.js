let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

let x = aleatorio(500)
let y = aleatorio(500)
let numLinhas = aleatorio(11) + 2

function gerarForma() {
    clear()
    let cores = ['white', 'orange', 'pink', 'red', 'blue', 'cyan', 'purple', 'green', 'yellow']
    let corStroke = aleatorio(cores.length)
    let corFill = aleatorio(cores.length)

    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.strokeStyle = cores[corStroke]
    ctx.fillStyle = cores[corFill]
    ctx.lineWidth = aleatorio(8)

    var forma = new construirForma(x, y, numLinhas, ctx.lineWidth, ctx.strokeStyle, ctx.fillStyle)

    console.log(forma.vLinhas)

    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    escreverJS(forma)
}

function construirForma(x, y, numLinhas, lineWidth, strokeStyle, fillStyle) {
    this.xInicio = x,
    this.yInicio = y,
    this.numLinhas = numLinhas,
    this.lineWidth = lineWidth,
    this.strokeStyle = strokeStyle,
    this.fillStyle = fillStyle,
    this.vLinhas = desenharLinhas()
}

function aleatorio(valor) {
    let res = Math.floor(Math.random() * valor)
    return res
}

function desenharLinhas() {
    let vLinhas = []
    for (let i = 0; i < numLinhas; i++) {
        x = aleatorio(500)
        y = aleatorio(500)
        ctx.lineTo(x, y)
        vLinhas.push([x, y])
    }
    return vLinhas
}

function escreverJS(f) {
    let textarea = document.getElementById('codigo')
    textarea.innerHTML = `let canvas = document.getElementById('canvas');\n
let ctx = canvas.getContext('2d');\n
ctx.beginPath();\n
ctx.moveTo(${f.xInicio}, ${f.yInicio});\n
ctx.strokeStyle = '${f.strokeStyle}';\n
ctx.fillStyle = '${f.fillStyle}';\n
ctx.lineWidth = ${f.lineWidth};\n`
    for (let i = 0; i < f.numLinhas; i++) {
        textarea.innerHTML += `ctx.lineTo(${f.vLinhas[i][0]}, ${f.vLinhas[i][1]});\n`
    }
    textarea.innerHTML += 'ctx.closePath();\nctx.fill();\nctx.stroke();'
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}