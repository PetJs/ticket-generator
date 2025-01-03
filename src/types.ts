export interface FileWithPreview extends File {
    preview: string;  
}

export interface ValidationRules {
    required?: boolean;
    pattern?: RegExp;
    fileSize?: number;
    fileType?: string[];
}

export interface ValidationErrors {
    [key: string]: string;
}

export interface FormData {
    name: string;
    email: string;
    github: string;
    avatar?: File;
  }