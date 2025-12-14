// This file provides a function that returns step-by-step actions for bubble sort.
// Each step is an object describing a comparison or a swap.

export function getBubbleSortSteps(arr) {
  const a = arr.slice()
  const steps = []
  const n = a.length
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({ type: 'compare', indices: [j, j + 1] })
      if (a[j] > a[j + 1]) {
        steps.push({ type: 'swap', indices: [j, j + 1] })
        const tmp = a[j]
        a[j] = a[j + 1]
        a[j + 1] = tmp
      }
    }
    steps.push({ type: 'markSorted', index: n - i - 1 })
  }
  return steps
}