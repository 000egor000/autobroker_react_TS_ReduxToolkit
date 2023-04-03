import { log } from 'console'
import { useEffect } from 'react'

const App: React.FC = () => {
  const A = [1, 2, 3, 4, 7, 0, 0, 9, 3, 1]
  const B = [0, 3, 5, 6]

  useEffect(() => {
    let C = A.filter((el) => !B.includes(el))

    let D: number[] = []

    A.map((el) => B.includes(el) && !D.includes(el) && D.push(el))
    console.log(D)
  }, [])

  return <div className="App"></div>
}

export default App
