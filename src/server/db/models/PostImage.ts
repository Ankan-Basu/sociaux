import {Schema, models, model, Model} from "mongoose";

interface IPostImage {
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

var PostImageModel = (models.postImage as Model<IPostImage>) || 
    model<IPostImage>('postImage', postImageSchema);

    export default PostImageModel;