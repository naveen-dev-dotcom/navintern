import React,{useState,useRef, useEffect} from "react";

const FileAnswer = () => {
    const [answer,setAnswer]= useState(['AIAnswer']);
    const answerBoxref = useRef(null);
    const handleQuery =()=>{
        setAnswer( (prevData)=>{
                return(
                    [...prevData,`Answer ${answer.length+1}`]
                ) 
            });
    }
    useEffect(()=>{
        if(answerBoxref){
            answerBoxref.current.scrollTop = answerBoxref.current.scrollHeight;
        }
         
    },[answer])

    return (
        <div className="container mt-3 mb-3 w-50">
            <div className="card card-body shadow bg-body-tertiary-subtle">
                <div className="card-body p-2">
                    <div className="container p-1 border border-primary text-left overflow-auto" style={{height:'100px',backgroundColor: '#B5CFFF' }} ref={answerBoxref}>
                     {answer.map((data,index)=>{
                         return(
                            <p key={index}>{data}</p>
                         )
                     })}
                    </div>
                    <button  className="btn mt-3 rounded-pill border border-primary"
  style={{ color: '#012970', backgroundColor: '#B5CFFF' }} onClick={handleQuery}>submit</button>
                </div>
            </div>
        </div>
    )
}

export default FileAnswer;