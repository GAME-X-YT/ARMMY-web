import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage {
    sender: 'user' | 'ai' | 'admin';
    text: string;
    timestamp: Date;
}

export interface ISupportTicket extends Document {
    userId: string;
    soldierId: string;
    status: 'pending_admin' | 'admin_active' | 'resolved';
    messages: IMessage[];
    createdAt: Date;
}

const messageSchema = new Schema<IMessage>({
    sender: { type: String, enum: ['user', 'ai', 'admin'], required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const supportTicketSchema = new Schema<ISupportTicket>({
    userId: { type: String, default: 'Anonymous' },
    soldierId: { type: String, default: 'N/A' },
    status: { type: String, enum: ['pending_admin', 'admin_active', 'resolved'], default: 'pending_admin' },
    messages: [messageSchema],
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<ISupportTicket>('SupportTicket', supportTicketSchema);