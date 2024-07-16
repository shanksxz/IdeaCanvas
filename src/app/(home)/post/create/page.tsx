"use client"

import { useForm, SubmitHandler } from "react-hook-form"
import { Input } from '~/components/ui/input'
import { Button } from "~/components/ui/button"
import { Label } from "~/components/ui/label"
import { useRouter } from "next/navigation"
import { createPost } from "~/actions/posts"
import { ChangeEvent, useState } from "react"
import { formProps } from "~/types"
import { toast } from "sonner"
import { useUploadThing } from "~/utils/uploadthing"
import { Textarea } from "~/components/ui/textarea"

export default function Page() {

    const router = useRouter()
    const {
        startUpload,
    } = useUploadThing("imageUploader")

    const [file, setFile] = useState<File | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<formProps>()



    const onSubmit: SubmitHandler<formProps> = async (data) => {
        try {
            if (!file) {
                toast.error('Please upload an image')
                return;
            }

            const uploadRes = await startUpload([file]);
            if(uploadRes && uploadRes.length > 0) {
                const [res] = uploadRes;
                const response = await createPost({
                    title: data.title,
                    content: data.content,
                    img: res?.url
                })
                if (response.status === 200) {
                    toast.success('Sucessfully created the post, redirecting in 3sec')
                    setTimeout(() => {
                        router.push('/blog')
                    }, 3000)
                    return
                }
                toast.error(`Error creating post: ${response.message}`)
            }

            }
        catch (error) {
            console.error('Error submitting form:', error);
        }
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0])
        }
    }

    return (
        <form className="rounded-md flex flex-col gap-10" onSubmit={handleSubmit(onSubmit)}>
            <Label className="flex flex-col gap-2 lg:w-1/3">
                Title
                <Input
                    type="text"
                    className="p-2"
                    placeholder="Enter title"
                    {...register("title", {
                        required: true,
                    })}
                />
                {errors.title && (
                    <p className="text-red-500">
                        title cannot be empty
                    </p>
                )}
            </Label>

            <Label className="flex flex-col gap-2">
                Featured Image
                <Input
                    type="file"
                    placeholder=""
                    className="lg:w-2/3"
                    {...register("file", { onChange: handleFileChange, required : true })}
                />
            </Label>

            {file && <img src={URL.createObjectURL(file)} />}

            <Label className="flex flex-col gap-2">
                Content
                <Textarea
                    className="p-2"
                    placeholder="Enter content"
                    rows={10}
                    {...register("content", {
                        required: true,
                    })}
                />
            </Label>
            
            <div className="flex justify-end">
            <Button className='lg:w-1/6' type="submit">
                Publish
            </Button>
            </div>
        </form>
    )
}