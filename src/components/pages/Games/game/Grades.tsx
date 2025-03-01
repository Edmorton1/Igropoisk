import React, { memo, use, useEffect, useState } from "react"
import "../../../css/Grades.scss"
import { relationInterface, userInterface } from "../GameInterface"
import relationStore from "../../../store/relations"
import { toJS } from "mobx"
import CheckAuthFunc from "../../../hooks/checkAuthFunc"

interface GradesInterface {
    user: userInterface | null,
    relation?: relationInterface
}

function Grades({user, relation}: GradesInterface) {
    const stars = new Array(10).fill('')
    const [currentStar,setCurrentStar] = useState(relation ? Number(relation.grade) - 1 : -1)
    const [score, setScore] = useState(relation ? Number(relation.grade) -1 : -1)
    const [freeze, setFreeze] = useState(relation ? true : false)
    const [snackbar, checkAuth] = CheckAuthFunc()
    // console.log(currentStar, score, freeze)

    function starsRender(): React.ReactNode {
        console.log('stars')
        return stars.map((e, i) => (
            <span onMouseEnter={() => {setCurrentStar(i); setFreeze(false)}} onClick={() => checkAuth(() => {setScore(currentStar + 1); setFreeze(true); relationStore.gradeChange(currentStar + 1, relation.id)})} className={`${i <= currentStar ? freeze ? `star freeze` : `star current` : `star` }`} key={i}>★</span>
        ))
    }
    return (
        <>
            {snackbar}
            <div onMouseLeave={() => {setCurrentStar(score - 1); setFreeze(true)}}>{starsRender()}</div>
        </>
    )
}

export default memo(Grades)