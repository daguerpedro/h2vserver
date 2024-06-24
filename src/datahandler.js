latestData = []

function clearLatest() {
    setInterval(() => { 
        latestData.splice(0, latestData.length)
    }, 30 * 1000);
}

module.exports.clearLatest = clearLatest;
module.exports.pushData = (data) => {
    latestData.push(data);
}
module.exports.latestData = latestData;