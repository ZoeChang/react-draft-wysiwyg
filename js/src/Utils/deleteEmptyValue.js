const deleteEmptyValue = (obj: Object) => {
  const cleaned = Object.keys(obj).reduce((accu, key) => {
    const value = obj[key]

    if (value === '') {
      return accu
    }

    if (value === undefined) {
      return accu
    }

    if (value === null) {
      return accu
    }

    // if value is NaN(Not-A-Number)
    if (value !== value) { // eslint-disable-line
      return accu
    }

    accu[key] = value
    return accu
  }, {})

  return cleaned
}

export default deleteEmptyValue
