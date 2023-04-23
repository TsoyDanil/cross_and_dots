import { useState, useEffect } from 'react'
import './App.css'
import FieldBlock from './components/FieldBlock/Field'

const App: React.FunctionComponent = (): React.ReactElement => {

  interface IBlockData{
    index: number
    textContent: string
  }

  const [isPlaying, setIsPlaying] = useState<boolean>(true)

  const [winner, setWinner] = useState<string>('')
  
  const [stepNumber, setStepNumber] = useState<number>(0)

  const [field, setField] = useState<IBlockData[]>(
    [
      { 
        index: 0,
        textContent: ''
      },
      {
        index: 1,
        textContent: ''
      },
      {
        index: 2,
        textContent: ''
      },
      {
        index: 3,
        textContent: ''
      },
      {
        index: 4,
        textContent: ''
      },
      {
        index: 5,
        textContent: ''
      },
      {
        index: 6,
        textContent: ''
      },
      {
        index: 7,
        textContent: ''
      },
      {
        index: 8,
        textContent: ''
      }
    ]
  )



  const winCombinations: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  const fillBlockHandler = (index: number) => {
    setStepNumber(stepNumber + 1)
    if (!isPlaying || field[index].textContent !== '') return
    const fieldHandler = [...field]
    if (stepNumber % 2 === 0){
      fieldHandler[index].textContent = 'X'
    } else{
      fieldHandler[index].textContent = 'O'
    }
    setField(fieldHandler)
  }

  const checkWinner = () => {
    for (let i = 0; i < winCombinations.length; i++){
      const winnerLine = winCombinations[i]
      if (
        field[winnerLine[0]].textContent === 'O' &&
        field[winnerLine[1]].textContent === 'O' && 
        field[winnerLine[2]].textContent === 'O'
      ){
        setWinner('O')
        setIsPlaying(false)
      } else if (
        field[winnerLine[0]].textContent === 'X' &&
        field[winnerLine[1]].textContent === 'X' && 
        field[winnerLine[2]].textContent === 'X'
      ){
        setWinner('X')
        setIsPlaying(false)
      }
    }
    if (stepNumber === 9){
      setWinner('None')
    }
  }

  const resetGame = () => {
    setField(
      [
        { 
          index: 0,
          textContent: ''
        },
        {
          index: 1,
          textContent: ''
        },
        {
          index: 2,
          textContent: ''
        },
        {
          index: 3,
          textContent: ''
        },
        {
          index: 4,
          textContent: ''
        },
        {
          index: 5,
          textContent: ''
        },
        {
          index: 6,
          textContent: ''
        },
        {
          index: 7,
          textContent: ''
        },
        {
          index: 8,
          textContent: ''
        }
      ]
    )
    setWinner('')
    setIsPlaying(true)
    setStepNumber(0)
  }

  useEffect(() => {
    checkWinner()
  }, [field])

  return (
    <>
      <div className='Field_container'>
        {
          winner.trim() !== '' ? <h1>{`Winner is: ${winner}`}</h1> : null
        }
        <div className='Playing_board'>
          {
            field.map((block: IBlockData) => {
              return <FieldBlock
                        key={block.index}
                        textContent={block.textContent}
                        fillBlock={() =>fillBlockHandler(block.index)}
                      />
            })
          }
        </div>
        <p>{`Step: ${stepNumber}`}</p>
        <button onClick={resetGame}>Reset</button>
      </div>
    </>
  )
}

export default App
