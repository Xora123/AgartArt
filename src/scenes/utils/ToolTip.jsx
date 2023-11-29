import { useRef } from "react";

export default function Tooltip( props ) {
    const tooltipRef = useRef( null );

    function handleMouseEnter() {
        if ( tooltipRef.current ) {
            tooltipRef.current.style.display = 'block';
        }
    }

    function handleMouseLeave() {
        if ( tooltipRef.current ) {
            tooltipRef.current.style.display = 'none';
        }
    }

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                    display:'flex',
                    alignItems:'center',
                    flexDirection:'row-reverse'
              }}
        >
            {props.children}
            <div
                ref={tooltipRef}
                style={{
                    display:'none',
                    width:'4rem'
                  }}
            >
                {props.tooltip}
            </div>
        </div>
    );
}