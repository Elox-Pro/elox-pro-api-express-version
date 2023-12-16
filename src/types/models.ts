
export type User = {
    id: Number
    updatedAt: Date
    createdAt: Date
    role: String,
    credential: UserCredential
}

export type UserCredential = {
    id: Number
    updatedAt: Date
    createdAt: Date
    email: String
    phone: String
    username: String
    password: String
    emailVerified: Boolean
    phoneVerified: Boolean
    authMethod: String
    lastLoginAt: Date
    user: User
}