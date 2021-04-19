export interface Validate {
	phoneNumber: string;
	password: string;
}

export interface ValidateErrorProps{
    phoneNumber?: string;
	password?: string;
}