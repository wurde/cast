function withCatch(promise) {
    return promise
        .then(data => [null, data])
        .catch(err => [err])
}

module.exports = withCatch