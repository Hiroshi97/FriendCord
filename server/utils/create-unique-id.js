const createUniqueID = (_id1, _id2) => {
    // let time1 = _id1.getTimestamp().getTime();
    // let time2 = _id2.getTimestamp().getTime();
    // let last3bytes1 = _id1.toString().slice(-3);
    // let last3bytes2 = _id2.toString().slice(-3);
    // if (time1===time2)
     
    return _id1.toString().localeCompare(_id2.toString()) === -1 ? _id1 + _id2 : _id2 + _id1;
}

module.exports = { createUniqueID };