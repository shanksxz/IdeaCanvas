export type BlogProp = {
    id: string;
    title: string;
    content: string;
    authorId: string;
    createdAt: Date;
    updatedAt?: Date;
    img: string | null;
};

export type formProps = {
    title: string,
    content: string
    file: FileList
}   