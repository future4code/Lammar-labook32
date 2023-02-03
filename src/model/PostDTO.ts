export interface PostInputDTO {
    photo: string, 
    description: string, 
    type: POST_TYPES, 
    authorId: string 
}

export interface InsertPostInputDTO {
    id: string,
    photo: string, 
    description: string, 
    type: POST_TYPES, 
    author_id:string 
}