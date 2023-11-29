import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import "../LoadingScreen/LoadingScreen.css"

export const LoadingScreen = ( { isProgress } ) => {
  const { active, progress, errors, item, loaded, total } = useProgress()

  const [isTotal, setIsTotal] = useState( false )

  useEffect( () => {
    if ( progress === 100 ) {
      setTimeout( () => {
        setIsTotal( true )
      }, 3000 )

    }
  }, [total, progress] )

  return (
    <div className={`loadingScreen ${isTotal ? "loadingScreen--started" : ""}`}>
      <Oval
        height={80}
        width={80}
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel='oval-loading'
        secondaryColor="#4fa94d"
        strokeWidth={2}
        strokeWidthSecondary={2}

      />
    </div>
  )
};