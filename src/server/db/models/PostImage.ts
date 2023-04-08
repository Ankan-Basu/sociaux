import {Schema, models, model, Model} from "mongoose";

export interface IPostImage {
    img: string;
}
// reference of this image will be stored in the post
const postImageSchema: Schema = new Schema<IPostImage>({
  img: {
        type: String,
        required: true,
        default: ''
    }
});

const PostImageModel = (models.postImage as Model<IPostImage>) || 
    model<IPostImage>('postImage', postImageSchema);

export default PostImageModel;