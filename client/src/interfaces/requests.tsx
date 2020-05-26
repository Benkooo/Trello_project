

export interface BasicResponse {
    success: boolean;
    message: string;
}

export interface LoginResponse extends BasicResponse{
    username: string;
    unique_login: string;
}

// export type RegisterRequest = LoginRequest;
// export type RegisterResponse = BasicResponse;

// export interface LoginResponse extends BasicResponse {
//     token: string;
// }
