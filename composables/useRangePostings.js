import { calcCrow } from '@/util/distanceBetweenCoords'

export function useRangePostings(range, postings, lat, long) {
  const inRange = []

  postings.forEach((posting) => {
    if (!posting?.address?.lat || !posting.address.long || !lat || !long) return
    const between = calcCrow(posting.address.lat, posting.address.long, lat, long)
    if (between <= range) inRange.push(posting)
  })

  return inRange
}
