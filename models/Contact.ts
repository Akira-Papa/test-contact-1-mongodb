import mongoose, { Schema, Document } from 'mongoose';

export interface IContact extends Document {
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

const ContactSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'お名前は必須です'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'メールアドレスは必須です'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, '有効なメールアドレスを入力してください'],
  },
  message: {
    type: String,
    required: [true, 'メッセージは必須です'],
    trim: true,
    minlength: [10, 'メッセージは10文字以上で入力してください'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// モデルが既に存在するかチェック
const Contact = mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);

console.log("📋 Contact model initialized");

export default Contact;