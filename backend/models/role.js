import mongoose from "mongoose";
const permissionSchema = new mongoose.Schema({
  create: { type: Boolean, default: false },
  read: { type: Boolean, default: false },
  update: { type: Boolean, default: false },
  delete: { type: Boolean, default: false },
});
const roleSchema = mongoose.Schema({
  name: { type: String },
  permissions: {
    securities: permissionSchema,
    orders: permissionSchema,
    payments: permissionSchema,
    receipts: permissionSchema,
    expenses: permissionSchema,
    transactions: permissionSchema,
    roles: permissionSchema,
  },
});

const Role = mongoose.model("Role", roleSchema);
export default Role;
