import { useState } from 'react';

function Square({value, onClick}) {
  return <button className='square' onClick={onClick}>{value}</button>;
}

function calculateWinner(squares) {
  const lines = [
   [0,1,2],
   [3,4,5],
   [6,7,8],
   [0,3,6],
   [1,4,7],
   [2,5,8],
   [0,4,8],
   [2,4,6]];

   for(let i=0; i<lines.length; i++) {
    const[a,b,c] = lines[i];
    if(squares[a] && squares[a] == squares[b] && squares[a] == squares[c]) {
      return squares[a];
    }
   }
   return null;
}

export default function Game() {
  //const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove]  = useState(0);
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    //setXIsNext(!xIsNext);
    const nextHistory = [...history.slice(0, currentMove+1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length-1);
  }

  function jumpTo(move) {
    setCurrentMove(move);
    //setXIsNext(move % 2 === 0);
    //
  }

  const moves = history.map((squares,move)=> 
    {
      let description;
      if(move>0) {
        description = "Go to move #" + move;        
      } else {
        description = "Go to game start";
      }
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
      )
    }
  ); 

  return (<div className='game'>
          <div className='game-board'>
            <Board currentMove={currentMove} squares={currentSquares} onPlay={handlePlay} />
          </div>
          <div className='game-info'>
            <ol>{moves}</ol>
          </div>  
        </div>);
}


function Board({currentMove, squares, onPlay}) {
  function handleClick(idx, onPlay) {
    if(squares[idx] || calculateWinner(squares)) return;

    const nextSquares = squares.slice();
    if(currentMove % 2 === 0) {
      nextSquares[idx] = 'X';    
    } else {
      nextSquares[idx] = 'O';    
    }
    onPlay(nextSquares);   
  }

  const winner = calculateWinner(squares);
  let status;
  
  if(winner) {
    status = "Winner: " + winner;
  } else {
    status = "Player: " + (currentMove % 2 === 0 ? "X":"O");
  }

  return (
    <>
      <div className='status'>You are at move {currentMove+1}</div>
      <div className='status'>{status}</div>
      
      <div className="board-row">
        
        <Square value={squares[0]} onClick={()=>handleClick(0, onPlay)}/>
        <Square value={squares[1]} onClick={()=>handleClick(1, onPlay)}/>
        <Square value={squares[2]} onClick={()=>handleClick(2, onPlay)}/>
      
      </div>
      
      <div className="board-row">
        <Square value={squares[3]} onClick={()=>handleClick(3, onPlay)}/>
        <Square value={squares[4]} onClick={()=>handleClick(4, onPlay)}/>
        <Square value={squares[5]} onClick={()=>handleClick(5, onPlay)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onClick={()=>handleClick(6, onPlay)}/>
        <Square value={squares[7]} onClick={()=>handleClick(7, onPlay)}/>
        <Square value={squares[8]} onClick={()=>handleClick(8, onPlay)}/>
      </div>  

    </>
  );
}