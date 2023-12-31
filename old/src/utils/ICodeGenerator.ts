export default interface ICodeGenerator {
    /**
     * Generate a unique code for the given audience and type
     * @param type the type of code being generated
     * @param aud the audience for which the code is being generated
     * @param expiredIn the number of seconds until the code expires
     */
    generate(type: string, aud: string, expiredIn: number): Promise<number>;
}