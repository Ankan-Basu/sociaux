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

var ImageModel = (models.image as Model<IImage>) || 
    model<IImage>('image', imageSchema);

    export default ImageModel;