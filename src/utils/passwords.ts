import * as bcrypt from 'bcrypt';

const saltRounds = 2;

async function hashPassword(password: string): Promise<string> {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        throw error;
    }
}
export default hashPassword