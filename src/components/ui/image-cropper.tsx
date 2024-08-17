import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from "./dialog";
import { Button } from "./button";
import { useRef } from "react";

interface ImageCropperProps {
    children: React.ReactNode;
    imgSrc?:any;
    open: boolean;
    setOpen: (open: boolean) => void;
}

const ImageCropper = ({ children,imgSrc ,open,setOpen}: ImageCropperProps) => {
    const cropperRef = useRef(null);
    // const [croppedImg, setCroppedImg] = useState("");

    // const onCrop = () => {
    //     const imageElement = cropperRef?.current;
    //     const cropper = imageElement?.cropper;
    //     setCroppedImg(cropper.getCroppedCanvas().toDataURL());
    // };

    return (
        <Dialog
        open={open}
        onOpenChange={setOpen}
        // showModal={showModal}
        // onSaveHandler={() => onSaveHandler(croppedImg)}
        // onModalClose={onModalClose}
        >
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent
                className="w-full"
            >
                <div className="w-full h-full">
                {
                    imgSrc &&     
                    <Cropper
                    src={imgSrc}
                    style={{ height: 500, width: "432px" }}
                    initialAspectRatio={16 / 9}
                    // guides={false}
                    dragMode="move"
                    // crop={onCrop}
                    ref={cropperRef}
                    viewMode={1}
                    // guides={true}
                    minCropBoxHeight={10}
                    minCropBoxWidth={10}
                    background={false}
                    responsive={true}
                    autoCropArea={1}
                    aspectRatio={4 / 3}
                    checkOrientation={false}
                />
                }
            
                </div>  


                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>

        </Dialog>
    );
};
export default ImageCropper;