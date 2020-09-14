const createUniqueID = (_id1, _id2) => {   
    return _id1.toString().localeCompare(_id2.toString()) === -1 ? _id1 + _id2 : _id2 + _id1;
}

module.exports = { createUniqueID };