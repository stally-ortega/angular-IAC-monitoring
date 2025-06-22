/**
 * Define un contrato para las clases que convierten un objeto de un tipo (I) a otro (O).
 * @param <I> El tipo del objeto de entrada (Input).
 * @param <O> El tipo del objeto de salida (Output).
 */
export interface Mapper<I, O> {
  map(input: I): O;
}