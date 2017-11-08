
const INACTIVE = 0, IDLE = 1, ACTIVE = 2, ERROR = 3

const error = () => 'Random error with code ' + Math.ceil((Math.random() * 9)) * 1000

const randomStatus = () => {
  const status = Math.ceil(Math.random() * 4) - 1
  return {
    id: status,
    msg: status === ERROR ? error() : ''
  }
}

const randomOccupancy = (currentStatus, nextStatus, max, previousOccupancy) => {
  switch(nextStatus.id) {
    case ACTIVE:
    case ERROR:
      return currentStatus.id <= 1 && Math.random() > 0.5 ? Math.ceil(Math.random() * max) - 1 : previousOccupancy
    default: return 0
  }
}

module.exports = {
  randomStatus,
  randomOccupancy,
}
