
function sendError(res, error){
    res.setStatus(500)
    res.send({error})
}


module.exports = {
    sendError
}