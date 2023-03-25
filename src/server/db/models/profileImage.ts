import {Schema, models, model, Model} from "mongoose";

interface IProfileImage {
    uname: string;
    img: string;
}

const profileImageSchema: Schema = new Schema<IProfileImage>({
  uname: {
    type: String,
    required: true,
    unique: true
  },
  img: {
        type: String,
        required: true,
        default: ''
    }
});

var ProfileImageModel = (models.profileImage as Model<IProfileImage>) || 
    model<IProfileImage>('profileImage', profileImageSchema);

    export default ProfileImageModel;