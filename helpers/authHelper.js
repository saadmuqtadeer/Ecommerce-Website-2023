import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
    // const saltRounds = 10;
    try {
        // const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    } catch (error) {
        console.log(`Error in auth Helper ${error}`);
        throw new Error('Error hashing password');
    }
}

export const comparePassword = (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
}
