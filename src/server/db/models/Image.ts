import {Schema, models, model, Model} from "mongoose";

interface IImage {
    img: string;
}

const imageSchema: Schema = new Schema<IImage>({
    img: {
        type: String,
        required: true,
        default: ''
    }
});

const ImageModel = (models.image as Model<IImage>) || 
    model<IImage>('image', imageSchema);

    export default ImageModel;