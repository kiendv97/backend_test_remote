export const success = (res, status) => (data) => {
  if (data) {
    data = {
      ...data,
      status: status || 200,
      statusText: 'SUCCESS',
      subStatus: 200,
      subStatusText: '',
      message: 'Get success'
    }
    res.status(status || 200).json(data)
  }
  // console.log('data', data);
  return data
}
export const failed = (res) => (data) => {
  res.status(500).json({
    data,
    status: 500,
    statusText: 'FAILED',
    subStatus: 500,
    subStatusText: '',
    message: 'Failed'
  })
}

export const notFound = (res) => (entity) => {
  if (entity) {
    return entity
  }
  res.status(404).end()
  return null
}

export const authorOrAdmin = (res, user, userField) => (entity) => {
  if (entity) {
    const isAdmin = user.role === 'admin'
    const isAuthor = entity[userField] && entity[userField].equals(user.id)
    if (isAuthor || isAdmin) {
      return entity
    }
    res.status(401).end()
  }
  return null
}
