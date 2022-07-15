import utility from './Utility'

export default {
    buildRows(jsonData) {
        var tempRow = []
        if (typeof jsonData === 'object' && jsonData != null && Object.keys(jsonData).length > 0) {
            if (Array.isArray(jsonData)) {
                for (let rowElement of jsonData) {
                    tempRow.push(this.buildRows(rowElement))
                }
                return tempRow.join("\n")
            } else {
                for (let element of Object.keys(jsonData)) {
                    //more logic
                    if (Array.isArray(jsonData[element])) {
                        let mm = "{" + JSON.stringify(element) + ":" + JSON.stringify(jsonData[element]) + "}";
                        var cellString = ''
                        tempRow.push(this.buildCell(JSON.parse(mm), cellString))
                    } else {
                        var cellString = ""
                        tempRow.push(this.buildCell(jsonData[element], cellString))
                    }
                }
                return ("|" + tempRow.join("|") + "|")
            }

        } else {
            throw errow("wrong data type")
        }
    },
    buildCell(propObject, stringBuilder) {
        let tempArray = []
        if (typeof propObject === 'object' && propObject != null) {
            for (let prop of Object.keys(propObject)) {
                if (typeof propObject[prop] === 'object' && !Array.isArray(propObject[prop])) {
                    if (propObject[prop] == null) {
                        var m = " "
                    } else {
                        var m = "" + this.buildCell(propObject[prop], stringBuilder)

                    }
                    stringBuilder = "!-" + prop.toString() + "-!:" + m
                } else if (Array.isArray(propObject[prop])) {
                    if (propObject[prop].length > 0) {
                        let arrayObject = propObject[prop]
                        let tempArray1 = []
                        for (let item of arrayObject) {
                            var m = this.buildCell(item, stringBuilder)
                            if (typeof item === 'object') {
                                tempArray1.push("!-" + prop.toString() + "[" + arrayObject.indexOf(item) + "]-!:" + m)
                            } else {
                                //case array with not a object
                                tempArray1.push("!-" + prop.toString() + "[" + arrayObject.indexOf(item) + "]-!:" + m)
                            }
                        }
                        stringBuilder = tempArray1.join(",")
                    } else {
                        //case empty array
                        stringBuilder = "!-" + prop.toString() + "-!:[]"
                    }
                } else {
                    stringBuilder = "!-" + prop.toString() + "-!:" + propObject[prop]
                }
                tempArray.push(stringBuilder)

            }
            return "!{" + tempArray.join() + "}"
        } else {

            return (propObject == null) ? " " : propObject.toString()
        }
    },
    buildHeader(jsonData) {
        var headerRow = []
        var header = ""

        if (typeof jsonData === 'object' && jsonData != null) {
            if (Array.isArray(jsonData)) {

                for (let m of Object.keys(jsonData[0])) {
                    console.log(m)
                    header = "!-" + m.toString() + "-!"
                    headerRow.push(header)
                }
            } else {
                for (let m of Object.keys(jsonData)) {
                    header = "!-" + m.toString() + "-!"
                    headerRow.push(header)
                }

            }
            return "|" + headerRow.join("|") + "|"
        } else {
            throw error("type error")
        }
    },
    buildTable(data) {
        let result = []
        let jsonData = (typeof data === 'string') ? JSON.parse(data) : data
        result.push(this.buildHeader(jsonData))
        result.push(this.buildRows(jsonData))
        return result.join("\n")
    },

    reformatTable(str) {
        var table = utility.splitStringToTable(str);
        //console.log(table)
        var max_length_per_column;
        max_length_per_column = utility.getMaxLengthPerColumn(table);
        return "\n" + table.map((row, row_index) => {
            return '|' + row.map((cell, column_index) => {
                var column_length = max_length_per_column[column_index]
                return utility.padRight(cell, column_length)
            }).join('|') + '|'
        }).join('\n') + '\n'
    }
}