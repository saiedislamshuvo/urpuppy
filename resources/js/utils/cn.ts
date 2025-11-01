import { ClassValue } from "class-variance-authority/types";
import clsx from 'clsx'

export function cn(...inputs: ClassValue[]) {
    return clsx(inputs);
}
