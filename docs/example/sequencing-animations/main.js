/* promise链
const aliceTumbling = [
  { transform: 'rotate(0) scale(1)' },
  { transform: 'rotate(360deg) scale(0)' }
]

const aliceTiming = {
  duration: 2000,
  iterations: 1,
  fill: 'forwards'
}

const alice1 = document.querySelector('#alice1')
const alice2 = document.querySelector('#alice2')
const alice3 = document.querySelector('#alice3')

alice1
  .animate(aliceTumbling, aliceTiming)
  .finished.then((response) => {
    if (!response.pending) {
      return alice2.animate(aliceTumbling, aliceTiming).finished
    }
  })
  .then((response) => {
    if (!response.pending) {
      return alice3.animate(aliceTumbling, aliceTiming).finished
    }
  })
  .then((response) => {
    if (!response.pending) {
      console.log('ok')
      window.location.reload()
    }
  })
  .catch((error) => {
    console.error(error)
  })

*/

// async await
async function start() {
  const aliceTumbling = [
    { transform: 'rotate(0) scale(1)' },
    { transform: 'rotate(360deg) scale(0)' }
  ]

  const aliceTiming = {
    duration: 2000,
    iterations: 1,
    fill: 'forwards'
  }

  const alice1 = document.querySelector('#alice1')
  const alice2 = document.querySelector('#alice2')
  const alice3 = document.querySelector('#alice3')

  try {
    await alice1.animate(aliceTumbling, aliceTiming).finished
    await alice2.animate(aliceTumbling, aliceTiming).finished
    await alice3.animate(aliceTumbling, aliceTiming).finished
    window.location.reload()
  } catch (error) {
    console.error(error)
  }
}

start()
