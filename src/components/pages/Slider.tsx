// const [currentIndex, setCurrentIndex] = useState(0)
// import left from "../../assets/left.png"
// import right from "../../assets/right.png"
// import { useContext, useEffect, useState } from "react"
// import { Context } from "../App"
// import steam from "../store/steam"

// function Slider(): React.ReactNode {
//     const store = useContext(Context)
//     const [game, setGame] = useState(null)
//     const [load, setLoad] = useState(false)
    
//         useEffect(() => {
//             async function fetchData() {
//                 const gameData = await steam.game(id)
//                 //@ts-ignore
//                 await setGame(gameData[id].data)
//                 setLoad(true)
//             }
            
//             fetchData()
//         }, [])
//     return (
//         <div className="slider">
//         <img
//           src={right}
//           className="slider-next"
//           onClick={() => setCurrentIndex(currentIndex + 1)}
//         />
//         <img
//           src={left}
//           className="slider-prev"
//           onClick={() => setCurrentIndex(currentIndex - 1)}
//         />
//         {game.screenshots.map((image, index, arr) => {
//           let position = "next";
//           if (index == currentIndex) {
//             position = "active";
//           }
//           if (
//             index == currentIndex - 1 ||
//             (currentIndex == 0 && index == arr.length - 1)
//           ) {
//             position = "last";
//           }
    
//           return (
//             <>
//               <article className={position}></article>
//               <img className="slider-img" src={image.path_thumbnail} />
//             </>
//           );
//         })}
//         {/* <img src={right} className="slider-next" /> */}
//       </div>
//     )
// }
