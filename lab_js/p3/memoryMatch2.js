gameTable = document.getElementById("gameTable")

var n = 4
var nSquared = n**2

if (n%2 == 1) {
    alert("Game board size cannot be odd");
    throw new Error("Game board size cannot be odd");
}

var valuePool = [
    "http://www.cs.ubbcluj.ro/wp-content/uploads/Czibula-Gabriela.jpg",
    "http://www.cs.ubbcluj.ro/wp-content/uploads/Czibula-Istvan.jpg",
    "http://www.cs.ubbcluj.ro/wp-content/uploads/Diosan-Laura-300x400.jpg",
    "http://www.cs.ubbcluj.ro/wp-content/uploads/Motogna-Simona-133x100.jpg",
    "http://www.cs.ubbcluj.ro/wp-content/uploads/Boian-Rares-133x100.jpg",
    "http://www.cs.ubbcluj.ro/wp-content/uploads/Grigoreta-Cojocar.jpg",
    "http://www.cs.ubbcluj.ro/wp-content/uploads/Suciu-Mihai.jpg",
    "http://www.cs.ubbcluj.ro/wp-content/uploads/Bufnea-Darius.jpg",
    "http://www.cs.ubbcluj.ro/wp-content/uploads/Grebla-Horea.jpg",
    "http://www.cs.ubbcluj.ro/wp-content/uploads/Mircea-Gabriel-small.jpg",
    "http://www.cs.ubbcluj.ro/wp-content/uploads/Petrascu-Vladiela.jpg",
    "http://www.cs.ubbcluj.ro/wp-content/uploads/Mihis-Andreea.jpg",
    "http://www.cs.ubbcluj.ro/wp-content/uploads/Pop-Emilia.jpg",
    "http://www.cs.ubbcluj.ro/wp-content/uploads/Serban-Camelia.jpg",
    "http://www.cs.ubbcluj.ro/wp-content/uploads/Suciu-Dan.jpg",
    "http://www.cs.ubbcluj.ro/wp-content/uploads/Diana-Halita.jpg",
    "http://www.cs.ubbcluj.ro/wp-content/uploads/Vancea-Alexandru.jpg",
    "http://www.cs.ubbcluj.ro/wp-content/uploads/Andor-Camelia-Florina.jpg"
]
var values = []
for (let i = 0; i < nSquared/2; i++) {
    values.push(valuePool[i])
    values.push(valuePool[i])
}

for (let i = values.length-1; i > 0; i--) {
    let j = Math.floor(Math.random() * i)
    let k = values[i]
    values[i] = values[j]
    values[j] = k
}

var cells = []
for (let i = 0; i < n; i++) {
    let row = []
    for (let j = 0; j < n; j++) {
        row.push(values[i*n + j])
    }
    cells.push(row)
}

var tableCells = []
for (let i = 0; i < n; i++) {
    let row = []
    let tableRow = document.createElement("tr")
    gameTable.appendChild(tableRow)
    for (let j = 0; j < n; j++) {
        let tableData = document.createElement("td")
        tableData.style.backgroundImage = `url(\"${cells[i][j]}\")`
        tableRow.appendChild(tableData)
        let cover = document.createElement("div")
        cover.className = "cover"
        tableData.appendChild(cover)
        data = {
            row: i,
            column: j,
            cell: tableData,
            cover: cover
        }
        row.push(data)
    }
    tableCells.push(row)
}

var firstChoice = null;
var debounce = false;

for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        tableCells[i][j].cover.onclick = function () {
            if (debounce || tableCells[i][j].cover.style.backgroundColor == "transparent")
                return;
            tableCells[i][j].cover.style.backgroundColor = "transparent";
            if (firstChoice == null) {
                firstChoice = tableCells[i][j];
            } else {
                let i1 = firstChoice.row, j1 = firstChoice.column;
                let firstValue = cells[i1][j1]
                let i2 = tableCells[i][j].row, j2 = tableCells[i][j].column;
                let secondValue = cells[i2][j2]
                if (firstValue != secondValue) {
                    debounce = true;
                    setTimeout(function () {
                        firstChoice.cover.style.backgroundColor = "black";
                        tableCells[i][j].cover.style.backgroundColor = "black";
                        firstChoice = null;
                        debounce = false;
                    }, 1000)
                } else {
                    firstChoice = null;
                }
            }
        }
    }
}

