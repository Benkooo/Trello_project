

interface BasicResponse {
    success: boolean;
    message: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export type RegisterRequest = LoginRequest;
export type RegisterResponse = BasicResponse;

export interface LoginResponse extends BasicResponse {
    token: string;
}