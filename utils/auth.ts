export interface Credentials {
    username: string;
    password: string;
}

export function getCredentials(userType: string): Credentials {
   const role = userType.trim();

   switch (role) {
    case 'STANDARD_USER':
        return {
            username: process.env.STANDARD_USER || '',
            password: process.env.PASSWORD || '',
        };
    case 'PROBLEM_USER':
        return {    
            username: process.env.PROBLEM_USER || '',
            password: process.env.PASSWORD || '',
        };
    case 'PERFORMANCE_GLITCH_USER':
        return {
            username: process.env.PERFORMANCE_GLITCH_USER || '',
            password: process.env.PASSWORD || '',
        };
    case 'LOCKED_OUT_USER':
        return {
            username: process.env.LOCKED_OUT_USER || '',
            password: process.env.PASSWORD || '',
        }; 
    case 'INVALID_USER':
        return {
            username: 'invalid_username',
            password: 'invalid_password',
        }; 
    default:
        throw new Error(`Unknown user type: ${userType}`);
   }
}