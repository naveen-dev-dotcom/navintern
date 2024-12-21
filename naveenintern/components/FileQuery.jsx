import React from "react";

const FileQuery = () => {
    return (
        <div className="container mt-3 w-50">
            <div className="card card-body shadow bg-body-tertiary-subtle">
                <div className="card-body">
                    <input type="text" className="form-control rounded-pill mb-1" id="exampleFormControlInput1" placeholder="Ask your Questions..." />
                    <div className="d-grid gap-2">
                        <button  className="btn mt-3 rounded-pill border border-primary"
  style={{ color: '#012970', backgroundColor: '#B5CFFF' }} type="submit">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FileQuery;