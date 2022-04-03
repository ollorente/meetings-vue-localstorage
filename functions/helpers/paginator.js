module.exports = (l, p) => {
  const limit = l ? Number(l) : 10
  const page = p ? Number(p - 1) * l : 0
  return {
    limit,
    page
  }
}
