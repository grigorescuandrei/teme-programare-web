function getDescendantsOfType(ancestor, type) {
    type = type.toUpperCase();
    let children = ancestor.childNodes
    if (children.length == 0)
        return []
    let descendants = []
    for (let i = 0; i < children.length; i++) {
        if (children[i].tagName == type)
            descendants.push(children[i])
    }
    for (let i = 0; i < children.length; i++) {
        descendants = descendants.concat(getDescendantsOfType(children[i], type))
    }
    return descendants
}

let tables = document.getElementsByClassName("vertical-header-table");
for (let i = 0; i < tables.length; i++) {
    let table = tables[i]
    let tableCells = table.children[0].children
    let headers = getDescendantsOfType(table, "th")
    let recordData = []
    let row = headers[0].parentNode
    for (let j = 1; j < row.children.length; j++) {
        let values = []
        for (let k = 0; k < tableCells.length; k++) {
            values.push(tableCells[k].children[j].innerHTML)
        }
        recordData.push(values)
    }
    for (let j = 0; j < headers.length; j++) {
        let header = headers[j]
        header.sorted = "unsorted"
        header.headerIndex = j
        header.onclick = function() {
            for (let k = 0; k < headers.length; k++) {
                if (j==k)
                    continue
                headers[k].sorted = "unsorted"
                headers[k].className = ""
            }
            if (header.sorted == "unsorted" || header.sorted == "desc") {
                header.sorted = "asc"
                header.className = "h-asc-sorted"
            } else {
                header.sorted = "desc"
                header.className = "h-desc-sorted"
            }
            let tableDatas = getDescendantsOfType(table, "td")
            for (let k = 0; k < tableDatas.length; k++) {
                let tableData = tableDatas[k]
                tableData.parentNode.removeChild(tableData)
            }
            let valueType = isNaN(parseInt(recordData[0][j])) ? "string" : "numerical"
            let cmp = function(a, b) {
                return a[header.headerIndex] - b[header.headerIndex]
            }
            if (valueType == "string") {
                recordData.sort()
            } else {
                recordData.sort(cmp)
            }
            if (header.sorted == "desc") {
                recordData.reverse()
            }
            for (let k = 0; k < recordData.length; k++) {
                let record = recordData[k]
                for (let l = 0; l < record.length; l++) {
                    let td = document.createElement("td")
                    td.innerHTML = record[l]
                    tableCells[l].appendChild(td)
                }
            }
        }
    }
}


let tables2 = document.getElementsByClassName("horizontal-header-table");
for (let i = 0; i < tables2.length; i++) {
    let table = tables2[i]
    let tableCells = table.children[0].children
    let headers = getDescendantsOfType(table, "th")
    let recordData = []
    for (let j = 1; j < tableCells.length; j++) {
        let values = []
        for (let k = 0; k < tableCells[j].children.length; k++) {
            values.push(tableCells[j].children[k].innerHTML)
        }
        recordData.push(values)
    }
    for (let j = 0; j < headers.length; j++) {
        let header = headers[j]
        header.sorted = "unsorted"
        header.headerIndex = j
        header.onclick = function() {
            for (let k = 0; k < headers.length; k++) {
                if (j==k)
                    continue
                headers[k].sorted = "unsorted"
                headers[k].className = ""
            }
            if (header.sorted == "unsorted" || header.sorted == "desc") {
                header.sorted = "asc"
                header.className = "v-asc-sorted"
            } else {
                header.sorted = "desc"
                header.className = "v-desc-sorted"
            }
            let tableDatas = getDescendantsOfType(table, "td")
            for (let k = 0; k < tableDatas.length; k++) {
                let tableData = tableDatas[k]
                tableData.parentNode.removeChild(tableData)
            }
            let valueType = isNaN(parseInt(recordData[0][j])) ? "string" : "numerical"
            let cmp = function(a, b) {
                return a[header.headerIndex] - b[header.headerIndex]
            }
            if (valueType == "string") {
                recordData.sort()
            } else {
                recordData.sort(cmp)
            }
            if (header.sorted == "desc") {
                recordData.reverse()
            }
            for (let k = 0; k < recordData.length; k++) {
                let record = recordData[k]
                for (let l = 0; l < record.length; l++) {
                    let td = document.createElement("td")
                    td.innerHTML = record[l]
                    tableCells[k + 1].appendChild(td)
                }
            }
        }
    }
}