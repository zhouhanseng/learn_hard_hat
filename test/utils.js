async function getEventLogs(address, encode, type, n = 1) {
  const latestBlockNumber = await web3.eth.getBlockNumber()

  const fromBlockNumber = latestBlockNumber - n
  // await logBlockTimestamp(fromBlockNumber)
  // await logBlockTimestamp(latestBlockNumber)
  const ralLogs = await web3.eth.getPastLogs({
    address,
    topic: [web3.utils.sha3(encode)],
    fromBlock: fromBlockNumber,
    toBlock: latestBlockNumber,
  })
  const logs = ralLogs.map(log => web3.eth.abi.decodeParameters(type, log.data))
  return logs.length === 1 ? logs[0] : logs
}

module.exports = {
  getEventLogs
}