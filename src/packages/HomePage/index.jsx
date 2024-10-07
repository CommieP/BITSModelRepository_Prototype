import { useSelector } from "react-redux"

const HomePage = () => {
    const formData = useSelector(state => state.formData);
    console.log(formData);
    return (
        <>
            <div>
                BITS Design 3D Model Repository
            </div>
            <br></br>
            <div>
                <button>Submit New Model</button>
                <br/>
                <br/>
                <button>View Models</button>
            </div>
        </>
    )
}

export default HomePage