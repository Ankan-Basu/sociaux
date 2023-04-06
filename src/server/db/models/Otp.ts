import {Schema, models, model, type Model} from "mongoose";

interface IOtp {
    uname: string;
    otp: string;
    expireAt?: { type: Date,  expires: 11 };
}

const otpSchema: Schema = new Schema<IOtp>({
    uname: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    otp: {
        type: String,
        required: true
    },
    expireAt: { type: Date,  expires: 300 }
});

const OtpModel = (models.otp as Model<IOtp>) || 
    model<IOtp>('otp', otpSchema);

    export default OtpModel;