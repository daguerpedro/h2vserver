
function getData(key, defaultData)
{
    let data = window.localStorage.getItem(key);
    return (data == null) ? defaultData : data;
}

function exist(key)
{
    return getData(key, null) != null;
}

function setData(key, value)
{
    window.localStorage.setItem(key, value);
}

function maxValues()
{
    return parseInt(getData('maxvalues', 60));
}

$(document).ready(function () {
    if(!exist("maxvalues"))
        setData("maxvalues", 60);
})
