


async function exportData(jsObject, directory){
    console.log('exporting');
    exportData = require('./export.js')
    let exportJSON = await exportData.exportDataJSON(jsObject, directory)
}

module.exports.exportResult = async function exportResult(indicatorFunction, parameter, directory){
    const indicatorResult = await indicatorFunction(parameter);
    exportData(indicatorResult, directory);
}

module.exports.showResult = async function showResult(indicatorFunction, parameter){
    const indicatorResult = await indicatorFunction(parameter);
    console.log(indicatorResult);
}