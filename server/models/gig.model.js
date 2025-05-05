import mongoose from 'mongoose';
const { Schema } = mongoose;

const GigSchema = new Schema({
    userId:{
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true,
    },
    desc:{
        type: String,
        required: true,
    },
    totalStars:{
        type: Number,
        default: 0,
    },
    starNumber:{
        type: Number,
        default: 0,
    },
    cat:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    cover:{
        type: String,
        //true
        required: false,
    },
    images:{
        type: [String],
        required: false,
    },
    shortTitle:{
        type: String,
        //true
        required: false,
    },
    shortDesc:{
        type: String,
        //true
        required: false,
    },
    deliveryTime:{
        type: Number,
        //true
        required: false,
    },
    revisionNumber:{
        type: String,
        //true
        required: false,
    },
    features:{
        type: [String],
        required: false,
    },
    sales:{
        type: Number,
        default: 0,
    },
},
{
    timestamps: true
});

export default mongoose.model("Gig", GigSchema);