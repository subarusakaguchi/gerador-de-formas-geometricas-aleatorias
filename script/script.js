const CSS_COLOR_NAMES = ["aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgrey", "darkgreen", "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", "darkslategray", "darkslategrey", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", "dimgrey", "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "grey", "green", "greenyellow", "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgrey", "lightgreen", "lightpink", "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", "lightslategrey", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta", "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue", "purple", "rebeccapurple", "red", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "slategrey", "snow", "springgreen", "steelblue", "tan", "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen"];

var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')

var x = aleatorio(500)
var y = aleatorio(500)
var numLinhas


function copiar() {
    let code = document.getElementById('codigo')
    code.select()
    code.setSelectionRange(0, 99999)
    document.execCommand("copy")
    alert(`O seguinte texto foi copiado para a sua área de transferência: "${code.value}"`)
}

function gerarForma() {
    clear()
    let corStroke = aleatorio(CSS_COLOR_NAMES.length)
    let corFill = aleatorio(CSS_COLOR_NAMES.length)
    let inputLinhas = Number(document.getElementById('nLinhas').value)
    let inputWidth = Number(document.getElementById('wBorda').value)
    let inputCorBorda = (document.getElementById('corBorda').value).trim().toLowerCase()
    let inputCorPreenchimento = (document.getElementById('corPreenchimento').value).trim().toLowerCase()

    let verCor1 = verificarCor(inputCorBorda)
    let verCor2 = verificarCor(inputCorPreenchimento)

    numLinhas = inputLinhas > 0 ? inputLinhas:(aleatorio(8) + 2)

    ctx.beginPath()
    ctx.moveTo(x, y)
    if (verCor1) {
        ctx.strokeStyle = inputCorBorda
    } else {
        ctx.strokeStyle = CSS_COLOR_NAMES[corStroke]
    }
    if (verCor2) {
        ctx.fillStyle = inputCorPreenchimento
    } else {
        ctx.fillStyle = CSS_COLOR_NAMES[corFill]
    }
    ctx.lineWidth = inputWidth > 0 ? inputWidth:aleatorio(8)

    var forma = new construirForma(x, y, numLinhas, ctx.lineWidth, ctx.strokeStyle, ctx.fillStyle)

    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    escreverJS(forma)
}

function alterarCor(input) {
    let inputValue = input.value
    let corBorda = document.getElementById(input.id)
    let cor = inputValue.trim().toLowerCase()
    if (verificarCor(cor)) {
        corBorda.style.backgroundColor = `${cor}`
    } else {
        corBorda.style.backgroundColor = 'white'
    }
    if (cor == 'black') {
        corBorda.style.color = 'white'
    } else {
        corBorda.style.color = 'black'
    }
}

function verificarCor(cor) {
    if (CSS_COLOR_NAMES.includes(cor) || (cor.startsWith('#') && (cor.length === 7 || cor.length === 4))){
        return true
    } else {
        return false
    }
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
    let xInput = Number(document.getElementById('xInput').value)
    let yInput = Number(document.getElementById('yInput').value)
    if (xInput == 0 || yInput == 0) {
        xInput = 500
        yInput = 500
    }
    let xTaxa = xInput / 500
    let yTaxa = yInput / 500
    textarea.innerHTML = `let canvas = document.getElementById('canvas');\nlet ctx = canvas.getContext('2d');\nctx.beginPath();\nctx.moveTo(${f.xInicio * xTaxa}, ${f.yInicio * yTaxa});\nctx.strokeStyle = '${f.strokeStyle}';\nctx.fillStyle = '${f.fillStyle}';\nctx.lineWidth = ${f.lineWidth};\n`
    for (let i = 0; i < f.numLinhas; i++) {
        textarea.innerHTML += `ctx.lineTo(${f.vLinhas[i][0] * xTaxa}, ${f.vLinhas[i][1] * yTaxa});\n`
    }
    textarea.innerHTML += 'ctx.closePath();\nctx.fill();\nctx.stroke();'
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}