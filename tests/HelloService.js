describe('[HelloService]', function () {
    var user = new Person('Romain');
    var hello = new Test(user);

    it('Test de Test.say()', function () {
        expect(hello.say()).toBe('Hello Romain');
    });

    it('Test de Test.getUser()', function () {
        expect(hello.getUser()).toEqual(jasmine.any(Person));
    });

    it('Test de Person.getName()', function () {
        expect(user.getName()).toBe('Romain');
    });
});
