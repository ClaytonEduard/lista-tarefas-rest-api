function addNumbers(nun1, nun2) {
    return nun1 + nun2;
}
describe('addnumbers', () => {
    // definindo os cenarios de test
    it('Adiciona dois numeros', () => {
        expect(addNumbers(2, 2)).toEqual(4);
    })
});