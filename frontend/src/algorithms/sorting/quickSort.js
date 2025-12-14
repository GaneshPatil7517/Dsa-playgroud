// Quick Sort - partition-based divide and conquer algorithm
export function getQuickSortSteps(arr) {
  const a = arr.slice()
  const steps = []

  function partition(low, high) {
    const pivot = a[high]
    steps.push({ type: 'setPivot', index: high })
    let i = low - 1

    for (let j = low; j < high; j++) {
      steps.push({ type: 'compare', indices: [j, high] })
      if (a[j] < pivot) {
        i++
        if (i !== j) {
          steps.push({ type: 'swap', indices: [i, j] })
          const tmp = a[i]
          a[i] = a[j]
          a[j] = tmp
        }
      }
    }

    steps.push({ type: 'swap', indices: [i + 1, high] })
    const tmp = a[i + 1]
    a[i + 1] = a[high]
    a[high] = tmp

    steps.push({ type: 'markSorted', index: i + 1 })
    return i + 1
  }

  function quickSort(low, high) {
    if (low < high) {
      const pi = partition(low, high)
      quickSort(low, pi - 1)
      quickSort(pi + 1, high)
    } else if (low === high) {
      steps.push({ type: 'markSorted', index: low })
    }
  }

  quickSort(0, a.length - 1)
  return steps
}