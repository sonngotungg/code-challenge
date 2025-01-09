export const swapCoin = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true)
        }, 1000)
    })
}

export const swapCoinFailedCall = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject()
        }, 1000)
    })
}