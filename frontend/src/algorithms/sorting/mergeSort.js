// Merge Sort - divide and conquer sorting algorithm
export function getMergeSortSteps(arr) {
  const steps = []
  const a = arr.slice()

  function merge(left, mid, right) {
    const leftArr = []
    const rightArr = []
    
    for (let i = left; i <= mid; i++) leftArr.push(a[i])
    for (let i = mid + 1; i <= right; i++) rightArr.push(a[i])

    let i = 0, j = 0, k = left

    while (i < leftArr.length && j < rightArr.length) {
      steps.push({ type: 'compare', indices: [left + i, mid + 1 + j] })
      if (leftArr[i] <= rightArr[j]) {
        a[k] = leftArr[i]
        steps.push({ type: 'overwrite', index: k, value: leftArr[i] })
        i++
      } else {
        a[k] = rightArr[j]
        steps.push({ type: 'overwrite', index: k, value: rightArr[j] })
        j++
      }
      k++
    }

    while (i < leftArr.length) {
      a[k] = leftArr[i]
      steps.push({ type: 'overwrite', index: k, value: leftArr[i] })
      i++
      k++
    }

    while (j < rightArr.length) {
      a[k] = rightArr[j]
      steps.push({ type: 'overwrite', index: k, value: rightArr[j] })
      j++
      k++
    }
  }

  function mergeSort(left, right) {
    if (left < right) {
      const mid = Math.floor((left + right) / 2)
      steps.push({ type: 'divide', indices: [left, mid, right] })
      mergeSort(left, mid)
      mergeSort(mid + 1, right)
      merge(left, mid, right)
      steps.push({ type: 'merge', indices: [left, right] })
    }
  }

  mergeSort(0, a.length - 1)
  return steps
}