import mongoose, { Schema } from 'mongoose'

const itemSchema = new Schema(
  {
    itemName: {
      type: String,
      required: true
    },
    itemType: {
      type: String,
      required: true,
      enums: ['weapon', 'armor', 'potion', 'scroll', 'ring', 'wand', 'staff', 'misc']
    },
    value: {
      type: Number,
      required: true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }

  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (obj, ret) => {
        delete ret._id
      }
    }
  }
)

itemSchema.index({ itemName: 1 })

itemSchema.methods = {
  view () {
    return {
      id: this.id,
      itemName: this.itemName,
      itemType: this.itemType,
      value: this.value,
      owner: this.owner,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}

const model = mongoose.model('Item', itemSchema)

export const itemModel = {
  itemName: model.schema.tree.itemName,
  itemType: model.schema.tree.itemType,
  value: model.schema.tree.value,
  owner: model.schema.tree.owner
}

export const schema = model.schema
export default model
