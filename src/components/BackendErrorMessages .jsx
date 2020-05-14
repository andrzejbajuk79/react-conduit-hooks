import React from 'react'

export const BackendErrorMessages = ({backendErrors}) => {
 // console.log(backendErrors)
 const errorMessages = Object.keys(backendErrors).map((name, index) => {
  return (
   <li key={index}>
    {name} - {backendErrors[name]}
   </li>
  )
 })

 // const skladniki = Object.keys(ingredients).map((typeIngr) => {
 //  return [...Array(props.ingredients[typeIngr])].map((_, index) => {
 //   return <BurgerIngr key={typeIngr + index} type={typeIngr} />;
 //  });
 // });

 // console.log(errorMessages)
 return <ul className="error-messages">{errorMessages}</ul>
}

export default BackendErrorMessages
