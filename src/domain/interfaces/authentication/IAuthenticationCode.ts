export default interface IAuthenticationCode {

  /**
    * Generate a unique code for the given audience
    * @param aud the audience for which the code is being generated
    */
  generate(aud: string): Promise<number>;

}