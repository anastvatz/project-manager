import mongoose from 'mongoose';

const projectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
      unique: false,
    },
    date: {
      type: String,
      required: false,
    },
    time: {
        type: String,
        required: false,
      },
  },
  {
    timestamps: true,
  }
);


const Project = mongoose.model('Project', projectSchema);

export default Project;
