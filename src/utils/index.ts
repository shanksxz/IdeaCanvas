// import { toast } from "@/components/ui/use-toast";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"
import { app } from "~/server/firebase"


export const fileUpload = async (file: File) => {
    try {
        const storage = getStorage(app)
        const imageRef = ref(storage, `images/${file.name}`)

        await uploadBytes(imageRef, file)

        const downloadURL = await getDownloadURL(imageRef);

        return downloadURL
    } catch (error) {
        console.log("Err in uploading")
    }
}

export const Response = <T>(status: number, message: string, data : T) => {
    return {
        status,
        message,
        data
    }
}

// export const toasts = (duration : number, title : string, description : string) => {
//     toast({
//         title,
//         description,
//         duration
//     })
// }