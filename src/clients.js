latestData = []
clientIDList = []

function clearLatest() {
    setInterval(() => {
        latestData = [];
    }, 10 * 1000);
}

module.exports.clearLatest = clearLatest;
module.exports.pushData = (data) => {
    latestData.push(data);
}

module.exports.pushClientID = (id) => {
    clientIDList.push(id);
}
module.exports.removeClientID = (id) => {
    clientIDList.splice(clientIDList.indexOf(id), 1)
}