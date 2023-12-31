export class UserRole {
    static readonly SYSTEM_ADMIN = "SYSTEM_ADMIN";
    static readonly COMPANY_OWNER = "COMPANY_OWNER";
    static readonly COMPANY_ADMIN = "COMPANY_ADMIN";
    static readonly COMPANY_CUSTOMER = "COMPANY_CUSTOMER";
}

export class AuthenticationMethod {
    static readonly EMAIL = "EMAIL";
    static readonly PHONE = "PHONE";
}

export class CodeType {
    static readonly AUTHENTICATION = "AUTHENTICATION";
}