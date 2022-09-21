import { ButtonSave, ButtonX } from "../../theme/styled-componets";
import { useState } from "react";
import {Image} from 'cloudinary-react'
import axios from "axios";
import Swal from 'sweetalert2'

export default function LoadImage({setImageScreen, setState}) {

    const [image, setImage] = useState([])
    const [buttonStatus, setButtonStatus] = useState(false)
    const [loading, setLoading] = useState(false)

    const uploadImage = () => {

        const formData = new FormData()
        formData.append('file', image[0])
        formData.append('upload_preset', 'pointOfSale')
        setLoading(true)

        axios.post('https://api.cloudinary.com/v1_1/dr5vseml3/image/upload', formData)
        .then((res) => {
            console.log(res)
            setState((oldstate) => ({...oldstate, image: res.data.secure_url}))
            setImageScreen(false)
            Swal.fire({
                title: '¡Hurra!',
                text: 'La imagen se ha cargado correctamente, recuerda guardar los cambios',
                icon: 'success'
              })
        })
    }

    return(
    <div
    style={{
        backgroundColor: "rgba(0,0,0, 0.9)",
        width: "100%",
        height: "100vh",
        zIndex: "20",
        position: "absolute",
        top: "0",
        left: "0",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}>
        <div
        style={{
            width: "50%",
            height: "50%",
            backgroundColor: "#fffffe",
            margin: "auto",
            position: "relative",
            zIndex: "10",
            borderRadius: "0.3rem",
            display: "flex",
            justifyContent: "center",
            alignCenter: "center",
            padding: "10px",
          }}
        >
        <ButtonX onClick={() => {
            setImageScreen(false);
        }}>X</ButtonX>
        <input type='file' onChange={(e) => {
            setImage(e.target.files)
            setButtonStatus(true);
        }}/>
        {loading && (
        <div>
            <p>Cargando...</p>
        </div>
        )}
        <ButtonSave disabled={buttonStatus === false} type='button' onClick={uploadImage}>Guardar</ButtonSave>

        
        </div>
    </div>)

}