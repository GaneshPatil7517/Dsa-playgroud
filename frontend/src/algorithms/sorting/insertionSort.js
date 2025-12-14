// Insertion Sort - build sorted array by inserting elements one at a time
export function getInsertionSortSteps(arr) {
  const a = arr.slice()
  const steps = []
  const n = a.length

  for (let i = 1; i < n; i++) {
    const key = a[i]
    let j = i - 1
    steps.push({ type: 'setCurrent', index: i })

    while (j >= 0) {
      steps.push({ type: 'compare', indices: [j, j + 1] })
      if (a[j] > key) {
        steps.push({ type: 'swap', indices: [j, j + 1] })
        a[j + 1] = a[j]
        j--
      } else {
        break
      }
    }
    
    a[j + 1] = key
    steps.push({ type: 'markSorted', index: i })
  }
  
  return steps
}