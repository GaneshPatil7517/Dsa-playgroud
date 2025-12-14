// Selection Sort - repeatedly find minimum element and place it at the beginning
export function getSelectionSortSteps(arr) {
  const a = arr.slice()
  const steps = []
  const n = a.length

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i
    steps.push({ type: 'setCurrent', index: i })
    
    for (let j = i + 1; j < n; j++) {
      steps.push({ type: 'compare', indices: [minIdx, j] })
      if (a[j] < a[minIdx]) {
        minIdx = j
        steps.push({ type: 'setMin', index: minIdx })
      }
    }
    
    if (minIdx !== i) {
      steps.push({ type: 'swap', indices: [i, minIdx] })
      const tmp = a[i]
      a[i] = a[minIdx]
      a[minIdx] = tmp
    }
    
    steps.push({ type: 'markSorted', index: i })
  }
  
  steps.push({ type: 'markSorted', index: n - 1 })
  return steps
}