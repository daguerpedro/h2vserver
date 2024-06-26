latestData = []
maxLatest = 30;

module.exports.pushData = (data) => {
    latestData.push(data);
    if(this.latestData.length > maxLatest)
    {
        let remove = (this.latestData.length - maxLatest)
        this.latestData.splice(0, remove);
    }
}
module.exports.latestData = latestData;