import { Schema,model } from 'mongoose'

const Token = new Schema({
    userId:({ type:Schema.Types.ObjectId, ref:'User' }),
    token:({ type: Schema.Types.String })
})

const UserToken = model('Token',Token)

export { UserToken }