import React from 'react'

export default function NextQuestion({dispatch , answer}) {
  if (answer == null) {
    return null
  }
  return (
    <button className='btn btn-ui' 
    onClick={()=>{dispatch({type : "nextQuestions"})}}> next </button>
  )
}
